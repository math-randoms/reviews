const fs = require('fs');

// const ratings = fs.createWriteStream('./ratings.csv');
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

// const template1 = `This ${place[Math.floor(Math.random() * place.length)]} is absolutely ${adjectives[Math.floor(Math.random() * adjectives.length)]}! \
// You know it's a ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${place[Math.floor(Math.random() * place.length)]} \
// when you don't want to do anything but be in the ${place[Math.floor(Math.random() * place.length)]} or go anywhere else. \
// This was the absolute ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${place[Math.floor(Math.random() * place.length)]} \
// for what we were wanting. Obviously the view is enough to stand on its own, but we also ${verbs[Math.floor(Math.random() * verbs.length)]} \
// the little things like the ${area[Math.floor(Math.random() * area.length)]} \
// and just the overall feel of the ${place[Math.floor(Math.random() * place.length)]}. ${endingBlurb[Math.floor(Math.random() * endingBlurb.length)]}`;
// console.log(template1)

// const template2 = `This ${place[Math.floor(Math.random() * place.length)]} is ${adjectives[Math.floor(Math.random() * adjectives.length)]}! \
// ${endingBlurb[Math.floor(Math.random() * endingBlurb.length)]}`;
// console.log(template2)

// `This place is absolutely amazing. You know it's a good place when you don't want to do anything but be in the place or go anywhere else.
// This was the absolute perfect place for what we were wanting for our honeymoon.
// We were able to decompress with the fresh air and view and the sound of birds every morning.
// Obviously the view is enough to stand on its own, but we also loved the little things like picking of fresh fruit from the trees
// and just the overall feel of the property. We cannot wait to go back!`

// for (let i = 0; i < 100000; i++) {
//   let ratingObj = {
//     id: i + 1,
//     accuracy: Math.random() * 6,
//     communication: Math.random() * 6,
//     cleanliness: Math.random() * 6,
//     location: Math.random() * 6,
//     checkIn: Math.random() * 6,
//     value: Math.random() * 6
//   };
//   for (let key in ratingObj) {
//     let val = ratingObj[key];
//     let valRound = Math.floor(val);
//     let check = val - valRound;
//     if (check >= 0.5 && val < 5) {
//       ratingObj[key] = valRound + 0.5;
//     } else {
//       ratingObj[key] = valRound;
//     }
//   }
//   let average =
//     (ratingObj.accuracy +
//       ratingObj.communication +
//       ratingObj.cleanliness +
//       ratingObj.location +
//       ratingObj.checkIn +
//       ratingObj.value) /
//     6;
//   let averageRound = Math.floor(average);
//   let check = average - averageRound;
//   if (check >= 0.5 && average < 5) {
//     ratingObj.average = averageRound + 0.5;
//   } else {
//     ratingObj.average = averageRound;
//   }

//   let writeValue = Object.values(ratingObj).join(',');

//   if (i === 0) {
//     ratings.write(
//       `accuracy, communication, cleanliness, location, checkIn, value, average\n`
//     );
//     ratings.write(writeValue + '\n');
//   } else if (i === 99999) {
//     ratings.write(writeValue);
//   } else {
//     ratings.write(writeValue + '\n');
//   }
// }

(async () => {
  for (let i = 0; i < 10000000; i++) {
    let reviewObj = {
      id: i + 1,
      user: users[Math.floor(Math.random() * users.length)],
      date: `${months[Math.floor(Math.random() * months.length)]} ${
        years[Math.floor(Math.random() * years.length)]
      }`,
      text: generateBody(),
      userImage: `${imageURls[Math.floor(Math.random() * imageURls.length)]}`
    };

    let writeValue = Object.values(reviewObj).join(',');

    if (i % 1000000 === 0) console.log(i);

    if (i === 0) {
      reviews.write('user, date, text, userImage\n');
      reviews.write(writeValue + '\n');
    } else if (i === 10000000) {
      reviews.write(writeValue);
    } else {
      if (!reviews.write(writeValue + '\n')) {
        await new Promise(resolve => reviews.once('drain', resolve));
      }
    }
  }
})();
