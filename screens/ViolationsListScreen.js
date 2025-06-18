// screens/ViolationsListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { fetchAllViolations } from '../database';

export default function ViolationsListScreen() {
    const [violations, setViolations] = useState([]);

    useEffect(() => {
        const loadViolations = async () => {
            const data = await fetchAllViolations();
            setViolations(data);
        };

        const unsubscribe = loadViolations();
        return () => unsubscribe;
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {item.imageUri ? (
                <Image source={{ uri: item.imageUri }} style={styles.image} />
            ) : (
                <Text style={styles.noImage}>Немає зображення</Text>
            )}
            <Text style={styles.text}>📝 {item.description}</Text>
            <Text style={styles.text}>📂 Категорія: {item.category}</Text>
            <Text style={styles.text}>📅 {new Date(item.date).toLocaleString()}</Text>
            <Text style={styles.text}>
                📍 {item.latitude?.toFixed(5)}, {item.longitude?.toFixed(5)}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={violations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                ListEmptyComponent={<Text>Немає збережених порушень</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    card: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#f9f9f9'
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginBottom: 10
    },
    text: {
        fontSize: 14,
        marginBottom: 4
    },
    noImage: {
        fontStyle: 'italic',
        marginBottom: 10
    }
});
