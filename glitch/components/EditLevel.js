import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { get_level_by_id, editLevel } from '../api';
import BaseLayout from './BaseLayout'; // Assuming BaseLayout is a custom layout component

const EditLevel = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { assignment_id } = route.params;
    const [level, setLevel] = useState({ assignment_title: '', assignment_description: '' });

    useEffect(() => {
        get_level_by_id(assignment_id)
            .then(levelData => {
                setLevel(levelData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [assignment_id]);

    const handleChange = (key, value) => {
        setLevel({
            ...level,
            [key]: value
        });
    };
// tedst
    const handleSubmit = () => {
        editLevel(assignment_id, level)
            .then(updatedLevel => {
                setLevel({
                    assignment_title: updatedLevel.assignment_title || '',
                    assignment_description: updatedLevel.assignment_description || ''
                });
                Alert.alert('Succes', 'Level succesvol bijgewerkt!');
                navigation.goBack();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (!level) {
        return <Text>Gegevens aan het laden...</Text>;
    }

    return (
        <BaseLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Wijzig Level</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Levelnaam:</Text>
                    <TextInput
                        style={styles.input}
                        value={level.assignment_title}
                        onChangeText={(text) => handleChange('assignment_title', text)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Beschrijving:</Text>
                    <TextInput
                        style={styles.textarea}
                        value={level.assignment_description}
                        onChangeText={(text) => handleChange('assignment_description', text)}
                        multiline
                    />
                </View>
                <Button title="Wijzig level" onPress={handleSubmit} />
                <Button title="Terug naar Levels" onPress={() => navigation.goBack()} />
            </ScrollView>
        </BaseLayout>
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

export default EditLevel;
