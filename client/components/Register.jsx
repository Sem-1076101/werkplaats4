import React, {useState} from 'react';
import BaseLayout from './BaseLayout';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        studentnumber: ''
    });

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
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
        <BaseLayout>
            <div className="container">
                <h2>Registratie</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">E-mail</label>
                    <input type="email" className="form-control" id="email" name="email" placeholder="E-mail"
                           value={formData.email} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Wachtwoord</label>
                    <input type="password" className="form-control" id="password" name="password"
                           placeholder="Wachtwoord" value={formData.password} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">Voornaam</label>
                    <input type="text" className="form-control" id="first_name" name="first_name" placeholder="Voornaam"
                           value={formData.first_name} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Achternaam</label>
                    <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Achternaam"
                           value={formData.last_name} onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="studentnumber" className="form-label">Studentnummer</label>
                    <input type="text" className="form-control" id="studentnumber" name="studentnumber"
                           placeholder="Studentnummer" value={formData.studentnumber} onChange={handleChange}/>
                </div>
                <button className="btn btn-primary" onClick={handleRegister}>Registreren</button>
            </div>
        </BaseLayout>
    );
}

export default Register;
