const haversineDistance = (point1, point2) => {
  const EARTH_RADIUS = 6371;
  const PI_IN_RADIAN = Math.PI / 180;

  const { lat: lat1, lon: lon1 } = point1;
  const { lat: lat2, lon: lon2 } = point2;

  const angle =
    0.5 -
    Math.cos((lat2 - lat1) * PI_IN_RADIAN) / 2 +
    Math.cos(lat1 * PI_IN_RADIAN) *
      Math.cos(lat2 * PI_IN_RADIAN) *
      (1 - Math.cos((lon2 - lon1) * PI_IN_RADIAN)) /
      2;

  return Math.round(2 * 1000 * EARTH_RADIUS * Math.asin(Math.sqrt(angle)));
};

module.exports = haversineDistance;
