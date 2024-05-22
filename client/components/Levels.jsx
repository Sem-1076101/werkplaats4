import React, {useState, useEffect} from "react";
import BaseLayout from "./BaseLayout";
import connection from "../api";
import {get_level} from "../api";
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
                        <h1>Level: </h1>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Levels;
