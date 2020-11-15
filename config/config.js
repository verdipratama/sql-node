const dotenv = require('dotenv');
const mysql = require('mysql');

// config env variables
const result = dotenv.config({
  path: String.prototype.concat(__dirname, '\\.env'),
});

if (result.error) {
  /* eslint-disable-next-line */
  console.log(
    'WARNING: Configuration file cannot be loaded, using default env',
  );
}

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'mariadb',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_DATABASE || 'restapi',
});

db.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('MySQL Connected...');
  }
});
