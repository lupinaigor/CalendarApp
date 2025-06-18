//screens/SignUpScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function SignUpScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Сторінка реєстрації (поки заглушка)</Text>
            <Button title="Повернутись до входу" onPress={() => navigation.goBack()} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
