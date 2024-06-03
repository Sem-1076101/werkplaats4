import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function Index() {
    return (
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.row}>
                    <View style={styles.col}>
                        <Text style={styles.header}>Welkom bij GLITCH!</Text>

                        <Text style={styles.paragraph}>
                            GLITCH staat voor Gamified Learning Interface Through Challenges and Heuristics, een
                            innovatief en thema-onafhankelijk leerplatform! Met dit platform kun je op een interactieve
                            en dynamische manier leren en jezelf blijven ontwikkelen. Op onze homepagina vind je alles
                            wat je nodig hebt om je leerervaring te verbeteren.
                        </Text>

                        <Text style={styles.subHeader}>Wat kan je met GLITCH doen?</Text>
                        <Text style={styles.paragraph}>
                            Met GLITCH kun je een breed scala aan vakken en cursussen ontdekken, die georganiseerd zijn
                            binnen specifieke domeinen. Of het nu gaat om wiskunde, taal of rekenen, GLITCH biedt het
                            allemaal. Je kunt hier ook uitdagende opdrachten en taken vinden om je kennis te testen en
                            punten verdienen terwijl je vooruitgang boekt. Daarnaast kun je ook communiceren met je
                            medeleerlingen en kennis delen. Stel dat je ergens niet uitkomt, dan staan je medeleerlingen
                            voor je klaar om je te helpen. Zo leer je namelijk ook van elkaar. Door samen te werken aan
                            een betere leerervaring, bouwen we aan een gemeenschap waarin kennis wordt gedeeld en
                            iedereen kan groeien.
                        </Text>

                        <Text style={styles.subHeader}>Hoe kan je GLITCH gebruiken?</Text>
                        <Text style={styles.paragraph}>
                            Om gebruik te maken van GLITCH, dien je eerst een account aan te maken. Daarna kun je door de
                            cursussen bladeren en een onderwerp kiezen dat jou interesseert. Begin vervolgens met leren
                            en ontdek spelenderwijs een nieuwe manier van kennis opdoen!
                        </Text>
                        <Text style={styles.paragraph}>
                            Dus waar wacht je nog op? Meld je vandaag nog aan en ontdek een leerervaring die bij jou past
                            op GLITCH!
                        </Text>
                    </View>
                </View>
            </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
    },
    col: {
        flex: 1,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 12,
    },
});

export default Index;
