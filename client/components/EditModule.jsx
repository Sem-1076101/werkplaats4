import React, {useState, useEffect} from 'react';
import BaseLayout from './BaseLayout';
import {useParams, Link} from 'react-router-dom';
import {get_modules_by_id, editModule} from '../api';

const EditModule = () => {
    const {id} = useParams();
    const [module, setModule] = useState(null);

    useEffect(() => {
        get_modules_by_id(id)
            .then(moduleData => {
                setModule(moduleData);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [id]);

    const handleChange = (event) => {
        setModule({
            ...module,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        editModule(id, module)
            .then(updatedModule => {
                setModule({
                    module_name: updatedModule.module_name || '',
                    description: updatedModule.description || '',
                    progress_indicator: updatedModule.progress_indicator || ''
                });
                alert('Module succesvol bijgewerkt!');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    if (!module) {
        return <p>Gegevens aan het laden</p>;
    }

    return (
        <BaseLayout>
            <div className="container">
                <div className="row">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>Wijzig module</h1>
                        <Link to="/platform/modules" className="btn btn-secondary">Terug naar Platform-Modules</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Module naam:</label>
                                <input type="text" name="module_name" value={module.module_name} onChange={handleChange}
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Beschrijving:</label>
                                <input type="text" name="description" value={module.description} onChange={handleChange}
                                       className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Voortgang indicator: (in %)</label>
                                <input type="text" name="progress_indicator" value={module.progress_indicator}
                                       onChange={handleChange} className="form-control"/>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Opslaan</button>
                        </form>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default EditModule;