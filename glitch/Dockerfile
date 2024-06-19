FROM node:alpine

# Zet de omgeving naar ontwikkeling
ENV NODE_ENV=development

# Werkmap instellen
WORKDIR /app

# Kopieer de package.json en package-lock.json
COPY ./package*.json /app/

# Installeer de afhankelijkheden
RUN npm install

# Kopieer de rest van de applicatie
COPY . .

# Start de Expo ontwikkelserver
CMD ["npx", "expo", "start", "--tunnel"]
