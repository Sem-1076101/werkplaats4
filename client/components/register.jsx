import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', first_name: '', last_name: '', studentnumber: '' });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            console.log('Registering:', formData); 
            const response = await axios.post('http://localhost:5000/register', formData);
            console.log('Response:', response.data); 
            navigate('/login'); 
        } catch (error) {
            console.error('Error:', error.response.data); 
        }
    };

    return (
        <div>
            <h2>Registratie</h2>
            <input type="email" name="email" placeholder="E-mail" value={formData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Wachtwoord" value={formData.password} onChange={handleChange} />
            <input type="text" name="first_name" placeholder="Voornaam" value={formData.first_name} onChange={handleChange} />
            <input type="text" name="last_name" placeholder="Achternaam" value={formData.last_name} onChange={handleChange} />
            <input type="text" name="studentnumber" placeholder="Studentnummer" value={formData.studentnumber} onChange={handleChange} />
            <button onClick={handleRegister}>Registreren</button>
        </div>
    );
}

export default Register;
