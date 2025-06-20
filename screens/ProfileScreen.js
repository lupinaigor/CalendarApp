// screens/ProfileScreen.js
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
//
// export default function ProfileScreen() {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.text}>Тут буде профіль</Text>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#fff',
//     },
//     text: {
//         fontSize: 18,
//         color: '#333',
//     },
// });


// screens/ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Це сторінка профілю (тимчасова заглушка).</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 18, color: '#333' },
});
