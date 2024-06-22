# Glitch

In deze applicatie kunnen leerlingen en docenten hun opdrachten bekijken die ze moeten maken, als eerste moeten ze zich aanmelden bij hun opleiding en daarna kunnen ze hun vakken bekijken met hun levels en opdrachten.

# Applicatie clonen

Clone de applicatie naar je computer met het volgende commando als je een SSH key hebt in je GitHub: ```git clone git@github.com:Rac-Software-Development/wp4-2024-react-1e3.git```

Clone de applicatie naar je computer met het volgende commando als je geen SSH key hebt in je GitHub: ```git clone https://github.com/Rac-Software-Development/wp4-2024-react-1e3.git```

# Android Studio

Zorg ervoor dat je Android Studio hebt geïnstalleerd op je computer. Als je dit nog niet hebt gedownload kan je dit doen via de volgende link: https://developer.android.com/studio.

Open Android Studio en klik rechtsboven op de 3 verticale puntjes en klik op "Virtual Device Manager".

Klik op "Create Virtual Device".

Kies een device en klik op "Next".

Kies een system image en klik op "Next".

Klik op "Finish".

Start de emulator door op de groene play button te klikken.

# Applicatie starten op web

Navigeer naar de main folder in het project met het volgende commando: ```cd .\wp4-2024-react-1e3\```

Navigeer naar de server folder in het project met het volgende commando: ```cd .\server\```

Run het docker build commando met het volgende commando: ```docker build -t wp4-2024-react-1e3-server .```

Run het docker run commando met het volgende commando: ```docker run -p 5000:5000 wp4-2024-react-1e3-server```

Navigeer naar de main folder in het project met het volgende commando: ```cd ..\```

Navigeer naar de glitch folder in het project met het volgende commando: ```cd .\glitch\```

Run het docker build commando met het volgende commando: ```docker build -t wp4-2024-react-1e3-glitch .```

Run het docker run commando met het volgende commando: ```docker run -p 8081:8081 wp4-2024-react-1e3-glitch```

De applicatie wordt nu gestart op web.

# Applicatie starten op Android

Wij hebben enorm ons best gedaan om de applicatie werkend te krijgen via docker op de Android emulator, helaas is dit niet gelukt. We hebben hier veel tijd in gestoken en het is ons niet gelukt om dit werkend te krijgen. We hebben hier veel hulp bij gekregen van de docenten en medestudenten, helaas is het ons niet gelukt om dit werkend te krijgen.

Daarom vragen we of jullie het via de volgende manier willen proberen om wel te kunnen zien dat wij veel werk en moeite in de mobiele applicatie hebben gestoken. Bij ons werkt het namelijk wel via de Android Emulator en via de Expo Go app op de mobiel. We hadden ook liever gehad dat alles gewoon soepel zou verlopen via Docker, maar helaas is dit niet gelukt.

Navigeer naar de main folder in het project met het volgende commando: ```cd .\wp4-2024-react-1e3\```

Navigeer naar de server folder in het project met het volgende commando: ```cd .\server\```

Maak een virtuele omgeving aan met het volgende commando: ```python -m venv venv```

Activeer de virtuele omgeving met het volgende commando: ```venv\Scripts\activate```

Installeer de benodigde packages met het volgende commando: ```pip install -r requirements.txt```

Klik in de app.py op de groene play button om de server te starten, onderaan het bestand. Kijk in de terminal of de server is gestart en op welk IP adres en poort.

Verander in de config.js het IP adres naar het IP adres van de server.

Navigeer naar de main folder in het project met het volgende commando: ```cd ..\```

Navigeer naar de glitch folder in het project met het volgende commando: ```cd .\glitch\```

Installeer de benodigde packages met het volgende commando: ```npm install```

Start de applicatie met het volgende commando: ```npx expo start```

Scan de QR code met de Expo Go app op je mobiel of druk op A voor de Android Emulator. Zorg dat je de Android emulator hebt gestart.

# Applicatie gebruiken

Open de applicatie op web of android en meld je aan met de volgende gegevens als je wilt inloggen als student:

- Gebruikersnaam: ```1065913@hr.nl```
- Wachtwoord: ```test```

Je kan nu de vakken bekijken en de opdrachten maken.

Je bent al aangemeld bij de opleiding Applied Data Science & Artificial Intelligence.

Als je je wilt aanmelden voor de opleiding moet je even een account aanmaken en je aanmelden bij een opleiding.


# Werkende/niet volledig werkende functies

- Sommige pagina's voor het toevoegen van dingen werken wel maar zijn niet goed gelinkt. Dit is inderdaad niet helemaal goed gegaan.
Daarom hieronder de links zodat u wel kunt kijken dat het geprobeerd is. 

- /add-level
Dit werkte wel, was gefixt. In het mergen is het er weer uitgevlogen door een insert error.

- /add-domain
werkt als je iets aanmaakt wat niet bestaat, als je het test. Vul dan bijvoorbeeld in: "dit is een goede tes" en "dit moet werken" en dan werkt het (als het goed is).
Jammer genoeg werkte dit ook en door mergen is het weer er helemaal verkeerd gegaan en heb ik het opnieuw gefixt.

- /add-module
werkte ook eerst maar weer eruit gevlogen door merge, erg vervelend.
bijna gefixtt maar nu een json error waar we niet uitkomen.

Het is erg jammer dat dit niet allemaal naar behoren werkt. We hebben erg veel dingen gefixt, vervolgens bij mergen zijn
hele stukken code niet overgenoen, terwijl we met github desktop HANDMATIG alles gemerged hebben.

# Functionaliteiten

- Aanmelden bij een opleiding
- Vakken bekijken
- Levels bekijken
- Levels voltooien
- Opleidingen bekijken
- Opleidingen aanmaken
- Opleidingen aanpassen
- Vakken aanmaken
- Vakken aanpassen

# Technologieën

- React Native
- Flask
- Docker
- Sqlite

# Team

- Als Team
  - We hebben als team veel samengewerkt en elkaar geholpen met de taken die we moesten doen. We hebben veel overlegd en hoe we de taken het beste konden aanpakken.
  - Daarnaast hadden we de fout gemaakt om te beginnen met React i.p.v. React-Native. Waardoor het overzetten veel gedoe was, vooral omdat alle functionaliteiten werkte op de React manier. 
    Helaas hebben we het niet voor elkaar gekregen om alles werkend te krijgen, wel hebben we hier erg veel moeite voor gedaan. 


- Bryan de Knikker
  - Bryan heeft veel functionaliteiten van de applicatie gemaakt, hij heeft de opzet aangemaakt van de applicatie en een groot deel van de backend gemaakt onder andere de database en database functies. Bryan heeft ook de applicatie opgezet in Docker en de applicatie omgezet van React naar React Native. Bryan heeft ook de andere teamleden geholpen met hun problemen en geprobeerd dit te helpen oplossen, in sommige gevallen is dit gelukt en bij sommige punten moest dit geëscaleerd worden naar een docent.
  Bryan heeft veel database functies geschreven en de app.py opgezet. Uitzoek werk verricht over hoe we het makkelijkst Expo Go op konden zetten en het ook op je mobiel werkte om te kunnen testen. Hier heeft soms veel tijd in gezeten om alles goed uit te werken. Bryan heeft meerdere keren het project uitgelegd bij grote wijzingen zodat de groep op de hoogte was en hoe zij dingen het best konden aanpakken. Ook was hij de motivator in de groep en de persoon die veel taken op zich nam en zorgde dat er wat gebeurde als de groep soms het project zat was.

  - Bronnen
  - https://expo.dev/go
  - https://reactnavigation.org/docs/stack-navigator/
  - https://reactnavigation.org/docs/web-support/
  - https://medium.com/@shawnastaff/react-native-tutorial-1-2405d0c53143
  
- Sem Jansen
    - Sem heeft gewerkt aan de modules en de ERD van de applicatie. Daarnaast heeft Sem veel gedaan aan het omzetten van React naar React native. 
  Sem: Ik heb ervoor gezorgd dat de modules pagina, level-overzicht pagina en levelsubmitpagina, voor studenten. Daarnaast heb ik het platform (domein overzicht voor docenten)  pagina omgezet en deels werkend gemaakt. De wijziging link komt wel op de pagina maar daar stoei ik met parameter errors. Bij dit stuk heb ik zelfs chatgpt gebruikt omdat ik er niet uitkwam, maar nogsteeds werkt het niet.
  Daarnaast kampte ik met veel problemen bij het mergen van branches. Elke keer als ik een merge deed miste er hele grote stukken waardoor ik weer opnieuw het erin kon zetten. Vandaar ook sommige commits voor 5 keer etc.
  Wat ook erg jammer is, is dat veel dingen werkte maar na het overzetten niet meer. Ook zijn de functies die er nu in zitten bijna allemaal werkend, alleen door de verwarrende  userparams werken ze niet.
  Ook heb ik levelsdetail pagina aangemaakt en platform levels. Ik heb ook veel in de app.py aangemaakt en in de api.js. Dit heb ik ook vaak bij sommige functies opnieuw moeten doen na een merge omdat github desktop soms dingen gewoon niet meeneemt wat erg jammer is.
  Hopelijk is het te zien hoeveel moeite in dit project is gestoken.
  
  - Bronnen:
  - Stackoverflow.com
  - https://reactnative.dev/
  - Veel werk heb ik van Bryan kunnen zien hoe het moest, hij  had mij dit ook uitgelegd waardoor ik er makkelijk doorheen kon.
  - https://expo.dev/go
  - https://reactnavigation.org/docs/stack-navigator/
  - https://reactnavigation.org/docs/web-support/
  - https://medium.com/@shawnastaff/react-native-tutorial-1-2405d0c53143
  
- Hamza Afarran
    - Hamza heeft de inlog en registratie gemaakt van de applicatie en is bezig geweest met de modules.
- Hamze Haji
  - Heeft de homepagina gemaakt.



