import React, {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {getDomain, editDomain} from '../api';
import BaseLayout from './BaseLayout';

const EditDomain = () => {
    const {id} = useParams();
    const [domain, setDomain] = useState(null);

    useEffect(() => {
        getDomain(id)
            .then(domainData => {
                setDomain(domainData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [id]);

    const handleChange = (event) => {
        setDomain({
            ...domain,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        editDomain(id, domain)
            .then(updatedDomain => {
                setDomain({
                    course_name: updatedDomain.course_name || '',
                    course_description: updatedDomain.course_description || ''
                });
                alert('Domein succesvol bijgewerkt!');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (!domain) {
        return <p>Gegevens aan het laden</p>;
    }

    return (
        <BaseLayout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>Wijzig Domein</h1>
                        <Link to="/platform" className="btn btn-secondary">Terug naar Platform</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                            <label>Domeinnaam:</label>
                                <input type="text" name="course_name" value={domain.course_name}
                                       onChange={handleChange} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Beschrijving:</label>
                                <textarea name="course_description" value={domain.course_description}
                                          onChange={handleChange} className="form-control"></textarea>
                            </div>
                            <input type="submit" value="Wijzig domein" className="btn btn-primary mt-3"/>
                        </form>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default EditDomain;
