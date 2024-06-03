import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

function SubmitLevel({ level_id }) {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');

    const handleFilePick = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
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
            type: 'application/octet-stream', // Pas dit aan als je een specifiek bestandstype verwacht
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

    // ... rest of your code ...
}

export default SubmitLevel;

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Level Inleveren</Text>
            {level ? (
                <>
                    <Text style={styles.label}>Naam: {level.assignment_title}</Text>
                    <Text style={styles.label}>Beschrijving: {level.assignment_description}</Text>
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
            ) : (
                <View style={styles.loading}>
                    <Text>Levelgegevens worden geladen...</Text>
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
