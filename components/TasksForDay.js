import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchTasksByDate } from '../database';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

const TasksForDay = () => {
    const [tasks, setTasks] = useState([]);
    const route = useRoute();
    const navigation = useNavigation();
    const { date } = route.params;

    // useEffect(() => {
    //     loadTasks();
    // }, []);
    useFocusEffect(
        React.useCallback(() => {
            loadTasks();
        }, [])
    );

    const loadTasks = async () => {
        const data = await fetchTasksByDate(date);
        setTasks(data || []);
    };

    const handleTaskPress = (task) => {
        navigation.navigate('TaskDetails', { task });
    };

    const handleAddTask = () => {
        navigation.navigate('EditTask', { date });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleTaskPress(item)} style={styles.taskItem}>
            <Text numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Завдання на {date}</Text>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>Завдань немає</Text>}
            />
            <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
                <Text style={styles.addButtonText}>+ Додати завдання</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    header: { fontSize: 18, marginBottom: 12 },
    emptyText: { textAlign: 'center', marginTop: 20 },
    taskItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16
    }
});

export default TasksForDay;
