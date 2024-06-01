import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Alert, Modal, ScrollView, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseLayout from './BaseLayout';
import connection from '../api';
import {enrollStudent} from '../api';
import {checkEnrollment} from '../api';

function Dashboard({navigation}) {
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [courseName, setCourseName] = useState(null);
    const [courseId, setCourseId] = useState(null);
    const [studentnumber, setStudentnumber] = useState('');

    useEffect(() => {
        const fetchStudentnumber = async () => {
            const storedStudentnumber = await AsyncStorage.getItem('studentnumber');
            setStudentnumber(storedStudentnumber);
        };
        fetchStudentnumber();
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEnrollStudent = async (courseId) => {
        try {
            await enrollStudent(studentnumber, courseId);
            handleCloseModal();
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 5000);
        } catch (error) {
            console.error('Error enrolling student:', error);
        }
    };

    useEffect(() => {
        const checkEnrollmentInterval = setInterval(async () => {
            if (studentnumber) {
                try {
                    const response = await checkEnrollment(studentnumber);
                    console.log('Response:', response);
                    setCourseName(response.course_name);
                    setCourseId(response.course_id);
                } catch (error) {
                    console.error('Error checking enrollment:', error);
                }
            }
        }, 1000);

        const fetchDataInterval = setInterval(async () => {
            try {
                const response = await connection.get('/api/domains');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }, 1000);

        return () => {
            clearInterval(checkEnrollmentInterval);
            clearInterval(fetchDataInterval);
        };
    }, [studentnumber]);

    return (
        <View>
            {showSuccessAlert && (
                <View style={styles.alert}>
                    <Text style={styles.alertText}>U heeft zich succesvol aangemeld voor het domein!</Text>
                </View>
            )}
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.header}>Dashboard</Text>
                        <Text style={styles.subHeader}>Uitleg</Text>
                        <Text style={styles.paragraph}>
                            Welkom op de dashboard pagina. Hier vind je een overzicht van de domeinen die je volgt en de
                            voortgang die je hebt geboekt.
                        </Text>
                        <Text style={styles.subHeader}>Domeinen</Text>
                        {courseName ? (
                            <Text style={styles.paragraph}>
                                Je bent al toegevoegd aan een domein, namelijk <Text style={styles.link}
                                                                                     onPress={() => navigation.navigate('Modules', {courseId})}>{courseName}</Text>.
                            </Text>
                        ) : (
                            <Text style={styles.paragraph}>
                                Je hebt nog geen domein toegevoegd. Klik <Text style={styles.link}
                                                                               onPress={handleOpenModal}>hier</Text> om
                                een domein te volgen.
                            </Text>
                        )}
                    </View>
                </View>

                <Modal visible={showModal} transparent={true} animationType="slide">
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Domeinen</Text>
                                <Button title="Sluiten" onPress={handleCloseModal}/>
                            </View>
                            <ScrollView contentContainerStyle={styles.modalBody}>
                                {data ? (
                                    data.map((item, index) => (
                                        <View style={styles.card} key={index}>
                                            <Image source={{uri: `data:image/jpeg;base64,${item.course_image}`}}
                                                   style={styles.cardImage}/>
                                            <View style={styles.cardBody}>
                                                <Text style={styles.cardTitle}>{item.course_name}</Text>
                                                <Text style={styles.cardText}>{item.course_description}</Text>
                                                <TouchableOpacity onPress={(event) => {
                                                    event.preventDefault();
                                                    handleEnrollStudent(item.course_id);
                                                }} style={styles.cardButton}>
                                                    <Text style={styles.cardButtonText}>Aanmelden bij dit domein</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={styles.paragraph}>Geen data beschikbaar.</Text>
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 12,
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    alert: {
        backgroundColor: 'green',
        padding: 10,
        marginBottom: 10,
    },
    alertText: {
        color: 'white',
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 10,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalBody: {
        flexGrow: 1,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    cardImage: {
        width: '100%',
        height: 150,
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
});

export default Dashboard;
