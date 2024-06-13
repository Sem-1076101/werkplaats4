import React from 'react';
import isWeb from './isWeb';
import { createStackNavigator } from '@react-navigation/stack';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import BaseLayout from './components/BaseLayout';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Modules from './components/Modules';
import Levels from './components/Levels';
import AddDomain from './components/AddDomain';
import AddModules from './components/AddModules';
import SubmitLevel from './components/SubmitLevel';

const Stack = createStackNavigator();

function App() {
    if (isWeb) {
        return (
            <ThemeProvider>
                <Router>
                    <BaseLayout>
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/home" element={<Index />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/modules/:domain_id" element={<Modules />} />
                            <Route path="/levels/:module_id" element={<Levels />} />
                            <Route path="/add-domain" element={<AddDomain />} />
                            <Route path="/add-modules" element={<AddModules />} />
                            <Route path="/levels/:assignment_id/submitlevel" element={<SubmitLevel />} />
                        </Routes>
                    </BaseLayout>
                </Router>
            </ThemeProvider>
        );
    } else {
        return (
            <ThemeProvider>
                <BaseLayout>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={Index} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                        <Stack.Screen name="Modules" component={Modules} />
                        <Stack.Screen name="Levels" component={Levels} />
                        <Stack.Screen name="SubmitLevel" component={SubmitLevel} />
                        <Stack.Screen name="AddDomain" component={AddDomain} />
                        <Stack.Screen name="AddModules" component={AddModules} />
                    </Stack.Navigator>
                </BaseLayout>
            </ThemeProvider>
        );
    }
}

export default App;
