import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const TaskDetails = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { task } = route.params;

    const handleEdit = () => {
        navigation.navigate('EditTask', { task });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.label}>Опис:</Text>
            <Text style={styles.description}>{task.description || '—'}</Text>
            <Text style={styles.label}>Дата:</Text>
            <Text>{task.date}</Text>

            <TouchableOpacity onPress={handleEdit} style={styles.button}>
                <Text style={styles.buttonText}>Редагувати</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    label: { fontWeight: 'bold', marginTop: 10 },
    description: { marginBottom: 10 },
    button: {
        marginTop: 20,
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: { color: '#fff', fontSize: 16 }
});

export default TaskDetails;
