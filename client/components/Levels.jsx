import React, {useState, useEffect} from "react";
import BaseLayout from "./BaseLayout";
import connection from "../api";
import {get_modules} from "../api";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";

// In je component

function Levels() {
    const {module_id} = useParams();
    const [levels, setModules] = useState(null);

    useEffect(() => {
        const fetchDataInterval = setInterval(() => {
            connection.get('/api/levels/' + module_id)
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
    }, [module_id]);


    return (
        <BaseLayout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Beschikbare modules</h1>
                        <div>
                            {levels ? (
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Module naam</th>
                                        <th>Beschrijving</th>
                                        <th>Progressie indicator</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {levels.map((item, index) => (
                                        <tr key={index}>
                                            {/*<td>{item.module_name}</td>*/}
                                            {/*<td>{item.description}</td>*/}
                                            {/*<td>{item.progress_indicator}%</td>*/}
                                            {/*<td>*/}
                                            {/*    <Link to={`/levels/${item.id}`}>Bekijk levels</Link>*/}
                                            {/*</td>*/}
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

export default Levels;
