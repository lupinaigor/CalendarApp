//components/Calendar.js
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Header from './Header';
import { generateCalendarDays } from '../utils/calendarUtils';
import { useTheme } from './ThemeContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { fetchDatesWithTasks } from '../database';


export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [datesWithTasks, setDatesWithTasks] = useState([]);
    const navigation = useNavigation();
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const days = generateCalendarDays(currentDate);

    useEffect(() => {
        loadTaskDates();
    }, [currentDate]);

    useFocusEffect(
        React.useCallback(() => {
            loadTaskDates(); // Оновити список дат з завданнями при поверненні на календар
        }, [])
    );

    const loadTaskDates = async () => {
        const result = await fetchDatesWithTasks();
        setDatesWithTasks(result || []);
    };

    const handleDayPress = (date) => {
        navigation.navigate('TasksForDay', { date: date.toISOString().split('T')[0] });
    };

    const renderDay = ({ item }) => {
        const day = item.date.getDate();
        const isToday = new Date().toDateString() === item.date.toDateString();
        const hasTask = datesWithTasks.includes(item.date.toISOString().split('T')[0]);

        return (
            <TouchableOpacity
                style={[styles.dayContainer, isToday && styles.today]}
                onPress={() => handleDayPress(item.date)}
            >
                <Text style={{ color: item.isCurrentMonth ? (theme === 'dark' ? '#fff' : '#000') : '#aaa' }}>
                    {day}
                </Text>
                {hasTask && <View style={styles.dot} />}
            </TouchableOpacity>
        );
    };

    return (
        <View style={[styles.calendarContainer, { backgroundColor: isDark ? '#121212' : '#ffffff' }]}>
            <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
            <FlatList
                data={days}
                keyExtractor={(item, index) => index.toString()}
                numColumns={7}
                renderItem={renderDay}
                contentContainerStyle={styles.calendarGrid}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    calendarGrid: {
        padding: 10,
    },
    dayContainer: {
        width: 45,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        position: 'relative',
    },
    today: {
        backgroundColor: '#007AFF', // повне зафарбування синім
        borderRadius: 20,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 4,
    },
    calendarContainer: {
        flex: 1,
        paddingTop: 10,
    },
});












