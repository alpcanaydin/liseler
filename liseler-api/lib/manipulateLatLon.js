const haversineDistance = require('./haversineDistance');
const addDistanceToGeoPoint = require('./addDistanceToGeoPoint');

const orientationMap = {
  1: 'north',
  2: 'east',
  3: 'south',
  4: 'west',
};

const manipulateLatLon = (allLocations, location) => {
  const nearLocations = allLocations.filter(item => haversineDistance(item, location) < 10);

  if (!nearLocations.length) {
    return location;
  }

  return addDistanceToGeoPoint(
    nearLocations[nearLocations.length - 1],
    2,
    orientationMap[
      nearLocations.length > orientationMap.length
        ? orientationMap[nearLocations.length % 4]
        : nearLocations.length
    ],
  );
};

module.exports = manipulateLatLon;
