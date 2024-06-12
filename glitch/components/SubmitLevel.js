import React, {useState, useEffect} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View, ActivityIndicator} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import {get_level, get_level_by_id} from '../api';

function SubmitLevel() {
    const route = useRoute();
    const {assignment_id} = route.params;
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [level, setLevel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        get_level_by_id(assignment_id)
            .then(data => {
                setLevel(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching level data:', error);
                setLoading(false);
            });
    }, [assignment_id]);

    const handleFilePick = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        console.log(result);
        if (result.type === 'success') {
            setFile(result);
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

        axios.post(`/api/submit-level/${level_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                Alert.alert('Succes', 'Level succesvol ingeleverd!');
            })
            .catch(error => {
                console.error('Error submitting level:', error);
                Alert.alert('Fout', 'Er is een fout opgetreden bij het inleveren van het level');
            });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Level Inleveren</Text>
            {loading ? (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff"/>
                    <Text>Level gegevens worden geladen...</Text>
                </View>
            ) : level ? (
                <>
                    <Text style={styles.label}>Beschrijving: {level.level_description}</Text>
                    <Button title="Kies een bestand" onPress={handleFilePick}/>
                    {file && <Text style={styles.fileName}>Geselecteerd bestand: {file.name}</Text>}
                    <TextInput
                        style={styles.textInput}
                        placeholder="Beschrijving van de inlevering"
                        value={description}
                        onChangeText={setDescription}
                    />
                    <Button title="Inleveren" onPress={handleSubmit}/>
                </>
            ) : (
                <View style={styles.loading}>
                    <Text>Geen levelgegevens gevonden.</Text>
                </View>
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
});

export default SubmitLevel;