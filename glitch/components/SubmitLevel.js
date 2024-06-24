import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import isWeb from '../isWeb';
import { get_level_by_id } from '../api';
import { useParams } from 'react-router-dom'; // Add this import

function SubmitLevel() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [assignment, setAssignment] = useState(null);

    let assignment_id;
    if (isWeb) {
        const params = useParams();
        assignment_id = params.assignment_id;
    } else {
        const route = useRoute();
        assignment_id = route.params.assignment_id;
    }

    const navigation = useNavigation();

    useEffect(() => {
        get_level_by_id(assignment_id)
            .then(data => {
                if (data) {
                    setAssignment(data);
                    setLoading(false);
                } else {
                    console.error('Unexpected response:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [assignment_id]);

    const handleFilePick = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        if (result.type === 'success') {
            const { name, uri, mimeType } = result;
            setFile({ name, uri, type: mimeType });
        }
    };

    const handleSubmit = () => {
        if (!file) {
            Alert.alert('Fout', 'Selecteer een bestand om in te leveren');
            return;
        }

        const formData = new FormData();
        formData.append('level_file', {
            uri: file.uri,
            name: file.name,
            type: file.type || 'application/octet-stream',
        });
        formData.append('level_description', description);

        axios.post(`/api/submit-level/${assignment_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                Alert.alert('Succes', 'Level succesvol ingeleverd!');
                handleNavigate(assignment_id);
            })
            .catch(error => {
                console.error('Error submitting level:', error);
                Alert.alert('Fout', 'Er is een fout opgetreden bij het inleveren van het level');
            });
    };

    let navigate;
    const handleNavigate = (assignment_id) => {
        const path = `/levels/${assignment_id}`;
        if (isWeb) {
            navigate(path);
        } else {
            navigation.navigate('Levels', { assignment_id: assignment_id });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Level Inleveren</Text>
            {loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Level gegevens worden geladen...</Text>
                </View>
            ) : (
                <>
                    <Text style={styles.label}>Beschrijving: {assignment && assignment.assignment_title}</Text>
                    <Button title="Kies een bestand" onPress={handleFilePick} />
                    {file && <Text style={styles.fileName}>Geselecteerd bestand: {file.name}</Text>}
                    <TextInput
                        style={styles.textInput}
                        placeholder="Beschrijving van de inlevering"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Button title="Inleveren" onPress={handleSubmit} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
    },
    fileName: {
        marginTop: 8,
        marginBottom: 16,
        fontStyle: 'italic',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        width: '100%',
        paddingHorizontal: 8,
    },
    loading: {
        marginTop: 50,
        alignItems: 'center',
    }
});

export default SubmitLevel;
