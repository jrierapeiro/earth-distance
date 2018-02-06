'use strict';

const earthMeanSphericalRadius = 6371.0088;

module.exports = {
  distance
};

// Returns the distance between two points in KM
function distance(fromLat, fromLong, toLat, toLong) {
  if (_isNoValidDegreeValue(fromLat) || _isNoValidDegreeValue(fromLong) || _isNoValidDegreeValue(toLat) || _isNoValidDegreeValue(toLong)) {
    throw new Error(`Distance: Invalid arguments ${fromLat} ${fromLong} ${toLat} ${toLong}`);
  }

  // Distance to same point = 0
  if (fromLat === toLat && fromLong === toLong) {
    return 0;
  }

  // Conversion to radians
  const latA = _convertToRadians(fromLat);
  const longA = _convertToRadians(fromLong);
  const latB = _convertToRadians(toLat);
  const longB = _convertToRadians(toLong);

  // Absolute longitude difference
  const longitudeDifference = longB - longA;

  // Vincenty's formulae
  let numerator = Math.pow(Math.cos(latB) * Math.sin(longitudeDifference), 2) + Math.pow(Math.cos(latA) * Math.sin(latB) - Math.sin(latA) * Math.cos(latB) * Math.cos(longitudeDifference), 2);
  numerator = Math.sqrt(numerator);
  const denominator = Math.sin(latA) * Math.sin(latB) + Math.cos(latA) * Math.cos(latB) * Math.cos(longitudeDifference);
  const angle = Math.atan2(numerator, denominator);

  return earthMeanSphericalRadius * angle;
}

function _convertToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function _isNoValidDegreeValue(value) {
  return typeof (value) !== 'number';
}
