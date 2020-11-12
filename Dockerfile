FROM node:12-slim

LABEL authors="Verdi Pratama <verdipratama@yahoo.com>"

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .
COPY .env.example.docker ./.env

EXPOSE 5000

CMD ["node", "server.js"]