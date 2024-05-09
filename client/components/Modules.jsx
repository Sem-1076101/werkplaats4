import React, {useState, useEffect} from "react";
import BaseLayout from "./BaseLayout";
import {get_modules} from "../api";
import { useParams } from "react-router-dom";

// In je component

function Modules() {
    const { id } = useParams();
    const [modules, setModules] = useState(null);

    const [showMedal, setShowModal] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
    }


    useEffect(() => {
        getModulesData();
    }, []);

    const getModulesData = () => {
        const url =`http://localhost:19006/api/modules/${id}`;
        console.log('Fetching data from:', url);

        get_modules(id)
            .then(modules => {
                console.log(modules)
                setModules(modules);
            })
            .catch(error => {
                console.error("Error fetching modules:", error);
                console.error("ERror details:", error.response.data);
            });
    };


    return (
        <BaseLayout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Beschikbare modules</h1>
                        <div>
                            {modules ? (
                                modules.map((module, index) => (
                                    <div key={index}>
                                        <h2>{module.module_name}</h2>
                                        <p>{module.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="mt-5">
                                    <h2>Modules nog niet beschikbaar bij dit domein.</h2>
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
