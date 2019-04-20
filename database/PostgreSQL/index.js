const pg = require('pg');
const connectionString =
  process.env.DATABASE_URL || 'postgres://localhost:5432/reviewsData';

const client = new pg.Client(connectionString);
client
  .connect()
  .then(() => {
    console.log('PG connected');
    function asyncTableCreate() {
      client.query(
        'create table reviews (id serial primary key, propertyId int foreign key references properties(propertyId), "user" varchar(8), date varchar(15), text varchar(450), userImage varchar(121), accuracyRating float, communicationRating float, cleanlinessRating float, locationRating float, checkInRating float, valueRating float, averageRating float)',
        (err, res) => {
          if (err) throw err;
          client.end();
        }
      );
    }
    client.query(
      'create table properties (propertyId serial primary key)',
      (err, res) => {
        if (err) throw err;
        asyncTableCreate();
      }
    );
  })
  .catch(err => console.error('PG connection error', err.stack));
