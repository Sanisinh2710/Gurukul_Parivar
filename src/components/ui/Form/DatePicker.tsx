import React from 'react';

import {Image, Text, View} from 'react-native';
import {AllIcons} from '../../../../assets/icons';
import {Calendar} from '../Calendar';
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
  type?: string;
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
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
          onTouchEnd={() => {
            setCalendarVisible(!calendarVisible);
            setFocused(!calendarVisible);
          }}>
          <Text style={style.placeholderFonts}>
            {value === '' || value === undefined || value === 'undefined'
              ? placeholder
              : value}
          </Text>
          <View
            style={[
              {
                width: 30,
                height: 30,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Image
              style={{
                flex: 1,
                resizeMode: 'contain',
              }}
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
        />
      </>
    );
  },
);
