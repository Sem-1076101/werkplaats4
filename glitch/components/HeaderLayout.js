import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNavigation from './useNavigation';
import { useTheme } from './ThemeContext';

const logo = require('../static/images/glitch-logo.png');
const themeSwitch = require('../static/images/circle-half-stroke-solid.png');

export default function HeaderLayout() {
    const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Controleer of de gebruiker is ingelogd
        const checkLoginStatus = async () => {
            const status = await AsyncStorage.getItem('isLoggedIn');
            setIsLoggedIn(status === 'true');
        };
        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('isLoggedIn');
            await AsyncStorage.removeItem('studentnumber');
            setIsLoggedIn(false);
            if (isWeb) {
                navigate('/');
            } else {
                navigation.navigate('Home');
            }
        } catch (error) {
            console.error('Error bij uitloggen:', error);
            Alert.alert('Fout', 'Er is een fout opgetreden tijdens het uitloggen.');
        }
    };

    const styles = getStyles(theme);

    return (
        <View style={styles.container}>
            <Helmet>
                <title>Glitch</title>
            </Helmet>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={styles.logoContainer}
                >
                    <Image source={logo} style={styles.logo} />
                </TouchableOpacity>

                <View style={styles.buttonsContainer}>
                    {!isLoggedIn ? (
                        <>
                            <TouchableOpacity
                                style={[styles.button, styles.loginButton]}
                                onPress={() => navigation.navigate('Login')}
                            >
                                <Text style={styles.loginButtonText}>Inloggen</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.registerButton]}
                                onPress={() => navigation.navigate('Register')}
                            >
                                <Text style={styles.registerButtonText}>Registreren</Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <TouchableOpacity
                            style={[styles.button, styles.logoutButton]}
                            onPress={handleLogout}
                        >
                            <Text style={styles.logoutButtonText}>Uitloggen</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity
                        style={styles.themeButton}
                        onPress={toggleTheme}
                    >
                        <Image source={themeSwitch} style={styles.themeSwitchIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const getStyles = (theme) => StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme === 'light' ? '#ddd' : '#333',
        backgroundColor: theme === 'light' ? '#fff' : '#000',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        height: 50,
        width: 100,
        resizeMode: 'contain',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    loginButton: {
        borderColor: theme === 'light' ? '#007bff' : '#bb86fc',
        borderWidth: 1,
    },
    loginButtonText: {
        color: theme === 'light' ? '#007bff' : '#bb86fc',
    },
    registerButton: {
        backgroundColor: theme === 'light' ? '#007bff' : '#bb86fc',
    },
    registerButtonText: {
        color: '#fff',
    },
    logoutButton: {
        backgroundColor: theme === 'light' ? '#dc3545' : '#cf6679',
    },
    logoutButtonText: {
        color: '#fff',
    },
    themeButton: {
        padding: 8,
    },
    themeSwitchIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});
