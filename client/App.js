import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import Dashboard from './components/Dashboard';
import Platform from './components/Platform';
import EditDomain from './components/EditDomain';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/platform" element={<Platform />} />
                <Route path="/wijzig/domein/:id" element={<EditDomain />} />
            </Routes>
        </Router>
    );
}

export default App;
