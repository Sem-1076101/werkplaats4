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
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [courseId, setCourseId] = useState(null);

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
        console.log('Fetching level data for assignment ID:', assignment_id);
        get_level_by_id(assignment_id)
            .then(data => {
                if (data) {
                    console.log('Data fetched successfully:', data);
                    setAssignment(data);
                    setLoading(false);
                } else {
                    console.error('Unexpected response:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [assignment_id]);

    useEffect(() => {
        // Fetch the current student's data to get the course_id
        axios.get('/api/current-student')
            .then(response => {
                setCourseId(response.data.course_id);
            })
            .catch(error => {
                console.error('Error fetching student data:', error);
            });
    }, []);

    const handleFilePick = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        if (result.type === 'success') {
            const { name, uri, mimeType } = result;
            console.log('File picked:', { name, uri, mimeType });
            setFile({ name, uri, type: mimeType });
            setIsSubmitEnabled(true);
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
                showChallenge();
            })
            .catch(error => {
                console.error('Error submitting level:', error);
                Alert.alert('Fout', 'Er is een fout opgetreden bij het inleveren van het level');
            });
    };

    const showChallenge = () => {
        const randomChallenge = Math.random() > 0.5 ? pointChallenges : conceptChallenges;
        const challenge = randomChallenge[Math.floor(Math.random() * randomChallenge.length)];
        Alert.alert('Challenge', challenge.question, [
            { text: 'OK', onPress: handleNavigate }
        ]);
    };

    const updatePointChallenge = async () => {
        try {
            await axios.put(`/api/update-point-challenge/${assignment_id}`, {
                point_challenge: 2,
            });
            handleNavigate();
        } catch (error) {
            console.error('Error updating point challenge:', error);
        }
    };

    const handleNavigate = () => {
        if (courseId) {
            const path = `/modules/${courseId}`;
            if (isWeb) {
                window.location.href = path;
            } else {
                navigation.navigate('Modules', { course_id: courseId });
            }
        } else {
            console.error('courseId is null');
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
                    <View style={styles.linkContainer}>
                        <Button title="Ga naar Modules" onPress={updatePointChallenge} />
                    </View>
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
    },
    linkContainer: {
        marginTop: 20,
    },
});

export default SubmitLevel;
