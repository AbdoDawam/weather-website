const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=35546a24bfde66269a2b43b3de5211ae&query=${long},${lat}`;

  request({ url, json: true }, (e, { body }) => {
    if (e) {
      callback("Unable to connect to the Location Services", undefined);
    } else if (body.error) {
      callback("Unable to Find The Location", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. it currently ${body.current.temperature} and it feels like ${body.current.feelslike} And the Humidity is ${body.current.humidity}%`
      );
    }
  });
};
module.exports = forecast;
