FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx expo install --fix

COPY . .

CMD ["npx", "expo", "start", "--web"]
CMD ["npx", "expo", "start", "--android"]
