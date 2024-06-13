import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getSubmissionsForLevel, submitTeacherReview } from '../api'; // Importeer je API-functies

function LevelDetails() {
    const route = useRoute();
    const navigation = useNavigation();
    const { assignment_id } = route.params;

    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = () => {
        getSubmissionsForLevel(assignment_id)
            .then(submissionsData => {
                setSubmissions(submissionsData);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de data:', error);
            });
    };

    const handleReviewSubmission = (submissionId, teacherReview, rating) => {
        submitTeacherReview(submissionId, teacherReview, rating)
            .then(() => {
                Alert.alert('Succes', 'Beoordeling opgeslagen!');
                fetchSubmissions();
            })
            .catch(error => {
                console.error('Er was een fout bij het opslaan van de beoordeling:', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Level Details</Text>
            <FlatList
                data={submissions}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.submissionContainer}>
                        <Text style={styles.submissionText}>Student ID: {item.user_id}</Text>
                        <Text style={styles.submissionText}>Bestandsnaam: {item.level_file}</Text>
                        <Text style={styles.submissionText}>Beschrijving: {item.level_description}</Text>
                        <Button
                            title="Beoordelen"
                            onPress={() => handleReviewSubmission(item.id, 'Voldoende', 'Goed')}
                        />
                    </View>
                )}
            />
            <Button title="Terug naar Levels" onPress={() => navigation.goBack()} />
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
    submissionContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    submissionText: {
        fontSize: 16,
    },
});

export default LevelDetails;
