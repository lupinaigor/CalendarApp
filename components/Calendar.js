import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import Day from './Day';
import { generateCalendarDays } from '../utils/calendarUtils';
import { useTheme } from './ThemeContext';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const days = generateCalendarDays(currentDate);
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <View style={[styles.calendarContainer, { backgroundColor: isDark ? '#121212' : '#ffffff' }]}>
            <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <View style={styles.daysGrid}>
                {days.map((dayObj, index) => (
                    <Day key={index} date={dayObj.date} isCurrentMonth={dayObj.isCurrentMonth} />
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














