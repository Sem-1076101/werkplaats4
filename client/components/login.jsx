import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function Login() {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            console.log('Logging in:', formData); 
            const response = await axios.post('http://localhost:5000/login', formData);
            console.log('Response:', response.data); 
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Error:', error.response.data); 
        }
    };

    return (
        <div>
            <h2>Inloggen</h2>
            <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Wachtwoord" value={formData.password} onChange={handleChange} />
            <button onClick={handleLogin}>Inloggen</button>
        </div>
    );
}

export default Login;
