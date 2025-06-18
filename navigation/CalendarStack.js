//navigation/CalendarStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/CalendarScreen';
import TasksForDay from '../components/TasksForDay';
import TaskDetails from '../components/TaskDetails';
import EditTask from '../components/EditTask';

const Stack = createNativeStackNavigator();

export default function CalendarStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CalendarMain" component={CalendarScreen} options={{ title: 'Календар' }} />
            <Stack.Screen name="TasksForDay" component={TasksForDay} options={{ title: 'Завдання на день' }} />
            <Stack.Screen name="TaskDetails" component={TaskDetails} options={{ title: 'Деталі завдання' }} />
            <Stack.Screen name="EditTask" component={EditTask} options={{ title: 'Редагування завдання' }} />
        </Stack.Navigator>
    );
}
