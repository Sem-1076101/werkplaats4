import React, {useEffect, useState} from 'react';
import BaseLayout from './BaseLayout';
import {getModules, addModule} from '../api'
import {Link} from "react-router-dom";

function AddModule() {
    const [module, setModule] = useState({
        module_name: '',
        description: '',
        progress_indicator: '',
        domain_id: ''
    });


    const [modules, setPlatform_modules] = useState(null);

    useEffect(() => {
        getModules()
            .then(responseData => {
                setPlatform_modules(responseData);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de data:', error);
            });
    }, []);

    const handleChange = (event) => {
        setModule({
            ...module,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addModule(module)
            .then(() => {
                alert('Module succesvol toegevoegd!');
                setModule({
                    module_name: '',
                    description: '',
                    progress_indicator: '',
                    domain_id: ''
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
                    <h1>Voeg een nieuwe module toe</h1>
                    <Link to="/platform/modules" className="btn btn-secondary">Terug naar module-platform</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="course_name" className="form-label">Module naam</label>
                        <input type="text" className="form-control" id="course_name" name="course_name"
                               value={module.module_name} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Domein beschrijving</label>
                        <textarea className="form-control" id="description" name="description"
                                  value={module.description} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="progression_indicator" className="form-label">Progressie indicator</label>
                        <input type="text" className="form-control" id="progression_indicator" name="progression_indicator"
                               value={module.module_name} onChange={handleChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="domain_name" className="form-label">Domein:</label>
                        <select id="domain_name" name="domain_name" onChange={handleChange} required>
                            <option value={module.domain_id}>{module.domain_name}</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Voeg toe</button>
                </form>
            </div>
        </BaseLayout>
    );
}

export default AddModule;
