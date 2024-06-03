import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';

function Modules() {
    const route = useRoute();
    const { domain_id } = route.params;
    const [modules, setModules] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchDataInterval = setInterval(() => {
            axios.get(`https://your-api-url.com/api/modules/${domain_id}`)
                .then(response => {
                    if (response && response.data) {
                        setModules(response.data);
                    } else {
                        console.error('Unexpected response:', response);
                    }
                })
                .catch(error => console.error('Error fetching data:', error));
        }, 1000);

        return () => {
            clearInterval(fetchDataInterval);
        };
    }, [domain_id]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Beschikbare modules</Text>
            <View>
                {modules ? (
                    <FlatList
                        data={modules}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.module}>
                                <Text style={styles.moduleText}>Naam: {item.module_name}</Text>
                                <Text style={styles.moduleText}>Beschrijving: {item.description}</Text>
                                <Text style={styles.moduleText}>Progressie indicator: {item.progress_indicator}%</Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => navigation.navigate('Levels', { module_id: item.id })}
                                >
                                    <Text style={styles.buttonText}>Bekijk levels</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                ) : (
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text>Modules zijn aan het laden.</Text>
                    </View>
                )}
            </View>
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
    module: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    moduleText: {
        fontSize: 16,
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    loading: {
        marginTop: 50,
        alignItems: 'center',
    },
});

export default Modules;
