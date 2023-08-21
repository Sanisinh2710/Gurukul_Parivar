import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AllIcons} from '../../../../assets/icons';
import {COLORS, months, weekDays} from '../../../utils';

const minAllowedDOBDate = new Date();
minAllowedDOBDate.setFullYear(minAllowedDOBDate.getFullYear() - 18);

type CalendarProps = {
  calendarVisible: boolean;
  setCalendarVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedParentDate: any;
  setSelectedParentDate: React.Dispatch<React.SetStateAction<any>>;
  type?: string;
};

export const Calendar = ({
  calendarVisible,
  setCalendarVisible,
  selectedParentDate,
  setSelectedParentDate,
  type,
}: CalendarProps) => {
  const [selectedDate, setSelectedDate] = React.useState(
    selectedParentDate || new Date(),
  );

  const [currentMonth, setCurrentMonth] = React.useState(
    selectedParentDate.getMonth() || new Date().getMonth(),
  );

  const [currentYear, setCurrentYear] = React.useState(
    selectedParentDate.getFullYear() || new Date().getFullYear(),
  );

  React.useMemo(() => {
    if (selectedParentDate) {
      setSelectedDate(selectedParentDate);
      setCurrentMonth(selectedParentDate.getMonth());
      setCurrentYear(selectedParentDate.getFullYear());
    }
  }, [selectedParentDate]);

  React.useEffect(() => {
    if (currentMonth && currentYear) {
      setSelectedDate(
        new Date(
          `${currentYear}-${currentMonth + 1}-${selectedDate.getDate()}`,
        ),
      );
    }
  }, [currentMonth, currentYear]);

  const [isModalVisible, setModalVisible] = React.useState(false);

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth: number) => {
      const prevMonthDate = new Date(currentYear, prevMonth - 1, 1);
      setCurrentYear(prevMonthDate.getFullYear());
      return prevMonthDate.getMonth();
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth: number) => {
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
    setSelectedParentDate(
      new Date(
        `${selectedDate.getFullYear()}-${
          selectedDate.getMonth() + 1
        }-${selectedDate.getDate()}`,
      ),
    );
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
          activeOpacity={
            type === 'dob'
              ? new Date(`${currentYear}-${currentMonth + 1}-${day}`) >
                minAllowedDOBDate
                ? 1
                : 0
              : 0
          }
          key={i}
          onPress={
            day
              ? type === 'dob'
                ? new Date(`${currentYear}-${currentMonth + 1}-${day}`) >
                  minAllowedDOBDate
                  ? () => {}
                  : () => {
                      handleDateSelect(
                        new Date(`${currentYear}-${currentMonth + 1}-${day}`),
                      );
                    }
                : () => {
                    handleDateSelect(
                      new Date(`${currentYear}-${currentMonth + 1}-${day}`),
                    );
                  }
              : () => {}
          }
          style={[
            styles.dayContainer,
            new Date(`${currentYear}-${currentMonth + 1}-${day}`) >
              minAllowedDOBDate && type === 'dob'
              ? {
                  backgroundColor: 'rgba(202, 204, 203,0.2)',
                }
              : selectedDate.getDate() === day && styles.selectedDateItem,
          ]}>
          <>
            <Text
              style={[
                styles.dayText,
                new Date(`${currentYear}-${currentMonth + 1}-${day}`) >
                  minAllowedDOBDate && type === 'dob'
                  ? {
                      color: 'rgba(202, 204, 203,1)',
                    }
                  : selectedDate.getDate() === day && {
                      color: COLORS.darkModetextColor,
                    },
              ]}>
              {day ? day : ''}
            </Text>
          </>
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
    const startYear = new Date().getFullYear() - 70;
    const endYear = new Date().getFullYear();

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
            <TouchableOpacity
              onPress={handleOpenYearModal}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.monthText}>
                {months[currentMonth]} {currentYear}
              </Text>
              <View
                style={{
                  width: 15,
                  height: 15,
                  marginLeft: 8,
                }}>
                <Image
                  source={AllIcons.ChevronArrowDown}
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    tintColor: COLORS.primaryColor,
                    resizeMode: 'contain',
                    transform: [
                      {
                        rotate: '270deg',
                      },
                    ],
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
              <TouchableOpacity onPress={handlePreviousMonth}>
                <Text style={styles.monthArrow}>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      marginLeft: 8,
                    }}>
                    <Image
                      source={AllIcons.ChevronArrowDown}
                      style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        tintColor: COLORS.primaryColor,
                        resizeMode: 'contain',
                        transform: [
                          {
                            rotate: '90deg',
                          },
                        ],
                      }}
                    />
                  </View>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleNextMonth}>
                <Text style={styles.monthArrow}>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      marginLeft: 8,
                    }}>
                    <Image
                      source={AllIcons.ChevronArrowDown}
                      style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        tintColor: COLORS.primaryColor,
                        resizeMode: 'contain',
                        transform: [
                          {
                            rotate: '270deg',
                          },
                        ],
                      }}
                    />
                  </View>
                </Text>
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
              // position: 'absolute',
              right: 10,
              bottom: 0,
              width: '23%',
              height: '10%',
              backgroundColor: COLORS.primaryColor,
              alignItems: 'center',
              alignSelf: 'flex-end',
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
                    width: '50%',
                    height: '40%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    backgroundColor: COLORS.lightModeBackgroundColor,
                    padding: '5%',
                  }}>
                  <Text style={styles.modalTitle}>Select Year</Text>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.yearRange}>
                    {renderYearRange()}
                  </ScrollView>
                  <TouchableOpacity
                    onPress={handleCloseYearModal}
                    style={{
                      width: '50%',
                      height: '14%',
                      backgroundColor: COLORS.primaryColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      top: 10,
                      alignSelf: 'center',
                    }}>
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
    color: COLORS.primaryColor,
  },
  modalYear: {
    fontSize: 16,
    marginBottom: 10,
    color: COLORS.lightModetextColor,
  },
  modalCancel: {
    fontSize: 16,
    color: COLORS.darkModetextColor,
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
