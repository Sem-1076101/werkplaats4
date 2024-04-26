import React, {useEffect} from 'react';
import BaseLayout from './BaseLayout';

function Dashboard() {
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
                        <p>Je hebt nog geen domein toegevoegd. Klik <a href="#" data-bs-toggle="modal"
                                                                       data-bs-target="#myModal">hier</a> om een domein
                            te volgen.</p>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                            Launch demo modal
                        </button>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Dashboard;
