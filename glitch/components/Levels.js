import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigate, useParams } from 'react-router-dom';
import { useRoute, useNavigation } from '@react-navigation/native';
import { get_level_by_module_id } from '../api';
import isWeb from '../isWeb';

function Levels({navigation}) {
    const [levels, setLevels] = useState(null);

    const { module_id } = isWeb ? useParams() : useRoute().params;
    const navigate = isWeb ? useNavigate() : useNavigation();


    useEffect(() => {
        const fetchDataInterval = setInterval(() => {
            get_level_by_module_id(module_id)
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

    // const handleNavigate = (assignment_id) => {
    //     const path = `/SubmitLevel/${assignment_id}`;
    //     if (isWeb) {
    //         navigate(path);
    //     } else {
    //         navigate('submitlevel', { assignment_id: assignment_id });
    //     }
    // };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Level:</Text>
            <View>
                {levels ? (
                    levels.length > 0 ? (
                        levels.map((level, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.level}
                                onPress={() => {
                                if (isWeb) {
                                    navigate(`/SubmitLevel/${level.assignment_id}`);
                                } else {
                                    navigation.navigate('SubmitLevel', {assignment_id: level.assignment_id});
                                }
                                }}
                            >
                                <Text style={styles.levelText}>Naam: {level.assignment_title}</Text>
                                <Text style={styles.levelText}>Beschrijving: {level.assignment_description}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text>Er zijn geen levels.</Text>
                    )
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
