import React, { useEffect, useState } from 'react';
import isWeb from './isWeb';
import { createStackNavigator } from '@react-navigation/stack';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import Index from './components/Index';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Modules from './components/Modules';
import BaseLayout from './components/BaseLayout';

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
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/modules/:domain_id" element={<Modules />} />
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
                        <Stack.Screen name="Dashboard" component={Dashboard} />
                        <Stack.Screen name="Modules" component={Modules} />
                    </Stack.Navigator>
                </BaseLayout>
            </ThemeProvider>
        );
    }
}

export default App;
