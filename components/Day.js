import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Day({ date, isCurrentMonth }) {
    const today = new Date();
    const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    return (
        <View style={[styles.dayContainer, !isCurrentMonth && styles.dimmed]}>
            <View style={[styles.circle, isToday && styles.today]}>
                <Text style={styles.dayText}>{date.getDate()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    dayContainer: {
        width: `${100 / 7}%`,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayText: {
        color: '#000',
    },
    dimmed: {
        opacity: 0.4,
    },
    circle: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    today: {
        backgroundColor: '#3399ff',
    },
});

