import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from './ThemeContext';

export default function Day({ date, isCurrentMonth, isSelected, isInRange, onPress }) {
    const today = new Date();
    const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const getBackgroundColor = () => {
        if (isSelected) return isDark ? '#3399ff' : '#007bff';
        if (isInRange) return isDark ? '#3399ff33' : '#cce5ff';
        if (isToday) return isDark ? '#3399ff33' : '#cce5ff';
        return 'transparent';
    };

    const getTextColor = () => {
        if (!isCurrentMonth) return '#999';
        return isDark ? '#fff' : '#000';
    };

    return (
        <TouchableOpacity onPress={onPress} style={[styles.dayContainer, { backgroundColor: getBackgroundColor(), borderRadius: isSelected || isToday ? 50 : 8 }]}>
            <Text style={{ color: getTextColor(), fontWeight: isToday ? 'bold' : 'normal' }}>
                {date.getDate()}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    dayContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
    },
});









