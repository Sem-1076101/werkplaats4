import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { addModule, domains } from '../api';
import isWeb from '../isWeb';

function AddModule({ navigation }) {
    const [moduleData, setModuleData] = useState({
        module_name: '',
        description: '',
        domain_id: null,
        progress_indicator: '',
    });
    const [domainList, setDomainList] = useState([]);
    const [selectedDomain, setSelectedDomain] = useState(null);

    let navigate;
    if (isWeb) {
        navigate = useNavigate();
    }

    useEffect(() => {
        fetchDomains();
    }, []);

    const fetchDomains = async () => {
        try {
            const domainData = await domains();
            setDomainList(domainData);
        } catch (error) {
            console.error('Fout bij het ophalen van domeinen:', error);
            Alert.alert('Fout', 'Er is een fout opgetreden bij het ophalen van de domeinen.');
        }
    };

    const handleChange = (name, value) => {
        setModuleData({ ...moduleData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            setModuleData({ ...moduleData, course_id: selectedDomain });

            const response = await addModule(moduleData);
            if (response) {
                Alert.alert('Succes', 'Module succesvol toegevoegd!');
                setModuleData({
                    module_name: '',
                    description: '',
                    domain_id: null,
                    progress_indicator: '',
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
            <Text style={styles.header}>Voeg een nieuwe module toe</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Module naam</Text>
                <TextInput
                    style={styles.input}
                    value={moduleData.module_name}
                    onChangeText={(value) => handleChange('module_name', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Module beschrijving</Text>
                <TextInput
                    style={styles.input}
                    value={moduleData.module_description}
                    onChangeText={(value) => handleChange('module_description', value)}
                    multiline
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Percentage</Text>
                <TextInput
                    style={styles.input}
                    value={moduleData.percentage}
                    onChangeText={(value) => handleChange('percentage', value)}
                    multiline
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Selecteer domein</Text>
                <Picker
                    selectedValue={selectedDomain}
                    onValueChange={(itemValue, itemIndex) => setSelectedDomain(itemValue)}
                >
                    <Picker.Item label="Selecteer een domein" value={null} />
                    {domainList.map((domain) => (
                        <Picker.Item key={domain.id} label={domain.course_name} value={domain.course_id} />
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

export default AddModule;
