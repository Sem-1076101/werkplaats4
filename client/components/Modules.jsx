import React, {useState, useEffect} from "react";
import BaseLayout from "./BaseLayout";
import connection from "../api";
import {get_modules} from "../api";
import {useParams} from "react-router-dom";

// In je component

function Modules() {
    const {domain_id} = useParams();
    const [modules, setModules] = useState(null);

    useEffect(() => {
        const fetchDataInterval = setInterval(() => {
            connection.get('/api/modules/' + domain_id)
                .then(response => {
                    if (response && response.data) {
                        setModules(response.data);
                        console.log(response.data);
                    } else {
                        console.error('Unexpected response:', response);
                    }
                })
                .catch(error => console.error('Error fetching data:', error.response.data));
        }, 1000);

        return () => {
            clearInterval(fetchDataInterval);
        };
    }, [domain_id]);


    return (
        <BaseLayout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Beschikbare modules</h1>
                        <div>
                            {modules ? (
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Module naam</th>
                                        <th>Beschrijving</th>
                                        <th>Progressie indicator</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {modules.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item[1]}</td>
                                            <td>{item[2]}</td>
                                            <td>{item[3]}%</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="mt-5">
                                    <p>Modules zijn aan het laden.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Modules;
