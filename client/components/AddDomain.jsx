import React, {useState} from 'react';
import BaseLayout from './BaseLayout';
import {addDomain} from '../api'
import {Link} from "react-router-dom";

function AddDomain() {
    const [domain, setDomain] = useState({
        course_name: '',
        course_description: '',
        course_image: ''
    });

    const handleChange = (event) => {
        setDomain({
            ...domain,
            [event.target.name]: event.target.value
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.replace('data:image/jpeg;base64,', '');
            setDomain({
                ...domain,
                course_image: base64String
            });
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addDomain(domain)
            .then(() => {
                alert('Domein succesvol toegevoegd!');
                setDomain({
                    course_name: '',
                    course_description: '',
                    course_image: ''
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <BaseLayout>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <h1>Voeg een nieuw domein toe</h1>
                    <Link to="/platform" className="btn btn-secondary">Terug naar Platform</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="course_name" className="form-label">Domein naam</label>
                        <input type="text" className="form-control" id="course_name" name="course_name"
                               value={domain.course_name} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="course_description" className="form-label">Domein beschrijving</label>
                        <textarea className="form-control" id="course_description" name="course_description"
                                  value={domain.course_description} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="course_image" className="form-label">Domein afbeelding</label>
                        <input type="file" className="form-control" id="course_image" name="course_image" accept="image/png, image/jpeg"
                               onChange={handleImageChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Voeg toe</button>
                </form>
            </div>
        </BaseLayout>
    );
}

export default AddDomain;
