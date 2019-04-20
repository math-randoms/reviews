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
        'create table Ratings (id serial primary key, accuracy float, communication float, cleanliness float, location float, checkIn float, value float, average float)',
        (err, res) => {
          if (err) throw err;
          client.end();
        }
      );
    }
    client.query(
      'create table Reviews (id serial primary key, "user" varchar(8), date varchar(15), text varchar(450), userImage varchar(121))',
      (err, res) => {
        if (err) throw err;
        asyncTableCreate();
      }
    );
  })
  .catch(err => console.error('PG connection error', err.stack));
