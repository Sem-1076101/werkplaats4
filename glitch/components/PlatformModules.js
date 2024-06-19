import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { get_modules, deleteModule } from '../api';

function PlatformModules() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = () => {
        get_modules()
            .then(responseData => {
                setData(responseData);
                setError(null);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de data:', error);
                setError('Er was een fout bij het ophalen van de data.');
            });
    };

    const handleDeleteModule = (moduleId) => {
        deleteModule(moduleId)
            .then(() => {
                fetchModules();
            })
            .catch(error => {
                console.error('Er was een fout bij het verwijderen van de module:', error);
                setError('Er was een fout bij het verwijderen van de module.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Modules</Text>
            <Text style={styles.subHeader}>Welkom op de modules pagina, hier kan je nieuwe modules toevoegen, wijzigen en verwijderen.</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddModule')}>
                <Text style={styles.buttonText}>Module toevoegen</Text>
            </TouchableOpacity>
            {data.length > 0 ? (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.moduleName}>{item.module_name}</Text>
                            <Text style={styles.moduleDescription}>{item.description}</Text>
                            <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditModule', { moduleId: item.id })}>
                                <Text style={styles.buttonText}>Wijzig deze module</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => {
                                Alert.alert(
                                    "Verwijderen",
                                    "Weet je zeker dat je deze module wilt verwijderen?",
                                    [
                                        { text: "Nee", style: "cancel" },
                                        { text: "Ja", onPress: () => handleDeleteModule(item.id) }
                                    ]
                                );
                            }}>
                                <Text style={styles.buttonText}>Verwijder deze module</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : (
                <Text>Gegevens aan het laden</Text>
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
    itemContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    moduleName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    moduleDescription: {
        fontSize: 14,
    },
    editButton: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteButton: {
        backgroundColor: '#b00020',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default PlatformModules;
