import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Header({ currentDate, setCurrentDate }) {
    const { theme, toggleTheme } = useTheme();
    const { t } = useTranslation();

    const monthIndex = currentDate.getMonth();
    const monthNames = t('months', { returnObjects: true, defaultValue: [] });
    const currentMonthName = monthNames[monthIndex] || '';
    const currentYear = currentDate.getFullYear();

    const weekdayNames = t('weekdays', { returnObjects: true, defaultValue: [] });

    console.log('months:', monthNames);
    console.log('weekdays:', weekdayNames);

    const goToPreviousMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const goToNextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    return (
        <View>
            <View style={styles.header}>
                <Text style={[styles.monthText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                    {currentMonthName} {currentYear}
                </Text>

                <View style={styles.controls}>
                    <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
                        <Text style={styles.themeText}>{theme === 'light' ? '🌙' : '☀️'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToPreviousMonth} style={styles.arrowButton}>
                        <Text style={styles.arrow}>▲</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={goToNextMonth} style={styles.arrowButton}>
                        <Text style={styles.arrow}>▼</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.weekdaysContainer}>
                {weekdayNames.map((day, index) => (
                    <Text
                        key={index}
                        style={[
                            styles.weekday,
                            { color: theme === 'dark' ? '#fff' : '#000' }
                        ]}
                    >
                        {day}
                    </Text>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
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
    themeButton: {
        marginRight: 10,
        padding: 5,
    },
    themeText: {
        fontSize: 18,
    },
    weekdaysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    weekday: {
        width: 40,
        textAlign: 'center',
        fontWeight: '600',
    },
});









