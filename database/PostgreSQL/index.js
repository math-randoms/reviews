const pg = require('pg');
const connectionString =
  process.env.DATABASE_URL || 'postgres://localhost:5432/reviewsData';

const client = new pg.Client(connectionString);

module.exports = client;
