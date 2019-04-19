const Sequelize = require('sequelize');
const db = new Sequelize('reviewsData', 'nmullins', '', {
  dialect: 'postgres',
  logging: false,
  define: {
    timestamp: false,
    allowNull: false
  }
});

db.authenticate()
  .then(() => console.log('Connected to PostgreSQL Database'))
  .catch(err => console.error(err));

module.exports = db;
