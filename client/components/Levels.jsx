import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

function Levels() {
    const route = useRoute();
    const { module_id } = route.params;
    const [levels, setLevels] = useState(null);

    useEffect(() => {
        const fetchDataInterval = setInterval(() => {
            axios.get(`https://your-api-url.com/api/levels/${module_id}`)
                .then(response => {
                    if (response && response.data) {
                        setLevels(response.data);
                        console.log(response.data);
                    } else {
                        console.error('Unexpected response:', response);
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
                        <View key={index} style={styles.level}>
                            <Text style={styles.levelText}>Naam: {level.name}</Text>
                            <Text style={styles.levelText}>Beschrijving: {level.description}</Text>
                            {/* Voeg hier meer velden toe indien nodig */}
                        </View>
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
