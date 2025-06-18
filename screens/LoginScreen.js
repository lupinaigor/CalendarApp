//screens/LoginScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
// import { useAuth } from '../context/AuthContext';
//
// export default function LoginScreen() {
//     const { login } = useAuth();
//     const [username, setUsername] = useState('');
//
//     const handleLogin = () => {
//         if (username.trim()) {
//             login(username.trim());
//         }
//     };
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Вхід</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Ваше ім’я"
//                 value={username}
//                 onChangeText={setUsername}
//             />
//             <Button title="Увійти" onPress={handleLogin} />
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: 'center', padding: 20 },
//     title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
//     input: {
//         borderWidth: 1,
//         borderColor: '#aaa',
//         padding: 10,
//         borderRadius: 6,
//         marginBottom: 20,
//     },
// });

//screens/LoginScreen.js
// import React, { useContext } from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import { AuthContext } from '../context/AuthContext';
//
// export default function LoginScreen() {
//     const { login } = useContext(AuthContext);
//
//     return (
//         <View style={styles.container}>
//             <Button title="Увійти" onPress={login} />
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
// });


//screens/LoginScreen.js
import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
    const { login } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Button title="Увійти" onPress={login} />
            <Button title="Реєстрація" onPress={() => navigation.navigate('SignUp')} />
            <Button title="Змінити мову" onPress={() => navigation.navigate('LanguageSettings')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
