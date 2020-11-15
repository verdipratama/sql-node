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

exports.start = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

export const config = {
  db: process.env.DB || 'dev',
  clientID: process.env.CLIENT_ID || 'ID',
  tokenIssuer: process.env.ISSUER || 'ftis@admin',
  primarySecret: process.env.PRIMARY_SECRET || 'PRIMARY_SECRET',
  syncSecret: process.env.SYNC_SECRET || 'SYNC_SECRET',
};
