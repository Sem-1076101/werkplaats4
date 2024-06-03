import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getModules, addModule } from '../api'; // Zorg ervoor dat je de juiste pad hebt

function AddModule() {
    const [module, setModule] = useState({
        module_name: '',
        description: '',
        progress_indicator: '',
        domain_id: ''
    });

    const [modules, setPlatformModules] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getModules()
            .then(responseData => {
                setPlatformModules(responseData);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de data:', error);
            });
    }, []);

    const handleChange = (name, value) => {
        setModule({
            ...module,
            [name]: value
        });
    };

    const handleSubmit = () => {
        addModule(module)
            .then(() => {
                Alert.alert('Succes', 'Module succesvol toegevoegd!');
                setModule({
                    module_name: '',
                    description: '',
                    progress_indicator: '',
                    domain_id: ''
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Voeg een nieuwe module toe</Text>
                <Button title="Terug naar module-platform" onPress={() => navigation.navigate('PlatformModules')} />
            </View>
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Module naam</Text>
                    <TextInput
                        style={styles.input}
                        value={module.module_name}
                        onChangeText={(value) => handleChange('module_name', value)}
                        required
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Domein beschrijving</Text>
                    <TextInput
                        style={styles.input}
                        value={module.description}
                        onChangeText={(value) => handleChange('description', value)}
                        required
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Progressie indicator</Text>
                    <TextInput
                        style={styles.input}
                        value={module.progress_indicator}
                        onChangeText={(value) => handleChange('progress_indicator', value)}
                        required
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Domein</Text>
                    <Picker
                        selectedValue={module.domain_id}
                        style={styles.input}
                        onValueChange={(value) => handleChange('domain_id', value)}
                        required
                    >
                        {modules.map((domain) => (
                            <Picker.Item key={domain.id} label={domain.name} value={domain.id} />
                        ))}
                    </Picker>
                </View>
                <Button title="Voeg toe" onPress={handleSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    form: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
        borderRadius: 4,
    },
});

export default AddModule;