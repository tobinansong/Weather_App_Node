const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3eb8596f533caac0b09d943f24fa29b0&query=${latitude},${longitude}&units=f`;
    //const url = "http://api.weatherstack.com/current?access_key=3eb8596f533caac0b09d943f24fa29b0&query=37.8267,-122.4233&units=f";

    request({ url, json: true,}, (error, {body}) => {
         if (error) {
            callback("Unable to connect to location service", undefined)
        } else if (body.error) {
            console.log(body.error)
            callback("Unable to find location", undefined)
        } else {
            console.log(body.current)
            callback(undefined, `${body.current.weather_descriptions}.
            It is currently ${body.current.temperature} degrees outside.
            There is a ${body.current.precip}% chance of rain.  
            The wind speed is ${body.current.wind_speed}mph.
            The air humidity is ${body.current.humidity}. `)
        }
    }) 
}

module.exports = forecast


// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })
  