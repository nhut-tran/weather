const request = require('request');
const forecast = (long, lat, wea)=>{
    const weatherUrl = `https://api.darksky.net/forecast/e58975f293c774d55b56e4f2c0e44482/${lat},${long}?lang=en`;
    request({url:weatherUrl, json:true}, (error, response)=>{
      if(error){
        wea('connecttion interrtupt', undefined)
      }else if(response.body.error){
        wea('can find the place, try another search', undefined);
        console.log(weatherUrl)
      }else{
      
      wea(undefined, {
          summary: response.body.daily.data[0].summary,
          temp: response.body.currently.temperature,
          RainProbility: response.body.currently.precipProbability

      });
      }
    })
  }
 

module.exports = forecast;
