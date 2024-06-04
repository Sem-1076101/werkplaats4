import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, Image, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useNavigate} from 'react-router-dom';
import {addDomainWithImage} from '../api';
import isWeb from '../isWeb';

function AddDomain({navigation}) {
    const [domain, setDomain] = useState({
        course_name: '',
        course_description: '',
    });
    const [selectedImage, setSelectedImage] = useState(null);

    let navigate;
    if (isWeb) {
        navigate = useNavigate();
    }

    const handleChange = (name, value) => {
        setDomain({...domain, [name]: value});
    };

    const handleImageChange = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result);
        }
    };

    const handleSubmit = async () => {
        console.log('handleSubmit wordt aangeroepen');
        try {
            if (!selectedImage || !selectedImage.uri) {
                Alert.alert('Fout', 'Selecteer een afbeelding voordat u doorgaat.');
                return;
            }

            const formData = new FormData();
            formData.append('course_name', domain.course_name);
            formData.append('course_description', domain.course_description);

            // Voeg de afbeeldingsgegevens direct toe als een blob aan de FormData
            formData.append('course_image', {
                uri: selectedImage.uri,
                name: 'photo.jpg',
                type: 'image/jpeg',
            });

            const response = await addDomainWithImage(formData);
            if (response) {
                Alert.alert('Succes', 'Domein succesvol toegevoegd!');
                setDomain({
                    course_name: '',
                    course_description: '',
                });
                setSelectedImage(null);

                if (isWeb) {
                    navigate('/platform');
                } else {
                    navigation.navigate('Platform');
                }
            } else {
                console.error('Ongeldige respons:', response);
                Alert.alert('Fout', 'Ongeldige respons van de server.');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Fout', 'Er is een fout opgetreden tijdens het opslaan.');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Voeg een nieuw domein toe</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Domeinnaam</Text>
                <TextInput
                    style={styles.input}
                    value={domain.course_name}
                    onChangeText={(value) => handleChange('course_name', value)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Domeinbeschrijving</Text>
                <TextInput
                    style={styles.input}
                    value={domain.course_description}
                    onChangeText={(value) => handleChange('course_description', value)}
                    multiline
                />
            </View>
            <Button title="Kies Afbeelding" onPress={handleImageChange}/>
            {selectedImage && (
                <Image source={{uri: selectedImage.uri}} style={styles.image}/>
            )}
            <Button title="Voeg toe" onPress={handleSubmit}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 12,
        fontSize: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
});

export default AddDomain;
