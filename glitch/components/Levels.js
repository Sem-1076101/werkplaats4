import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { useRoute } from '@react-navigation/native';
import {get_level} from '../api';
import axios from 'axios';

function Levels() {
    const route = useRoute();
    const { module_id } = route.params;
    const [levels, setLevels] = useState(null);

       useEffect(() => {
        const fetchDataInterval = setInterval(() => {
            get_level(module_id)
                .then(data => {
                    if (data) {
                        setLevels(data);
                        console.log(data);
                    } else {
                        console.error('Unexpected response:', data);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }, 1000);
        return () => {
            clearInterval(fetchDataInterval);
        };
    }, [module_id]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Level:</Text>
             <View>
                {levels ? (
                    levels.map((level, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.level}
                            onPress={() => navigation.navigate('SubmitLevel', { level_id: level.assignment_id })}>
                            <Text style={styles.levelText}>Naam: {level.assignment_title}</Text>
                            <Text style={styles.levelText}>Beschrijving: {level.assignment_description}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Levels zijn aan het laden.</Text>
                    </View>
                )}
            </View>
        </ScrollView>
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
    level: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    levelText: {
        fontSize: 16,
        marginBottom: 8,
    },
    loading: {
        marginTop: 50,
        alignItems: 'center',
    },
});

export default Levels;
