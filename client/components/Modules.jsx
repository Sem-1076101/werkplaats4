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
        <BaseLayout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Beschikbare modules</h1>
                        <div>
                            {modules ? (
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Module naam</th>
                                        <th>Beschrijving</th>
                                        <th>Progressie indicator</th>
                                        <th>Level</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {modules.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.module_name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.progress_indicator}%</td>
                                            <td>
                                                <Link to={`/levels/${item.id}`}>Bekijk levels</Link>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="mt-5">
                                    <p>Modules zijn aan het laden.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
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
