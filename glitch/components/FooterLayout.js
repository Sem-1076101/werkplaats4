import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './ThemeContext';

const logo = require('../static/images/glitch-logo.png');

export default function FooterLayout() {
    const navigation = useNavigation();
    const { theme } = useTheme();
    const styles = getStyles(theme);

    return (
        <View style={styles.container}>
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={styles.logoContainer}
                >
                    <Image source={logo} style={styles.logo} />
                </TouchableOpacity>

                <Text style={styles.copyright}>
                    © {new Date().getFullYear()} GLITCH, Inc
                </Text>
            </View>
        </View>
    );
}

const getStyles = (theme) => StyleSheet.create({
    container: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: theme === 'light' ? '#ddd' : '#333',
        backgroundColor: theme === 'light' ? '#fff' : '#000',
    },
    footer: {
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
    copyright: {
        color: theme === 'light' ? '#000' : '#fff',
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navText: {
        color: theme === 'light' ? '#007bff' : '#bb86fc',
        marginHorizontal: 8,
    },
});
