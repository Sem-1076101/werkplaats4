import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import axios from 'axios';
import isWeb from '../isWeb';
import { useNavigate } from 'react-router-dom';

function Register({navigation}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        studentnumber: ''
    });

    let navigate;
    if (isWeb) {
        navigate = useNavigate();
    }

    const handleChange = (name, value) => {
        setFormData({...formData, [name]: value});
    };

    const handleRegister = async () => {
        try {
            console.log('Registering:', formData);
            axios.defaults.timeout = 10000;
            const response = await axios.post('http://145.137.16.211:5000/register', formData);
            if (response && response.data) {
                console.log('Response:', response.data);
                if (isWeb) {
                    navigate('/login');
                } else {
                    navigation.navigate('Login');
                }
            } else {
                console.error('Ongeldige respons:', response);
                Alert.alert('Fout', 'Ongeldige respons van de server.');
            }
        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data) {
                console.error('Error data:', error.response.data);
                Alert.alert('Fout', error.response.data.message || 'Er is een fout opgetreden tijdens de registratie.');
            } else {
                Alert.alert('Fout', 'Er is een fout opgetreden tijdens de registratie.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.col}>
                    <Text style={styles.header}>Registratie</Text>
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
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Voornaam</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.first_name}
                            onChangeText={(value) => handleChange('first_name', value)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Achternaam</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.last_name}
                            onChangeText={(value) => handleChange('last_name', value)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Studentnummer</Text>
                        <TextInput
                            style={styles.input}
                            value={formData.studentnumber}
                            onChangeText={(value) => handleChange('studentnumber', value)}
                        />
                    </View>
                    <Button title="Registreren" onPress={handleRegister}/>
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

export default Register;
