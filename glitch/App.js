import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from './components/ThemeContext';
import Index from './components/Index';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={Index}/>
                    {/* Voeg hier andere schermen toe, zoals Login en Register */}
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default Routes;

