const { Pool } = require('pg');

const pool = new Pool({
  host: '3.95.26.38',
  port: '5432',
  user: 'postgres',
  password: 'docker',
  database: 'reviewsdata',
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000,
  max: 30
});

module.exports = pool;
