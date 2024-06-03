import 'react-native-gesture-handler';
import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import Index from './components/Index';
import Dashboard from './components/Dashboard';
import Platform from './components/Platform';
import EditDomain from './components/EditDomain';
import AddDomain from './components/AddDomain';
// import EditModule from './components/EditModule';
// import AddModule from './components/AddModule';
import Modules from "./components/Modules";
import Login from "./components/Login"
import Register from './components/Register';
import Levels from "./components/Levels";
// import PlatformModules from "./components/PlatformModules"; // pas de bestandsnaam aan


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} /> {}
                <Route path="/login" element={<Login />} /> {}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/platform" element={<Platform />} />
                <Route path="/wijzig/domein/:id" element={<EditDomain />} />
                <Route path="/aanmaken/domein/" element={<AddDomain />} />
                <Route path="/modules/:domain_id" element={<Modules />} />
                <Route path="/levels/:module_id" element={<Levels />} />
            </Routes>
        </Router>
    );
}

export default App;

