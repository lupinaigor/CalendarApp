// import React, { useEffect } from 'react';
// import { View, StyleSheet, StatusBar } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
//
// import Calendar from './components/Calendar';
// import TasksForDay from './components/TasksForDay';
// import TaskDetails from './components/TaskDetails';
// import EditTask from './components/EditTask';
// import { ThemeProvider, useTheme } from './components/ThemeContext';
//
//
// const Stack = createStackNavigator();
//
// function AppContent() {
//     const { theme } = useTheme();
//
//     useEffect(() => {
//         const initDatabase = async () => {
//             await createTasksTable();
//         };
//         initDatabase();
//     }, []);
//
//     // return (
//     //     <>
//     //         <StatusBar
//     //             barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
//     //             backgroundColor={theme === 'dark' ? '#121212' : '#ffffff'}
//     //         />
//     //         <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#121212' : '#fff' }]}>
//     //             <Calendar />
//     //         </View>
//     //     </>
//     // );
//
//     return (
//         <>
//             <StatusBar
//                 barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
//                 backgroundColor={theme === 'dark' ? '#121212' : '#ffffff'}
//             />
//             <NavigationContainer>
//                 <Stack.Navigator initialRouteName="Calendar">
//                     <Stack.Screen name="Calendar" component={Calendar} />
//                     <Stack.Screen name="TasksForDay" component={TasksForDay} />
//                     <Stack.Screen name="TaskDetails" component={TaskDetails} />
//                     <Stack.Screen name="EditTask" component={EditTask} />
//                 </Stack.Navigator>
//             </NavigationContainer>
//         </>
//     );
// }
//
// export default function App() {
//     return (
//         <ThemeProvider>
//             <AppContent />
//         </ThemeProvider>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//     },
// });


// App.js
import React, { useEffect } from 'react';
import Navigation from './navigation/Navigation';
import { ThemeProvider } from './components/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { openDatabase } from './database';
import './i18n';

export default function App() {
    useEffect(() => {
        openDatabase(); // відкриваємо базу і створюємо таблицю при запуску додатку
    }, []);

    return (
        <AuthProvider>
            <ThemeProvider>
                <Navigation />
            </ThemeProvider>
        </AuthProvider>
    );
}
