const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=f091b749b80cd003a1d6b3fc5483edef&query=" +
    longitude +
    "," +
    latitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weatherstack", undefined);
    } else if (body.error) {
      callback("Location not found", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}. It is ${body.current.temperature} degrees out. But it feels like ${body.current.feelslike} degrees out.`
      );
    }
  });

  //   request({ url: url, json: true }, (error,  => {
  //     if (error) {
  //       callback("", undefined);
  //     } else if (response.body.error) {
  //       callback("location not found", undefined);
  //     } else {
  //       callback(
  //         undefined,
  //         `${response.body.current.weather_descriptions}. It is ${response.body.current.temperature} degrees out. But it feels like ${response.body.current.feelslike} degrees out.`
  //       );
  //     }
  //   });
};

module.exports = forecast;
