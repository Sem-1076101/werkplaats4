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

# Applicatie starten

Navigeer naar de main folder in het project met het volgende commando: ```cd .\wp4-2024-react-1e3\```

Navigeer naar de server folder in het project met het volgende commando: ```cd .\server\```

Run het docker build commando met het volgende commando: ```docker build -t wp4-2024-react-1e3-server .```

Run het docker run commando met het volgende commando: ```docker run -p 5000:5000 wp4-2024-react-1e3-server```

Kijk op welke IP adres de server draait met het volgende commando: ```docker-machine ip```

Vul dit IP adres in bij het volgende bestand: ```wp4-2024-react-1e3\glitch\config.js```

Navigeer naar de main folder in het project met het volgende commando: ```cd ..\```

Navigeer naar de glitch folder in het project met het volgende commando: ```cd .\glitch\```

Run het docker build commando met het volgende commando: ```docker build -t wp4-2024-react-1e3-glitch .```

Run het docker run commando met het volgende commando: ```docker run -p 3000:3000 wp4-2024-react-1e3-glitch```

De applicatie wordt nu gestart op web en android.

# Applicatie gebruiken

Open de applicatie op web of android en meld je aan met de volgende gegevens als je wilt inloggen als student:

- Gebruikersnaam: ```1065913@hr.nl```
- Wachtwoord: ```test```

Je kan nu de vakken bekijken en de opdrachten maken.

Je bent al aangemeld bij de opleiding Applied Data Science & Artificial Intelligence.

Als je je wilt aanmelden voor de opleiding moet je even een account aanmaken en je aanmelden bij een opleiding.

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

- Bryan de Knikker
  - Bryan heeft veel functionaliteiten van de applicatie gemaakt, hij heeft de opzet aangemaakt van de applicatie en de veel van de backend gemaakt onder andere de database en database functies. Bryan heeft ook de applicatie opgezet in Docker en de applicatie omgezet van React naar React Native.
- Sem Jansen
    - Sem heeft gewerkt aan de modules en de ERD van de applicatie. Sem heeft ook geholpen bij andere taken van de applicatie.
- Hamza Afarran
    - Hamza heeft de inlog en registratie gemaakt van de applicatie en is bezig geweest met de modules.
- Hamze Haji
  - Heeft de homepagina gemaakt.



