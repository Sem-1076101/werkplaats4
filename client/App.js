import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HelloWorld from './components/HelloWorld';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HelloWorld />} />
            </Routes>
        </Router>
    );
}

export default App;
