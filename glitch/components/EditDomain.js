import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getDomain, editDomain } from '../api';
import BaseLayout from './BaseLayout'; // Assuming BaseLayout is a custom layout component
import isWeb from '../isWeb'; // Import isWeb function

const EditDomain = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { course_id } = route.params;
    const [domain, setDomain] = useState({ course_name: '', course_description: '' });

    useEffect(() => {
        getDomain(course_id)
            .then(domainData => {
                setDomain(domainData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [course_id]);

    const handleChange = (key, value) => {
        setDomain({
            ...domain,
            [key]: value
        });
    };

    const handleSubmit = () => {
        editDomain(course_id, domain)
            .then(updatedDomain => {
                setDomain({
                    course_name: updatedDomain.course_name || '',
                    course_description: updatedDomain.course_description || ''
                });
                Alert.alert('Succes', 'Domein succesvol bijgewerkt!');
                navigation.goBack();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (!domain) {
        return <Text>Gegevens aan het laden...</Text>;
    }

    return (
        <BaseLayout>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.header}>Wijzig Domein</Text>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Domeinnaam:</Text>
                    <TextInput
                        style={styles.input}
                        value={domain.course_name}
                        onChangeText={(text) => handleChange('course_name', text)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Beschrijving:</Text>
                    <TextInput
                        style={styles.textarea}
                        value={domain.course_description}
                        onChangeText={(text) => handleChange('course_description', text)}
                        multiline
                    />
                </View>
                <Button title="Wijzig domein" onPress={handleSubmit} />
                {isWeb && <Button title="Terug naar Platform" onPress={() => navigation.goBack()} />}
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

export default EditDomain;
