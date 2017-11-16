const rp = require('request-promise');
const cheerio = require('cheerio');
const qs = require('qs');

const getLatLonFromUniqueName = async name => {
  const response = await rp(`http://${name}.${process.env.MEB_MAP_URL}`);
  const $ = cheerio.load(response);

  const queryString = $('iframe')
    .prop('src')
    .split('?')[1];

  const { q: latLon } = qs.parse(queryString);
  const [lat, lon] = latLon.split(',');

  return { lat: parseFloat(lat), lon: parseFloat(lon) };
};

module.exports = getLatLonFromUniqueName;
