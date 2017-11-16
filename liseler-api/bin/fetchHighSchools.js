const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const cityFetcher = require('../lib/cityFetcher');

const PLATE = process.argv[2];

if (!/\d+/.test(PLATE)) {
  console.log('Please provide a valid plate.');
  process.exit(1);
}

const main = async () => {
  console.log(`Started to fetching for ${PLATE}`);
  const data = await cityFetcher(PLATE, 1);

  fs.writeFile(`${__dirname}/../data/${PLATE}.json`, JSON.stringify(data, null, 2), () => {
    console.log('Data saved to file.');
    process.exit();
  });
};

main();
