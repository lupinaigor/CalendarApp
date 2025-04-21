import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Calendar from './components/Calendar';
import { ThemeProvider, useTheme } from './components/ThemeContext';

function AppContent() {
    const { theme } = useTheme();

    return (
        <>
            <StatusBar
                barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={theme === 'dark' ? '#121212' : '#ffffff'}
            />
            <View style={styles.container}>
                <Calendar />
            </View>
        </>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});










