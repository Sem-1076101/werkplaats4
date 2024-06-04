import React, { useState } from 'react';
import { View, StyleSheet, Button, SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';

export default function BaseLayout({ children }) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <NavigationContainer>
            <SafeAreaView style={[styles.container, theme === 'dark' ? styles.darkTheme : styles.lightTheme]}>
                <HeaderLayout />
                <View style={styles.content}>
                    {children}
                </View>
                <FooterLayout />
            </SafeAreaView>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    textContent: {
        padding: 16,
    },
    darkTheme: {
        backgroundColor: '#000',
        color: '#fff',
    },
    lightTheme: {
        backgroundColor: '#fff',
        color: '#000',
    },
});
