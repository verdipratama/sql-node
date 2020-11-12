# Simple API with NodeJS, MariaDB and Docker

This project is from the [Build a Simple API with AdonisJS course].

## Getting Started

```bash
# clone to current directory
git clone https://github.com/inewgen/nodejs.git .

# install dependencies
npm install
```

Copy .env.example and rename to .env

Edit the .env file to match your database settings.

```bash
# run your migrations
adonis migration:run

# Start the dev server
adonis serve --dev

# Please try
http://localhost:3333 or http://127.0.0.1:3333
```

## Run with docker

```bash
# run on project directory
docker-compose up -d

# or run only mariadb and api
docker-compose up -d mariadb api
```

## Questions?

Please reach out to me on [Website](http://www.inewgen.com).
