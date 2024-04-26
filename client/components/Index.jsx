import React from 'react';
import BaseLayout from './BaseLayout';

function Index() {
    return (
        <BaseLayout>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Welkom bij GLITCH!</h1>

                        <p>GLITCH staat voor Gamified Learning Interface Through Challenges and Heuristics, een
                            innovatief en thema-onafhankelijk leerplatform! Met dit platform kun je op een interactieve
                            en dynamische manier leren en jezelf blijven ontwikkelen. Op onze homepagina vind je alles
                            wat je nodig hebt om je leerervaring te verbeteren.</p>

                        <h5>Wat kan je met GLITCH doen?</h5>
                        <p>Met GLITCH kun je een breed scala aan vakken en cursussen ontdekken, die georganiseerd zijn
                            binnen specifieke domeinen. Of het nu gaat om wiskunde, taal of rekenen, GLITCH biedt het
                            allemaal. Je kunt hier ook uitdagende opdrachten en taken vinden om je kennis te testen en
                            punten verdienen terwijl je vooruitgang boekt. Daarnaast kun je ook communiceren met je
                            medeleerlingen en kennis delen. Stel dat je ergens niet uitkomt, dan staan je medeleerlingen
                            voor je klaar om je te helpen. Zo leer je namelijk ook van elkaar. Door samen te werken aan
                            een betere leerervaring, bouwen we aan een gemeenschap waarin kennis wordt gedeeld en
                            iedereen kan groeien.</p>

                        <h5>Hoe kan je GLITCH gebruiken?</h5>
                        <p>Om gebruik te maken van GLITCH, dien je eerst een account aan te maken. Daarna kun je door de
                            cursussen bladeren en een onderwerp kiezen dat jou interesseert. Begin vervolgens met leren
                            en ontdek spelenderwijs een nieuwe manier van kennis opdoen!</p>
                        <p>Dus waar wacht je nog op? Meld je vandaag nog aan en ontdek een leerervaring die bij jou past
                            op GLITCH!</p>
                    </div>
                </div>
            </div>
        </BaseLayout>
    );
}

export default Index;
