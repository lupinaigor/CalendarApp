// screens/LanguageSettingsScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { changeLanguage } from '../i18n';
import { useTranslation } from 'react-i18next';

export default function LanguageSettingsScreen({ navigation }) {
    const { t, i18n } = useTranslation();
    const [selected, setSelected] = useState(i18n.language);

    const handleLanguageSelect = async (lang) => {
        await changeLanguage(lang);
        setSelected(lang);
    };

    const handleContinue = () => {
        navigation.goBack(); // або navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('Виберіть мову')}:</Text>
            <View style={styles.langButtons}>
                <Button
                    title="Українська"
                    onPress={() => handleLanguageSelect('uk')}
                    color={selected === 'uk' ? 'green' : undefined}
                />
                <Button
                    title="English"
                    onPress={() => handleLanguageSelect('en')}
                    color={selected === 'en' ? 'green' : undefined}
                />
            </View>
            <Button title={t('Продовжити')} onPress={handleContinue} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 18, marginBottom: 20 },
    langButtons: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 30
    }
});
