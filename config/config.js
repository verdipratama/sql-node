/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unpublished-require */
const dotenv = require('dotenv');
const mysql = require('mysql');
const colors = require('colors');

// config env variables
const result = dotenv.config({ path: './.env' });

if (result.error) {
  /* eslint-disable-next-line */
  console.log(
    'WARNING: Configuration file cannot be loaded, using default env',
  );
}

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.connect(error => {
  if (error) {
    console.log('WARNING: Error connecting to the database!!!');
  } else {
    console.log('MySQL Connected...'.red.bold);
  }
});
