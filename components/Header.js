import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Header({ currentDate, setCurrentDate }) {
    const monthNames = [
        'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
        'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
    ];

    const currentMonthName = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    // Функції для зміни місяця
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    return (
        <View style={styles.header}>
            <Text style={styles.monthText}>{currentMonthName} {currentYear}</Text>
            <View style={styles.controls}>
                <TouchableOpacity onPress={goToPreviousMonth} style={styles.arrowButton}>
                    <Text style={styles.arrow}>▲</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={goToNextMonth} style={styles.arrowButton}>
                    <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    monthText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowButton: {
        marginLeft: 10,
        padding: 5,
    },
    arrow: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3399ff',
    },
});






