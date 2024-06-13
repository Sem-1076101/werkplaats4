import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { get_module_by_id, editModule } from '../api'; // Pas de import path aan zoals nodig

const EditModule = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { module_id } = route.params;
    const [module, setModule] = useState({
        module_name: '',
        description: '',
        progress_indicator: '',
        domain_id: ''
    });

    useEffect(() => {
        get_module_by_id(module_id)
            .then(moduleData => {
                setModule(moduleData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [module_id]);

    const handleChange = (key, value) => {
        setModule({
            ...module,
            [key]: value
        });
    };

    const handleSubmit = () => {
        editModule(module_id, module)
            .then(updatedModule => {
                setModule({
                    module_name: updatedModule.module_name || '',
                    description: updatedModule.description || '',
                    progress_indicator: updatedModule.progress_indicator || '',
                    domain_id: updatedModule.domain_id || ''
                });
                Alert.alert('Succes', 'Module succesvol bijgewerkt!');
                navigation.goBack();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (!module) {
        return <Text>Gegevens aan het laden...</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Wijzig Module</Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Module Naam:</Text>
                <TextInput
                    style={styles.input}
                    value={module.module_name}
                    onChangeText={(text) => handleChange('module_name', text)}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Beschrijving:</Text>
                <TextInput
                    style={styles.textarea}
                    value={module.description}
                    onChangeText={(text) => handleChange('description', text)}
                    multiline
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Voortgang Indicator:</Text>
                <TextInput
                    style={styles.input}
                    value={module.progress_indicator}
                    onChangeText={(text) => handleChange('progress_indicator', text)}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Domein ID:</Text>
                <TextInput
                    style={styles.input}
                    value={module.domain_id}
                    onChangeText={(text) => handleChange('domain_id', text)}
                />
            </View>
            <Button title="Wijzig module" onPress={handleSubmit} />
            <Button title="Terug naar Modules" onPress={() => navigation.goBack()} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
    },
    textarea: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
    },
});

export default EditModule;
