import React from 'react';

import {AllIcons} from '@assets';
import {Calendar} from '@components';
import {Image, Text, View} from 'react-native';
import {FormInputStyle} from './style';

type DatePickerProps = {
  value: any;
  label?: string;
  onChange: (...event: any[]) => void;
  onBlur: (...event: any[]) => void;
  placeholder?: string;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  state?: {
    [key: string]: any;
  };
  customIcon?: any;
  type?: 'dob' | 'date' | 'ravisabha';
  focused: boolean;
};

export const DatePicker = React.memo(
  ({
    label,
    onBlur,
    onChange,
    placeholder,
    setFocused,
    value,
    customIcon,
    state,
    type,
    focused,
  }: DatePickerProps): React.JSX.Element => {
    const style = FormInputStyle(value);

    const [calendarVisible, setCalendarVisible] = React.useState(false);

    const [selectedDate, setSelectedDate] = React.useState<Date>();

    React.useMemo(() => {
      if (type === 'dob') {
        const minAllowedDate = new Date();
        minAllowedDate.setFullYear(minAllowedDate.getFullYear() - 18);

        setSelectedDate(minAllowedDate);
      }
      if (type === 'date') {
        const minAllowedDate = new Date();

        setSelectedDate(minAllowedDate);
      }
      if (type === 'ravisabha') {
        function getMostRecentSunday() {
          const today = new Date();
          const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

          // Calculate the number of days to subtract to get to the most recent Sunday
          const daysToSunday = (dayOfWeek + 7 - 0) % 7;

          // Create a new Date object representing the most recent Sunday
          const mostRecentSunday = new Date(today);
          mostRecentSunday.setDate(today.getDate() - daysToSunday);

          return mostRecentSunday;
        }

        const mostRecentSunday = getMostRecentSunday();

        setSelectedDate(mostRecentSunday);
      }
    }, []);

    React.useEffect(() => {
      if (selectedDate && focused) {
        onChange(
          `${
            selectedDate.getDate().toString().length <= 1
              ? '0' + selectedDate.getDate().toString()
              : selectedDate.getDate().toString()
          }/${
            (selectedDate.getMonth() + 1).toString().length <= 1
              ? '0' + (selectedDate.getMonth() + 1).toString()
              : (selectedDate.getMonth() + 1).toString()
          }/${selectedDate.getFullYear()}`,
        );
      }
    }, [selectedDate]);

    return (
      <>
        <View
          style={style.datePickerMainView}
          onTouchEnd={() => {
            setCalendarVisible(!calendarVisible);
            setFocused(!calendarVisible);
          }}>
          <Text style={style.placeholderFonts}>
            {value === '' || value === undefined || value === 'undefined'
              ? placeholder
              : value}
          </Text>
          <View style={style.datePickerDateImg}>
            <Image
              style={style.rightSideImgStyle}
              source={customIcon || AllIcons.Calendar}
            />
          </View>
        </View>
        <Calendar
          type={type}
          calendarVisible={calendarVisible}
          setCalendarVisible={setCalendarVisible}
          selectedParentDate={selectedDate}
          setSelectedParentDate={setSelectedDate}
          onBlur={onBlur}
        />
      </>
    );
  },
);
