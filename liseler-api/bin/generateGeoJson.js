const fs = require('fs');
const JSONStream = require('JSONStream');

const manipulateLatLon = require('../lib/manipulateLatLon');
const capitalize = require('../lib/capitalize');

const requiredTypes = process.argv.slice(2);

const MAX_LENGTH = 81;

let output = [];

const reader = fileId => {
  const cityData = [];

  if (fileId > MAX_LENGTH) {
    fs.writeFile(`${__dirname}/../data.json`, JSON.stringify(output, 2, null), () => {
      console.log('All done!');
    });
    return;
  }

  const file = `${__dirname}/../data/${fileId}.json`;
  const stream = fs.createReadStream(file);
  stream
    .pipe(JSONStream.parse('*'))
    .on('data', data => {
      if (
        requiredTypes.length === 0 ||
        (requiredTypes.length && requiredTypes.indexOf(data.schoolType) > -1)
      ) {
        const { lat: newLat, lon: newLon } = manipulateLatLon(
          cityData.map(item => ({ lat: item.lat, lon: item.lon })),
          {
            lat: data.lat,
            lon: data.lon,
          },
        );

        cityData.push({
          ...data,
          lat: newLat,
          lon: newLon,
          fullName: capitalize(data.fullName),
          city: capitalize(data.city),
          town: capitalize(data.town),
          schoolName: capitalize(data.schoolName),
        });
      }
    })
    .on('close', () => {
      output = [...output, ...cityData];
      reader(fileId + 1);
    });
};

reader(1);
