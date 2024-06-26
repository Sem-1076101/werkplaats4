import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isWeb from '../isWeb';
import {useNavigate} from 'react-router-dom';
import {SERVER_IP} from '../config';

function Login({navigation}) {
    const [formData, setFormData] = useState({email: '', password: ''});

    let navigate;
    if (isWeb) {
        navigate = useNavigate();
    }

    const handleChange = (name, value) => {
        setFormData({...formData, [name]: value});
    };

    const handleLogin = async () => {
        try {
            console.log('Inloggen:', formData);
            axios.defaults.timeout = 10000;
            const response = await axios.post(`http://${SERVER_IP}:5000/login`, formData);
            if (response && response.data) {
                console.log('Response:', response.data);
                console.log('Studentnummer:', response.data.studentnumber);
                console.log('Course ID:', response.data.course_id);
                let domain_id = response.data.course_id;
                let stringifiedDomain_id = JSON.stringify(domain_id);
                let studentnumber = response.data.studentnumber;
                let stringifiedStudentnumber = JSON.stringify(studentnumber);
                await AsyncStorage.setItem('domain_id', stringifiedDomain_id);
                await AsyncStorage.setItem('course_id', stringifiedDomain_id); // Opslaan onder 'course_id'
                await AsyncStorage.setItem('studentnumber', stringifiedStudentnumber);
                await AsyncStorage.setItem('isLoggedIn', 'true'); // Inlogstatus opslaan

                console.log('Opgeslagen studentnummer:', await AsyncStorage.getItem('studentnumber'));
                console.log('Opgeslagen domain_id:', await AsyncStorage.getItem('domain_id'));
                console.log('Opgeslagen course_id:', await AsyncStorage.getItem('course_id')); // Log de opgeslagen 'course_id'

                if (isWeb) {
                    navigate('/dashboard');
                } else {
                    navigation.navigate('Dashboard');
                }
            } else {
                console.error('Ongeldige respons:', response);
                Alert.alert('Fout', 'Ongeldige respons van de server.');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data) {
                console.error('Error data:', error.response.data);
                Alert.alert('Fout', error.response.data.message || 'Er is een fout opgetreden tijdens het inloggen.');
            } else {
                Alert.alert('Fout', 'Er is een fout opgetreden tijdens het inloggen.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.header}>Inloggen</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>E-mail</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.email}
                            onChangeText={(value) => handleChange('email', value)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Wachtwoord</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.password}
                            onChangeText={(value) => handleChange('password', value)}
                            secureTextEntry
                        />
                    </View>
                    <Button title="Inloggen" onPress={handleLogin}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 12,
        fontSize: 16,
    },
});

export default Login;
