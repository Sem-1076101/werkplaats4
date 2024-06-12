import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { get_all_levels, deleteLevel } from '../api'; // Pas de import path aan zoals nodig

function LevelsOverview() {
    const [levels, setLevels] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchLevels();
    }, []);

    const fetchLevels = () => {
        get_all_levels()
            .then(responseData => {
                setLevels(responseData);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de data:', error);
            });
    };

    const handleDeleteLevel = (levelId) => {
        deleteLevel(levelId)
            .then(() => {
                fetchLevels();
            })
            .catch(error => {
                console.error('Er was een fout bij het verwijderen van het level:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Levels Overzicht</Text>
            <Text style={styles.subHeader}>Welkom op de levels overzicht pagina, hier kan je nieuwe levels toevoegen, wijzigen en verwijderen.</Text>
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddLevel')}
            >
                <Text style={styles.buttonText}>Level toevoegen</Text>
            </TouchableOpacity>
            {levels.length > 0 ? (
                <FlatList
                    data={levels}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.levelContainer}>
                            <Text style={styles.levelText}>{item.assignment_title}</Text>
                            <Text style={styles.levelText}>{item.assignment_description}</Text>
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() => navigation.navigate('EditLevel', { levelId: item.id })}
                            >
                                <Text style={styles.buttonText}>Wijzigen</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => {
                                    Alert.alert(
                                        "Verwijderen",
                                        "Weet je zeker dat je dit level wilt verwijderen?",
                                        [
                                            {
                                                text: "Nee",
                                                style: "cancel"
                                            },
                                            {
                                                text: "Ja",
                                                onPress: () => handleDeleteLevel(item.id)
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
                <Text>Geen levels gevonden</Text>
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
    levelContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    levelText: {
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

export default LevelsOverview;
