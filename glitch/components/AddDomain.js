import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useNavigate} from 'react-router-dom';
import {addDomain} from '../api';
import isWeb from '../isWeb';

function AddDomain({navigation}) {
    const [domain, setDomain] = useState({
        course_name: '',
        course_description: '',
    });

    let navigate;
    if (isWeb) {
        navigate = useNavigate();
    }

    const handleChange = (name, value) => {
        setDomain({...domain, [name]: value});
    };

    const handleSubmit = async () => {
        try {
            const response = await addDomain(domain);
            if (response) {
                Alert.alert('Succes', 'Domein succesvol toegevoegd!');
                setDomain({
                    course_name: '',
                    course_description: '',
                });

                if (isWeb) {
                    navigate('/platform');
                } else {
                    navigation.navigate('Platform');
                }
            } else {
                console.error('Ongeldige respons:', response);
                Alert.alert('Fout', 'Ongeldige respons van de server.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Fout', 'Er is een fout opgetreden tijdens het opslaan.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Voeg een nieuw domein toe</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Domeinnaam</Text>
                <TextInput
                    style={styles.input}
                    value={domain.course_name}
                    onChangeText={(value) => handleChange('course_name', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Domeinbeschrijving</Text>
                <TextInput
                    style={styles.input}
                    value={domain.course_description}
                    onChangeText={(value) => handleChange('course_description', value)}
                    multiline
                />
            </View>
            <Button title="Voeg toe" onPress={handleSubmit}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'center',
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

export default AddDomain;
