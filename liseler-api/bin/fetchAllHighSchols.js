const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const cityFetcher = require('../lib/cityFetcher');

const MAX_PLATE = 81;

const fetcher = async plate => {
  console.log(`Started to fetching for ${plate}`);
  const data = await cityFetcher(plate);

  fs.writeFile(`${__dirname}/../data/${plate}.json`, JSON.stringify(data, null, 2), () => {
    console.log('Data saved to file.');

    if (plate === MAX_PLATE) {
      console.log('All done!');
      process.exit(1);
    }

    fetcher(plate + 1);
  });
};

fetcher(1);
