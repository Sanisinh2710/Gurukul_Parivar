import React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../../../utils';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

type CalendarProps = {
  calendarVisible: boolean;
  setCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Calendar = ({
  calendarVisible,
  setCalendarVisible,
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear(),
  );
  const [isModalVisible, setModalVisible] = React.useState(false);

  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => {
      const prevMonthDate = new Date(currentYear, prevMonth - 1, 1);
      setCurrentYear(prevMonthDate.getFullYear());
      return prevMonthDate.getMonth();
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => {
      const nextMonthDate = new Date(currentYear, prevMonth + 1, 1);
      setCurrentYear(nextMonthDate.getFullYear());
      return nextMonthDate.getMonth();
    });
  };

  const handleDateSelect = (date: any) => {
    setSelectedDate(date);
  };

  const handleOpenYearModal = () => {
    setModalVisible(true);
  };

  const handleCloseYearModal = () => {
    setModalVisible(false);
  };

  const handleYearChange = (year: any) => {
    setCurrentYear(year);
    handleCloseYearModal();
  };

  const saveDate = () => {
    console.log(selectedDate.toLocaleDateString());
    setCalendarVisible(false);
  };

  const renderCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Adjusted line

    const daysArray = [
      ...Array(firstDayOfMonth).fill(null),
      ...Array(daysInMonth)
        .fill(1)
        .map((_, idx) => idx + 1),
    ];

    const rows = [];
    let daysRow = [];

    for (let i = 0; i < daysArray.length; i++) {
      const day = daysArray[i];

      daysRow.push(
        <TouchableOpacity
          key={i}
          onPress={
            day
              ? () => handleDateSelect(new Date(currentYear, currentMonth, day))
              : () => {}
          }
          style={[
            styles.dayContainer,
            selectedDate.getDate() === day && styles.selectedDateItem,
          ]}>
          <Text
            style={[
              styles.dayText,
              selectedDate.getDate() === day && {
                color: COLORS.darkModetextColor,
              },
            ]}>
            {day ? day : ''}
          </Text>
        </TouchableOpacity>,
      );

      if ((i + 1) % 7 === 0 || i === daysArray.length - 1) {
        while (daysRow.length < 7) {
          daysRow.push(
            <View
              key={`empty-${daysRow.length}`}
              style={styles.dayContainer}
            />,
          );
        }

        rows.push(
          <View key={i} style={styles.weekContainer}>
            {daysRow}
          </View>,
        );
        daysRow = [];
      }
    }

    return rows;
  };

  const renderYearRange = () => {
    const startYear = currentYear - 70;
    const endYear = currentYear + 20;

    const years = [];
    for (let year = startYear; year <= endYear; year++) {
      years.push(
        <TouchableOpacity key={year} onPress={() => handleYearChange(year)}>
          <Text style={styles.modalYear}>{year}</Text>
        </TouchableOpacity>,
      );
    }

    return years;
  };

  return (
    <Modal
      transparent
      visible={calendarVisible}
      animationType="slide"
      onDismiss={() => {
        setCalendarVisible(false);
      }}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleOpenYearModal}>
              <Text style={styles.monthText}>
                {months[currentMonth]} {currentYear}
                {' >'}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', gap: 20}}>
              <TouchableOpacity onPress={handlePreviousMonth}>
                <Text style={styles.monthArrow}>{'<'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextMonth}>
                <Text style={styles.monthArrow}>{'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.weekdayContainer}>
            {weekDays.map((dayName, index) => (
              <Text key={index} style={styles.weekdayText}>
                {dayName}
              </Text>
            ))}
          </View>

          {renderCalendarDays()}

          <Pressable
            onPress={() => {
              saveDate();
            }}
            android_ripple={{
              color: COLORS.primaryRippleColor,
            }}
            style={{
              position: 'absolute',
              right: 10,
              bottom: 5,
              width: '23%',
              height: '10%',
              backgroundColor: COLORS.primaryColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLORS.darkModetextColor,
              }}>
              SAVE
            </Text>
          </Pressable>

          {isModalVisible && (
            <Modal visible={isModalVisible} transparent animationType="slide">
              <View style={styles.modal}>
                <View
                  style={{
                    width: '100%',
                    height: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: COLORS.lightModeBackgroundColor,
                  }}>
                  <Text style={styles.modalTitle}>Select Year</Text>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.yearRange}>
                    {renderYearRange()}
                  </ScrollView>
                  <TouchableOpacity onPress={handleCloseYearModal}>
                    <Text style={styles.modalCancel}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  container: {
    paddingTop: 20,
    backgroundColor: COLORS.lightModeBackgroundColor,
    borderRadius: 13,
    height: '55%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  selectedDateItem: {
    borderRadius: 100,
    backgroundColor: COLORS.primaryColor,
  },
  monthArrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
  },
  monthText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryColor,
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  yearText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  yearRange: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  navigationText: {
    fontSize: 16,
    color: 'blue',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.lightModetextColor,
  },
  modalYear: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.lightModetextColor,
  },
  modalCancel: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
  weekdayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  weekdayText: {
    width: '14.285%',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.lightModetextColor,
    opacity: 0.6,
  },
  weekContainer: {
    flexDirection: 'row',
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 53,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.lightModetextColor,
  },
  activeDay: {
    backgroundColor: 'lightblue', // Change the active day background color here
  },
  activeDayText: {
    fontWeight: 'bold', // Change the active day text style here
  },
});
