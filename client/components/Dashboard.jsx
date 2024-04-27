import React, {useState, useEffect} from 'react';
import BaseLayout from './BaseLayout';
import api from '../api';

function Dashboard() {
    const [data, setData] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            api.get('/api/dashboard')
                .then(response => setData(response.data))
                .catch(error => console.error('Error fetching data:', error));
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return (
        <BaseLayout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12"><h1>Dashboard</h1></div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Uitleg</h2>
                        <p>Welkom op de dashboard pagina. Hier vind je een overzicht van de domeinen die je volgt en de
                            voortgang die je hebt geboekt.</p>
                    </div>
                    <div className="col-md-6">
                        <h2>Domeinen</h2>
                        <p>Je hebt nog geen domein toegevoegd. Klik <a href="#" onClick={handleOpenModal}>hier</a> om
                            een domein te volgen.</p>
                    </div>
                </div>

                {showModal && (
                    <div className="modal show" tabIndex="-1" role="dialog" style={{display: 'block'}}>
                        <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Domeinen</h5>
                                    <button type="button" className="btn-close close" onClick={handleCloseModal}>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="modal-body d-flex justify-content-center">
                                        {data ? (
                                            data.map((item, index) => (
                                                <div className="card m-2 d-flex flex-column" style={{width: '18rem'}}
                                                     key={index}>
                                                    <img src={`data:image/jpeg;base64,${item.course_image}`}
                                                         className="card-img-top" alt="..."/>
                                                    <div className="card-body d-flex flex-column">
                                                        <h5 className="card-title">{item.course_name}</h5>
                                                        <p className="card-text">{item.course_description}</p>
                                                        <a href={`domein/${item.id}`} className="btn btn-primary mt-auto">Aanmelden
                                                            bij dit domein</a>
                                                    </div>
                                                </div>))
                                        ) : (
                                            <p>Geen data beschikbaar.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </BaseLayout>
    );
}

export default Dashboard;
