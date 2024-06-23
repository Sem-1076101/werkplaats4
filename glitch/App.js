import React from 'react';
import isWeb from './isWeb';
import { createStackNavigator } from '@react-navigation/stack';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import BaseLayout from './components/BaseLayout';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import Platform from './components/Platform';
import PlatformModules from "./components/PlatformModules";
import Dashboard from './components/Dashboard';
import DashboardLevels from "./components/DashboardLevels";
import Modules from './components/Modules';
import Levels from './components/Levels';
import AddDomain from './components/AddDomain';
import AddModules from './components/AddModules';
import SubmitLevel from './components/SubmitLevel';
import EditLevel from "./components/EditLevel";
import EditModule from "./components/EditModule";
import EditDomain from "./components/EditDomain";
import AddModule from "./components/AddModules";
import AddLevel from "./components/AddLevel";

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
                            <Route path="/platform" element={<Platform />} />
                            <Route path="/platform-modules" element={<PlatformModules />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/dashboard-levels" element={<DashboardLevels />} />
                            <Route path="/modules/:domain_id" element={<Modules />} />
                            <Route path="/levels/:module_id" element={<Levels />} />
                            <Route path="/add-domain" element={<AddDomain />} />
                            <Route path="/add-modules" element={<AddModules />} />
                            <Route path="/submitlevel/:assignment_id" element={<SubmitLevel />} />
                            <Route path="/levels/:assignment_id/editlevel" element={<EditLevel />} />
                            <Route path="/modules/:module_id/edit-module" element={<EditModule />} />
                            <Route path="/domains/:domain_id/edit-domain" element={<EditDomain />} />
                            <Route path="/add-level" element={<AddLevel />} />
                            <Route path="/add-module" element={<AddModule />} />
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
                        <Stack.Screen name="DashboardLevels" component={DashboardLevels} />
                        <Stack.Screen name="Modules" component={Modules} />
                        <Stack.Screen name="Levels" component={Levels} />
                        <Stack.Screen name="SubmitLevel" component={SubmitLevel} />
                        <Stack.Screen name="AddDomain" component={AddDomain} />
                        <Stack.Screen name="AddModules" component={AddModules} />
                        <Stack.Screen name="EditLevel" component={EditLevel} />
                        <Stack.Screen name="EditModule" component={EditModule} />
                        <Stack.Screen name="AddLevel" component={AddLevel} />
                        <Stack.Screen name="AddModule" component={AddModule} />
                        <Stack.Screen name="EditDomain" component={EditDomain} />

                    </Stack.Navigator>
                </BaseLayout>
            </ThemeProvider>
        );
    }
}

export default App;
