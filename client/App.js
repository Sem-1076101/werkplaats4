import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './components/Index';
import Dashboard from './components/Dashboard';
import Platform from './components/Platform';
import EditDomain from './components/EditDomain';
import AddDomain from './components/AddDomain';
import EditModule from './components/EditModule';
import AddModule from './components/AddModule';
import Modules from "./components/Modules";
import Levels from "./components/Levels";
import PlatformModules from "./components/PlatformModules"; // pas de bestandsnaam aan

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Index" component={Index} options={{ title: 'Index' }} />
                <Stack.Screen name="Dashboard" component={Dashboard} options={{ title: 'Dashboard' }} />
                <Stack.Screen name="Platform" component={Platform} options={{ title: 'Platform' }} />
                <Stack.Screen name="EditDomain" component={EditDomain} options={{ title: 'Wijzig Domein' }} />
                <Stack.Screen name="EditModule" component={EditModule} options={{ title: 'Wijzig Module' }} />
                <Stack.Screen name="AddModule" component={AddModule} options={{ title: 'Module toevoegen' }} />
                <Stack.Screen name="AddDomain" component={AddDomain} options={{ title: 'Domein toevoegen' }} />
                <Stack.Screen name="Modules" component={Modules} options={{ title: 'Modules' }} />
                <Stack.Screen name="Levels" component={Levels} options={{ title: 'Levels' }} />
                <Stack.Screen name="PlatformModules" component={PlatformModules} options={{ title: 'Platform Modules' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}