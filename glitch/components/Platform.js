import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useNavigate } from 'react-router-dom';
import { domains, deleteDomain } from '../api';
import isWeb from '../isWeb';

function Platform() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const navigation = useNavigation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchDomains();
    }, []);

    const fetchDomains = () => {
        domains()
            .then(responseData => {
                setData(responseData);
                setError(null);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de data:', error);
                setError('Er was een fout bij het ophalen van de data.');
            });
    };

    const handleDeleteDomain = (courseId) => {
        deleteDomain(courseId)
            .then(() => {
                fetchDomains();
            })
            .catch(error => {
                console.error('Er was een fout bij het verwijderen van het domein:', error);
                setError('Er was een fout bij het verwijderen van het domein.');
            });
    };

    const handleNavigate = (route, params) => {
        if (isWeb) {
            navigate(route, params);
        } else {
            navigation.navigate(route, params);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Platform</Text>
            <Text style={styles.subHeader}>Welkom op het platform pagina, hier kan je nieuwe domeinen toevoegen die studenten kunnen volgen.</Text>
            <View style={styles.addButtonContainer}>
                <Text style={styles.addButtonText}>Wijzig Domein</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => handleNavigate('/add-domain')}>
                    <Text style={styles.buttonText}>Domein toevoegen</Text>
                </TouchableOpacity>
            </View>
            {data.length > 0 ? (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.course_id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Image source={{ uri: `data:image/jpeg;base64,${item.course_image}` }} style={styles.image} />
                            <Text style={styles.courseName}>{item.course_name}</Text>
                            <Text style={styles.courseDescription}>{item.course_description}</Text>
                            <TouchableOpacity style={styles.editButton} onPress={() => handleNavigate(`/domains/${item.course_id}/edit-domain`, { course_id: item.course_id })}>
                                <Text style={styles.buttonText}>Wijzig dit domein</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={() => {
                                Alert.alert(
                                    "Verwijderen",
                                    "Weet je zeker dat je dit domein wilt verwijderen?",
                                    [
                                        { text: "Nee", style: "cancel" },
                                        { text: "Ja", onPress: () => handleDeleteDomain(item.course_id) }
                                    ]
                                );
                            }}>
                                <Text style={styles.buttonText}>Verwijder dit domein</Text>
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
    addButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 5,
    },
    addButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
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
    image: {
        width: 90,
        height: 90,
    },
    courseName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    courseDescription: {
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

export default Platform;
