const { Pool } = require('pg');

const pool = new Pool({
  host: '54.174.3.67',
  port: '5432',
  user: 'postgres',
  password: 'docker',
  database: 'reviewsdata'
});

module.exports = pool;
