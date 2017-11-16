const addDistanceToGeoPoint = (point, meters, orientation) => {
  const { lat, lon } = point;
  let newLat = 0;
  let newLon = 0;

  const RADIUS = 6335000;

  if (orientation === 'north' || orientation === 'south') {
    let x = meters * 180 / (Math.PI * RADIUS);

    if (orientation === 'south') {
      x = -x;
    }

    newLat = lat + x;
  } else {
    let x = meters * 180 / (Math.PI * RADIUS * Math.cos(lat));

    if (orientation === 'west') {
      x = -x;
    }

    newLon = lon + x;
  }

  return { lat: newLat || lat, lon: newLon || lon };
};

module.exports = addDistanceToGeoPoint;
