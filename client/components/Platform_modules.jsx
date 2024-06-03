import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getModules, deleteModule } from '../api'; // Pas de import path aan zoals nodig

function PlatformModules() {
    const [modules, setPlatformModules] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = () => {
        getModules()
            .then(responseData => {
                setPlatformModules(responseData);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de data:', error);
            });
    };

    const handleDeleteModule = (moduleId) => {
        deleteModule(moduleId)
            .then(() => {
                fetchModules();
            })
            .catch(error => {
                console.error('Er was een fout bij het verwijderen van de module:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Modules Platform</Text>
            <Text style={styles.subHeader}>Welkom op de modules platform pagina, hier kan je nieuwe modules toevoegen die studenten kunnen volgen.</Text>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddModule')}
            >
                <Text style={styles.buttonText}>Module toevoegen</Text>
            </TouchableOpacity>
            {modules.length > 0 ? (
                <FlatList
                    data={modules}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.moduleContainer}>
                            <Text style={styles.moduleText}>{item.module_name}</Text>
                            <Text style={styles.moduleText}>{item.description}</Text>
                            <Text style={styles.moduleText}>{item.progress_indicator}%</Text>
                            <Text style={styles.moduleText}>{item.domain_id}</Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => navigation.navigate('EditModule', { moduleId: item.id })}
                            >
                                <Text style={styles.buttonText}>Wijzigen</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => {
                                    Alert.alert(
                                        "Verwijderen",
                                        "Weet je zeker dat je deze module wilt verwijderen?",
                                        [
                                            {
                                                text: "Nee",
                                                style: "cancel"
                                            },
                                            {
                                                text: "Ja",
                                                onPress: () => handleDeleteModule(item.id)
                                            }
                                        ]
                                    );
                                }}
                            >
                                <Text style={styles.buttonText}>Verwijderen</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <Text>Geen modules gevonden</Text>
            )}
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subHeader: {
        fontSize: 16,
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    moduleContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    moduleText: {
        fontSize: 16,
    },
    editButton: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    deleteButton: {
        backgroundColor: '#b00020',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
});

export default PlatformModules;