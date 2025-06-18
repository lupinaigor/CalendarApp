// screens/AddViolationScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { insertViolation } from '../database';

export default function AddViolationScreen({ navigation }) {
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [location, setLocation] = useState(null);

    const takePhoto = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Помилка', 'Дозвіл на камеру не надано');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({ quality: 0.5 });
        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const getLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Помилка', 'Дозвіл на геолокацію не надано');
            return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
    };

    const handleSave = async () => {
        if (
            !description.trim() ||
            !category.trim() ||
            !imageUri ||
            !location?.latitude ||
            !location?.longitude
        ) {
            Alert.alert('Помилка', 'Будь ласка, заповніть всі поля та зробіть фото');
            return;
        }

        const date = new Date().toISOString();

        await insertViolation({
            description,
            category,
            imageUri,
            date,
            latitude: location.latitude,
            longitude: location.longitude,
            userId: 1,
        });

        Alert.alert('Успішно', 'Порушення збережено');

        // 🧹 Очистка полів
        setDescription('');
        setCategory('');
        setImageUri(null);
        setLocation(null);

        // 🔙 Перехід назад
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Button title="Зробити фото" onPress={takePhoto} />
            {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

            <TextInput
                style={styles.input}
                placeholder="Опис"
                value={description}
                onChangeText={setDescription}
            />

            <TextInput
                style={styles.input}
                placeholder="Категорія"
                value={category}
                onChangeText={setCategory}
            />

            <Button title="Отримати геолокацію" onPress={getLocation} />
            {location && (
                <Text>
                    📍 {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
                </Text>
            )}

            <Button title="Зберегти порушення" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, gap: 10 },
    input: {
        borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5,
    },
    image: {
        width: '100%', height: 200, marginVertical: 10,
    },
});
