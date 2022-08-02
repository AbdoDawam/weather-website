const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWJkb2Rhd2FtIiwiYSI6ImNsNW9heXhhajFia3ozcW8xa3RubWt2N2kifQ.azsHyadCL1v62DQ5Z1JPgQ&limit=1`;

  request({ url, json: true }, (e, { body }) => {
    if (e) {
      callback("Unable to connect to the Location Services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find Location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
