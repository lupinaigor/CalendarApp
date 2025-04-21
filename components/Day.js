import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

export default function Day({ date, isCurrentMonth }) {
    const today = new Date();
    const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const containerStyle = [
        styles.dayContainer,
        {
            backgroundColor: isToday ? (isDark ? '#3399ff33' : '#cce5ff') : 'transparent',
            borderRadius: isToday ? 50 : 8,
        },
    ];

    const textStyle = {
        color: isCurrentMonth ? (isDark ? '#fff' : '#000') : '#999',
        fontWeight: isToday ? 'bold' : 'normal',
    };

    return (
        <View style={containerStyle}>
            <Text style={textStyle}>{date.getDate()}</Text>
        </View>
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








