import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import Dashboard from './components/Dashboard';
import Platform from './components/Platform';
import EditDomain from './components/EditDomain';
import AddDomain from './components/AddDomain';
import Modules from "./components/Modules";
import Levels from "./components/Levels";
import Platform_modules from "./components/Platform_modules";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/platform" element={<Platform />} />
                <Route path="/wijzig/domein/:id" element={<EditDomain />} />
                <Route path="/aanmaken/domein/" element={<AddDomain />} />
                <Route path="/modules/:domain_id" element={<Modules />} />
                <Route path="/levels/:module_id" element={<Levels />} />
                <Route path="/platform/modules" element={<Platform_modules />} />

            </Routes>
        </Router>
    );
}

export default App;







