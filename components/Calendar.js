import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from './Header';
import Day from './Day';
import { generateCalendarDays } from '../utils/calendarUtils';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarDays, setCalendarDays] = useState([]);

    useEffect(() => {
        const days = generateCalendarDays(currentDate);
        setCalendarDays(days);
    }, [currentDate]);

    const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'НД'];

    return (
        <View style={styles.calendarContainer}>
            <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />

            {/* Заголовки днів тижня */}
            <View style={styles.weekHeader}>
                {weekDays.map((day, index) => (
                    <View key={index} style={styles.weekDay}>
                        <Text style={styles.weekDayText}>{day}</Text>
                    </View>
                ))}
            </View>

            {/* Сітка днів */}
            <View style={styles.grid}>
                {calendarDays.map((dayObj, index) => (
                    <Day key={index} date={dayObj.date} isCurrentMonth={dayObj.isCurrentMonth} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    calendarContainer: {
        padding: 16,
    },
    weekHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 4,
        marginBottom: 4,
    },
    weekDay: {
        width: `${100 / 7}%`,
        alignItems: 'center',
    },
    weekDayText: {
        fontWeight: 'bold',
        color: '#444',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});











