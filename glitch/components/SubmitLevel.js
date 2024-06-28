import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, Alert, ActivityIndicator} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isWeb from '../isWeb';
import {get_level_by_id, update_point_challenge} from '../api'; // Corrected import
import {useParams} from 'react-router-dom';

function SubmitLevel() {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [assignment, setAssignment] = useState(null);
    const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
    const [domain_id, setDomainId] = useState(null);

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
                    setAssignment(data);
                    setLoading(false);
                } else {
                    console.error('Unexpected response:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [assignment_id]);

    useEffect(() => {
        const fetchDomainId = async () => {
            try {
                const storedDomainId = await AsyncStorage.getItem('domain_id');
                if (storedDomainId) {
                    setDomainId(JSON.parse(storedDomainId));
                } else {
                    console.warn('No domain_id found in AsyncStorage');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error retrieving domain_id from AsyncStorage:', error);
                setLoading(false);
            }
        };

        fetchDomainId();
    }, []);

    const handleFilePick = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        if (result.type === 'success') {
            const {name, uri, mimeType} = result;
            setFile({name, uri, type: mimeType});
            setIsSubmitEnabled(true);
        }
    };

    const handleSubmit = async () => {
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

        try {
            await axios.post(`/api/submit-level/${assignment_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            Alert.alert('Succes', 'Level succesvol ingeleverd!');
            await updatePointChallenge();
        } catch (error) {
            console.error('Error submitting level:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
            Alert.alert('Fout', 'Er is een fout opgetreden bij het inleveren van het level');
        }
    };

    const updatePointChallenge = async () => {
        try {
            const studentnumber = await AsyncStorage.getItem('studentnumber');
            console.log('Updating point challenge for student:', studentnumber);
            await update_point_challenge(studentnumber);
            alert('Point challenge succesvol ontgrendeld!');
            handleNavigate();
        } catch (error) {
            console.error('Error updating point challenge:', error);
        }
    };

    const handleNavigate = async () => {
        try {
            const studentnumber = await AsyncStorage.getItem('studentnumber');
            const point_challenge = await AsyncStorage.getItem('point_challenge');
            console.log('logging point challenge for student:', point_challenge);
            await axios.post(`/api/update_point_challenge/${studentnumber}`);

            if (domain_id) {
                const path = `/modules/${domain_id}`;
                if (isWeb) {
                    window.location.href = path;
                } else {
                    navigation.navigate('Modules', {domain_id: domain_id});
                }
            } else {
                console.error('domain_id is null');
            }
        } catch (error) {
            console.error('Error updating point challenge:', error);
            // Log de volledige error object voor meer details
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Level Inleveren</Text>
            {loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                    <Text>Level gegevens worden geladen...</Text>
                </View>
            ) : (
                <>
                    <Text style={styles.label}>Beschrijving: {assignment && assignment.assignment_title}</Text>
                    <Button title="Kies een bestand" onPress={handleFilePick}/>
                    {file && <Text style={styles.fileName}>Geselecteerd bestand: {file.name}</Text>}
                    <TextInput
                        style={styles.textInput}
                        placeholder="Beschrijving van de inlevering"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Button title="Inleveren" onPress={handleSubmit}/>
                    <View style={styles.linkContainer}>
                        <Button title="Ga naar Modules" onPress={updatePointChallenge}/>
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
// Compare this snippet from glitch/components/Modules.js: