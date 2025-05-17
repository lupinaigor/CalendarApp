import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { insertTask, updateTask, deleteTask } from '../database';

const EditTask = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const task = route.params?.task || null;
    const date = route.params?.date || task?.date;

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    const handleSave = async () => {
        if (!title.trim()) {
            Alert.alert('Помилка', 'Назва обов’язкова');
            return;
        }

        if (task) {
            await updateTask(title, description, task.id);
        } else {
            await insertTask(title, description, date);
        }

        // Переходимо одразу на Calendar, очищаючи стек
        navigation.reset({
            index: 0,
            routes: [{ name: 'Calendar' }],
        });
    };

    const handleDelete = async () => {
        if (task) {
            await deleteTask(task.id);
        }

        navigation.reset({
            index: 0,
            routes: [{ name: 'Calendar' }],
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Назва"
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />
            <TextInput
                placeholder="Опис"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline
            />
            <Button title="Зберегти" onPress={handleSave} />
            {task && <Button title="Видалити" onPress={handleDelete} color="red" />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 12,
        padding: 10,
        borderRadius: 6,
    },
});

export default EditTask;
