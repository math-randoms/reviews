const pg = require('pg');
const connectionString =
  process.env.DATABASE_URL || 'postgres://localhost:5432/reviewsData';

const client = new pg.Client(connectionString);
client.connect();

const queryRatings = client.query(
  'create table Ratings (accuracy float, communication float, cleanliness float, location float, checkIn float, value float, average float)'
);

function asyncTableCreate() {
  const queryReviews = client.query(
    'create table Reviews ("user" varchar(8), date varchar(15), text varchar(450), userImage varchar(121))'
  );
  queryReviews.on('end', () => {
    client.end();
  });
}

queryRatings.on('end', () => {
  asyncTableCreate();
});
