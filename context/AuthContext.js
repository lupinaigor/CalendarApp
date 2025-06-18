// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const login = async () => {
        const token = 'dummy-auth-token';
        await AsyncStorage.setItem('userToken', token);
        setUserToken(token);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('userToken');
        setUserToken(null);
    };

    const checkLoginStatus = async () => {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
        setIsLoading(false);
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ userToken, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};
