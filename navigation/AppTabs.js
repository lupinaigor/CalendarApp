//navigation/AppTabs
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalendarStack from './CalendarStack';
import MapScreen from '../screens/MapScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Календар" component={CalendarStack} options={{ headerShown: false }} />
            <Tab.Screen name="Карта" component={MapScreen} />
            <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
    );
}
