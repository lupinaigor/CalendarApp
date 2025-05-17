import i18next from "i18next";
import {initReactI18next} from "react-i18next";
import * as Localization from 'expo-localization';
import {languages} from "../locales";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
    SUPPORTED_LANGUAGES: Object.keys(languages),
    DEFAULT_LANGUAGE: 'en',
    APP_LANGUAGE: 'APP_LANGUAGE',
}

const getDeviceLanguage = () => {
    const locales = Localization.getLocales();
    return locales?.[0]?.languageCode || config.DEFAULT_LANGUAGE;
}

const initialLang = config.SUPPORTED_LANGUAGES.includes(getDeviceLanguage())
    ? getDeviceLanguage()
    : config.DEFAULT_LANGUAGE;


i18next
    .use(initReactI18next)
    .init({
        resources: languages,
        lng: initialLang,
        fallbackLng: config.DEFAULT_LANGUAGE,
        interpolation: {
            escapeValue: false
        }
    })

/**
 * Changes the app language and saves it to AsyncStorage.
 * @param {string} lang - The language code to switch (e.g., 'en', 'uk').
 * @returns {Promise<void>}
 */
export const changeLanguage = async (lang) => {
    try {
        const selectedLanguage = config.SUPPORTED_LANGUAGES.includes(lang) ? lang : config.DEFAULT_LANGUAGE;
        await i18next.changeLanguage(selectedLanguage);
        await AsyncStorage.setItem(config.APP_LANGUAGE, selectedLanguage);
        if (__DEV__) {
            console.log(`Language changed to : ${selectedLanguage}`)
        }
    } catch (error) {
        console.error('Failed to change language', error)
    }
}

export const loadLanguage = async () => {
    try{
        const savedLanguage = await AsyncStorage.getItem(config.APP_LANGUAGE);
        if (savedLanguage && config.SUPPORTED_LANGUAGES.includes(savedLanguage)) {
            await i18next.changeLanguage(savedLanguage);
            if (__DEV__) {
                console.log(`Loaded saved language: ${savedLanguage}`)
            }
        } else {
            const deviceLang = getDeviceLanguage();
            const preferredLang = config.SUPPORTED_LANGUAGES.includes(deviceLang)
                ? deviceLang
                : config.DEFAULT_LANGUAGE;
            await i18next.changeLanguage(preferredLang);

            if (__DEV__) {
                console.log(`Loaded default language: ${preferredLang}`)
            }
        }
    }catch (error){
        console.error('Failed to load language: ', error);
        await i18next.changeLanguage(config.DEFAULT_LANGUAGE);
    }
}
