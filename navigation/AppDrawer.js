// navigation/AppDrawer.js
import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import AppTabs from './AppTabs';
import { AuthContext } from '../context/AuthContext';
import SignUpScreen from '../screens/SignUpScreen';
import LanguageSettingsScreen from '../screens/LanguageSettingsScreen';
import AddViolationScreen from '../screens/AddViolationScreen';
import ViolationsListScreen from '../screens/ViolationsListScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const { logout } = useContext(AuthContext);

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Вийти" onPress={logout} />
        </DrawerContentScrollView>
    );
}

export default function AppDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{ headerShown: true }}
        >
            <Drawer.Screen name="Головна" component={AppTabs} />
            <Drawer.Screen name="Додати порушення" component={AddViolationScreen} />
            <Drawer.Screen name="Налаштування мови" component={LanguageSettingsScreen} />
            <Drawer.Screen name="Реєстрація" component={SignUpScreen} />
            <Drawer.Screen name="Список порушень" component={ViolationsListScreen} />
        </Drawer.Navigator>
    );
}
