import React, {useState} from 'react';
import BaseLayout from './BaseLayout';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({email: '', password: ''});

    const handleChange = e => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleLogin = async () => {
        try {
            console.log('Logging in:', formData);
            const response = await axios.post('http://localhost:5000/login', formData);
            console.log('Response:', response.data);
            localStorage.setItem('studentnumber', response.data.studentnumber);
            console.log('Stored studentnumber:', localStorage.getItem('studentnumber')); // Log the stored studentnumber
            navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };

    return (
        <BaseLayout>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="mb-4">Inloggen</h2>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Wachtwoord</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={handleLogin}>Inloggen</button>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Login;
