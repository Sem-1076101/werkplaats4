import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {get_modules} from '../api';
import {useNavigate, useParams} from 'react-router-dom';
import isWeb from "../isWeb"; // Importeer useNavigate voor navigatie

const screenWidth = Dimensions.get('window').width;
const cardWidthWeb = screenWidth / 4 - 20; // 20 is voor margin

function Modules({navigation, route}) {
    const { domain_id } = isWeb ? useParams() : route.params;
    const [modules, setModules] = useState(null);

    let navigate;
    if (isWeb) {
        navigate = useNavigate();
    }

    useEffect(() => {
        const fetchDataInterval = setInterval(() => {
            get_modules(domain_id)
                .then(response => {
                    if (Array.isArray(response) && response.length) {
                        setModules(response);
                        console.log(response);
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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Beschikbare modules</Text>
            <View style={styles.modulesContainer}>
                {modules !== null ? (
                    modules.map((item, index) => (
                        <TouchableOpacity onPress={() => {
                            if (isWeb) {
                                navigate(`/Levels/${item.id}`);
                            } else {
                                navigation.navigate('Levels', {module_id: item.id});
                            }
                        }} key={index}>
                            <View style={[styles.card, {width: isWeb ? cardWidthWeb : '100%'}]}>
                                <View style={styles.cardBody}>
                                    <Text style={styles.cardTitle}>{item.module_name}</Text>
                                    <Text style={styles.cardText}>{item.description}</Text>
                                    <Text style={styles.cardText}>{item.progress_indicator}%</Text>
                                    <TouchableOpacity style={styles.cardButton}>
                                        <Text style={styles.cardButtonText}>Bekijk levels</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View style={styles.loading}>
                        <Text>Modules zijn aan het laden.</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    modulesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: isWeb ? 'space-between' : 'center', // Voor gelijkmatige ruimte tussen cards op web
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        marginHorizontal: isWeb ? 5 : 0, // Voor een kleine marge tussen de kaarten op web
    },
    cardBody: {
        padding: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 10,
    },
    cardButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    cardButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Modules;
