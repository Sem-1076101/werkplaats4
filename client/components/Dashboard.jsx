import React from 'react';
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
                        <p>Je hebt nog geen cursussen gevolgd. Klik <a href="">hier</a> om een domein te volgen.</p>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Dashboard;
