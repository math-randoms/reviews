const fs = require('fs');

const reviews = fs.createWriteStream('./reviews.csv');

const place = ['place', 'home', 'house', 'apartment', 'location', 'property'];
const area = [
  'entrance',
  'doorway',
  'bedroom',
  'bathroom',
  'study',
  'living room',
  'basement',
  'attic',
  'closet',
  'library',
  'porch',
  'yard',
  'roof',
  'kitchen',
  'dining room',
  'garage',
  'backdoor',
  'sidedoor'
];
const verbs = ['loved', 'enjoyed'];
const adjectives = [
  'amazing',
  'remarkable',
  'the best',
  'spectacular',
  'outstanding',
  'lovely',
  'great',
  'incomparable',
  'pleasant',
  'wonderful',
  'incredible',
  'marvelous',
  'perfect'
];
const users = [
  'Rachael',
  'Susan',
  'Britney',
  'Whitney',
  'Jessica',
  'Thinh',
  'Katie',
  'Tiffany',
  'David',
  'Marie',
  'Sahar',
  'Angela',
  'Joe',
  'Derrin',
  'Michael',
  'Alanna',
  'Brian',
  'Gina',
  'Faris',
  'Patricia',
  'Ladonna',
  'Brett',
  'Nicole',
  'Ben',
  'Abby',
  'Nessrin',
  'Sheree'
];
const endingBlurb = [
  'Would recommend!',
  'Very disappointed.',
  'We loved our stay!',
  'Charming!',
  "I'll be back!",
  'Thoroughly enjoyed every bit!',
  'We cannot wait to go back!'
];
const imageURls = [
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(1).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(10).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(11).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(12).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(13).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(2).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(3).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(4).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(5).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(6).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(7).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(8).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack(9).png',
  'https://s3-us-west-1.amazonaws.com/sharebnbprofiles/Screenshot_2019-04-09+hrla28+Hack+Reactor+LA+-+Students+Slack.png'
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
const years = [
  '2008',
  '2009',
  '2010',
  '2011',
  '2012',
  '2013',
  '2014',
  '2015',
  '2016',
  '2017',
  '2018'
];

/*
~280 count
Good blend: 1/3 3-word reviews
            1/3 longer, under 270-280 character reviews
            1/3 over 270-280 character reviews
            ...or not. 70% long, 30% short?
*/

function generateBody() {
  let chance = Math.random();
  if (chance > 0.7) {
    return `This ${
      place[Math.floor(Math.random() * place.length)]
    } is absolutely ${
      adjectives[Math.floor(Math.random() * adjectives.length)]
    }! \
You know it's a ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${
      place[Math.floor(Math.random() * place.length)]
    } \
when you don't want to do anything but be in the ${
      place[Math.floor(Math.random() * place.length)]
    } or go anywhere else. \
This was the absolute ${
      adjectives[Math.floor(Math.random() * adjectives.length)]
    } ${place[Math.floor(Math.random() * place.length)]} \
for what we were wanting. Obviously the view is enough to stand on its own but we also ${
      verbs[Math.floor(Math.random() * verbs.length)]
    } \
the little things like the ${area[Math.floor(Math.random() * area.length)]} \
and just the overall feel of the ${
      place[Math.floor(Math.random() * place.length)]
    }. ${endingBlurb[Math.floor(Math.random() * endingBlurb.length)]}`;
  } else {
    return `This ${place[Math.floor(Math.random() * place.length)]} is ${
      adjectives[Math.floor(Math.random() * adjectives.length)]
    }! \
${endingBlurb[Math.floor(Math.random() * endingBlurb.length)]}`;
  }
}

// Example Output

// `This place is absolutely amazing. You know it's a good place when you don't want to do anything but be in the place or go anywhere else.
// This was the absolute perfect place for what we were wanting for our honeymoon.
// We were able to decompress with the fresh air and view and the sound of birds every morning.
// Obviously the view is enough to stand on its own, but we also loved the little things like picking of fresh fruit from the trees
// and just the overall feel of the property. We cannot wait to go back!`

(async () => {
  for (let i = 0; i < 100000000; i++) {
    let reviewObj = {
      id: i + 1,
      propertyId: Math.floor(Math.random() * 10000000 + 1),
      user: users[Math.floor(Math.random() * users.length)],
      date: `${months[Math.floor(Math.random() * months.length)]} ${
        years[Math.floor(Math.random() * years.length)]
      }`,
      text: generateBody(),
      userImage: `${imageURls[Math.floor(Math.random() * imageURls.length)]}`,
      accuracyRating: Math.random() * 6,
      communicationRating: Math.random() * 6,
      cleanlinessRating: Math.random() * 6,
      locationRating: Math.random() * 6,
      checkInRating: Math.random() * 6,
      valueRating: Math.random() * 6
    };

    for (let key in reviewObj) {
      if (key.includes('Rating')) {
        let val = reviewObj[key];
        let valRound = Math.floor(val);
        let check = val - valRound;
        if (check >= 0.5 && val < 5) {
          reviewObj[key] = valRound + 0.5;
        } else {
          reviewObj[key] = valRound;
        }
      }
    }
    let average =
      (reviewObj.accuracyRating +
        reviewObj.communicationRating +
        reviewObj.cleanlinessRating +
        reviewObj.locationRating +
        reviewObj.checkInRating +
        reviewObj.valueRating) /
      6;
    let averageRound = Math.floor(average);
    let check = average - averageRound;
    if (check >= 0.5 && average < 5) {
      reviewObj.averageRating = averageRound + 0.5;
    } else {
      reviewObj.averageRating = averageRound;
    }

    let writeValue = Object.values(reviewObj).join(',');

    if (i % 1000000 === 0) console.log(i);

    if (i === 0) {
      reviews.write(
        'id, propertyId, user, date, text, userImage, accuracyRating, communicationRating, cleanlinessRating, locationRating, checkInRating, valueRating, averageRating\n'
      );
      reviews.write(writeValue + '\n');
    } else if (i === 9999999) {
      if (!reviews.write(writeValue)) {
        await new Promise(resolve => reviews.once('drain', resolve));
      }
    } else {
      if (!reviews.write(writeValue + '\n')) {
        await new Promise(resolve => reviews.once('drain', resolve));
      }
    }
  }
})();
