const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const createBookTableQuery = `
  CREATE TABLE IF NOT EXISTS book_inventory (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(50) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL
  );
`;

const createBookTable = async () => {
  try {
    await pool.query(createBookTableQuery);
    console.log('Book Table Created');
  } catch (err) {
    console.error('Error executing query, err.stack');
  }
} 

createBookTable();

module.exports = {
  query: (text, params, callback) => {
    console.log("QUERY:", text, params || "");
    return pool.query(text, params, callback);
  }
};