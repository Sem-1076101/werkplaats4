import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import HelloWorld from './components/HelloWorld';

export default function App() {
    return (
        <HelloWorld name={"Bryan"}/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
