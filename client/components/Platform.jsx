import React, {useState, useEffect} from 'react';
import BaseLayout from './BaseLayout';
import {domains, deleteDomain} from '../api'
import {Link} from "react-router-dom";

function Platform() {
    const [data, setData] = useState(null);

    useEffect(() => {
        domains()
            .then(responseData => {
                setData(responseData);
            })
            .catch(error => {
                console.error('Er was een fout bij het ophalen van de data:', error);
            });
    }, []);

    function handleDeleteDomain(courseId) {
        deleteDomain(courseId)
            .then(() => {
                domains()
                    .then(responseData => {
                        setData(responseData);
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
                    <div className="col-md-12"><h1>Platform</h1></div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2>Uitleg</h2>
                        <p>Welkom op het platform pagina, hier kan je nieuwe domeinen toevoegen die studenten kunnen
                            volgen.</p>
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h1>Wijzig Domein</h1>
                            <Link to="/aanmaken/domein/" className="btn btn-secondary">Domein toevoegen</Link>
                        </div>
                        {data ? (
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Afbeelding</th>
                                    <th>Naam</th>
                                    <th>Beschrijving</th>
                                    <th>Wijzigen</th>
                                    <th>Verwijderen</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td><img src={`data:image/jpeg;base64,${item.course_image}`} width="90" height="90"/></td>
                                        <td>{item.course_name}</td>
                                        <td>{item.course_description}</td>
                                        <td><a href={`wijzig/domein/${item.course_id}`} className="btn btn-primary">Wijzig dit
                                            domein</a></td>
                                        <td><a href={`verwijder/domein/${item.course_id}`} onClick={(event) => {
                                            event.preventDefault();
                                            handleDeleteDomain(item.course_id);
                                        }} className="btn btn-danger">Verwijder dit domein</a></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Gegevens aan het laden</p>
                        )}
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Platform;
