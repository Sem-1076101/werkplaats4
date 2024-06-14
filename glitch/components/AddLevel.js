
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native';
import { useNavigate } from 'react-router-dom';
import {addLevel, get_modules, getModules} from '../api';
import isWeb from '../isWeb';

function AddLevel({ navigation }) {
    const [levelData, setLevelData] = useState({
        assignment_title: '',
        assignment_description: '',
        module_id: null,
    });
    const [moduleList, setModuleList] = useState([]);
    const [selectedModule, setSelectedModule] = useState(null);

    let navigate;
    if (isWeb) {
        navigate = useNavigate();
    }

    useEffect(() => {
        get_modules();
    }, []);

    const fetchModules = async () => {
        try {
            const moduleData = await getModules();
            setModuleList(moduleData);
        } catch (error) {
            console.error('Fout bij het ophalen van modules:', error);
            Alert.alert('Fout', 'Er is een fout opgetreden bij het ophalen van de modules.');
        }
    };

    const handleChange = (name, value) => {
        setLevelData({ ...levelData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            setLevelData({ ...levelData, module_id: selectedModule });

            const response = await addLevel(levelData);
            if (response) {
                Alert.alert('Succes', 'Level succesvol toegevoegd!');
                setLevelData({
                    assignment_title: '',
                    assignment_description: '',
                    module_id: null,
                });

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
            console.error('Fout:', error);
            Alert.alert('Fout', 'Er is een fout opgetreden tijdens het opslaan.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Voeg een nieuw level toe</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Titel opdracht</Text>
                <TextInput
                    style={styles.input}
                    value={levelData.assignment_title}
                    onChangeText={(value) => handleChange('assignment_title', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Omschrijving opdracht</Text>
                <TextInput
                    style={styles.input}
                    value={levelData.assignment_description}
                    onChangeText={(value) => handleChange('assignment_description', value)}
                    multiline
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Selecteer module</Text>
                <Picker
                    selectedValue={selectedModule}
                    onValueChange={(itemValue, itemIndex) => setSelectedModule(itemValue)}
                >
                    <Picker.Item label="Selecteer een module" value={null} />
                    {moduleList.map((module) => (
                        <Picker.Item key={module.id} label={module.module_name} value={module.id} />
                    ))}
                </Picker>
            </View>
            <Button title="Voeg toe" onPress={handleSubmit} />
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

export default AddLevel;
