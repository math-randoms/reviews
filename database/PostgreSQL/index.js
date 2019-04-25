const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: '5432',
  user: 'nmullins',
  database: 'reviewsData',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
  max: 30
});

module.exports = pool;
