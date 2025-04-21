import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Day from './Day';
import { generateCalendarDays } from '../utils/calendarUtils';
import { useTheme } from './ThemeContext';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const days = generateCalendarDays(currentDate);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const handleDayPress = (date) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(null);
        } else if (startDate && !endDate) {
            if (date < startDate) {
                setStartDate(date);
            } else {
                setEndDate(date);
            }
        }
    };

    const isDateInRange = (date) => {
        if (startDate && endDate) {
            return date > startDate && date < endDate;
        }
        return false;
    };

    return (
        <View style={[styles.calendarContainer, { backgroundColor: isDark ? '#121212' : '#ffffff' }]}>
            <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <View style={styles.daysGrid}>
                {days.map((dayObj, index) => (
                    <Day
                        key={index}
                        date={dayObj.date}
                        isCurrentMonth={dayObj.isCurrentMonth}
                        isSelected={startDate && dayObj.date.toDateString() === startDate.toDateString() ||
                            endDate && dayObj.date.toDateString() === endDate.toDateString()}
                        isInRange={isDateInRange(dayObj.date)}
                        onPress={() => handleDayPress(dayObj.date)}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 1,
        padding: 16,
    },
    daysGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});















