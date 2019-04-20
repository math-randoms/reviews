const fs = require('fs');

const properties = fs.createWriteStream('./properties.csv');

(async () => {
  for (let i = 0; i < 1000000; i++) {
    let writeValue = i + 1;

    if (i % 100000 === 0) console.log(i);

    if (i === 0) {
      properties.write('propertyId\n');
      properties.write(writeValue + '\n');
    } else if (i === 999999) {
      if (!properties.write(writeValue + '')) {
        await new Promise(resolve => properties.once('drain', resolve));
      }
    } else {
      if (!properties.write(writeValue + '\n')) {
        await new Promise(resolve => properties.once('drain', resolve));
      }
    }
  }
})();
