import React, {useState, useEffect} from 'react';
import BaseLayout from './BaseLayout';
import {getModules, deleteModule} from '../api'
import {Link} from "react-router-dom";
import platform from "./Platform";

function Platform_modules() {
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

    function handleDeleteModule(moduleId) {
        deleteModule(moduleId)
            .then(() => {
                getModules()
                    .then(responseData => {
                        setPlatform_modules(responseData);
                    })
                    .catch(error => {
                        console.error('Er was een fout bij het ophalen van de data:', error);
                    });
            });
    }


    return (
        <BaseLayout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Modules platform</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2>Uitleg</h2>
                        <p>Welkom op de modules platform pagina, hier kan je nieuwe modules toevoegen die studenten
                            kunnen
                            volgen.</p>
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1>Wijzig Module</h1>
                            <Link to="/aanmaken/module/" className="btn btn-secondary">Module toevoegen</Link>
                        </div>
                        {modules ? (
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Naam</th>
                                    <th>Beschrijving</th>
                                    <th>Progressie indicator</th>
                                    <th>domain_id</th>
                                    <th>Wijzigen</th>
                                    <th>Verwijderen</th>
                                </tr>
                                </thead>
                                <tbody>
                                {modules.map(platform_module => (
                                    <tr key={platform_module.id}>
                                        <td>{platform_module.module_name}</td>
                                        <td>{platform_module.description}</td>
                                        <td>{platform_module.progress_indicator}%</td>
                                        <td>{platform_module.domain_id}</td>
                                        <td>
                                            <Link to={`/wijzig/module/${platform_module.id}`}
                                                  className="btn btn-primary">Wijzigen</Link>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteModule(platform_module.id)}
                                                    className="btn btn-danger">Verwijderen
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Geen modules gevonden</p>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Platform_modules;