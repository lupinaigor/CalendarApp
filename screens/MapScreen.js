// screens/MapScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Тут буде мапа 🗺️</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
});
