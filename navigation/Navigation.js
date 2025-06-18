// navigation/Navigation.js
// import React, { useContext } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { AuthContext } from '../context/AuthContext';
// import LoginScreen from '../screens/LoginScreen';
// import AppTabs from './AppTabs';
//
// const Stack = createNativeStackNavigator();
//
// export default function Navigation() {
//     const { userToken, isLoading } = useContext(AuthContext);
//
//     if (isLoading) return null; // або показати спіннер
//
//     return (
//         <NavigationContainer>
//             <Stack.Navigator screenOptions={{ headerShown: false }}>
//                 {userToken == null ? (
//                     <Stack.Screen name="Login" component={LoginScreen} />
//                 ) : (
//                     <Stack.Screen name="App" component={AppTabs} />
//                 )}
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }



// navigation/Navigation.js
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

import AuthStack from './AuthStack';  // імпорт AuthStack
import AppDrawer from './AppDrawer';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { userToken, isLoading } = useContext(AuthContext);

    if (isLoading) return null; // або можна показати спіннер

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {userToken == null ? (
                    <Stack.Screen name="Auth" component={AuthStack} />
                ) : (
                    <Stack.Screen name="App" component={AppDrawer} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
