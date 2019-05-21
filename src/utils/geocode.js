const request = require('request');


const geoCode = (address, getCode) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoibmh1dCIsImEiOiJjanZwYTV3bzMwODU0NGFvOHd5N3JlYWVrIn0.1jgGpHoJCn1_KWGxJZ6mZA&limit=1`
    request({url: geoUrl, json:true}, (error, response) => {
      if(error){
        getCode('connect is interupt', undefined)
      }else if(response.body.message){
        getCode('can not find the place', undefined)
    
      } else if(response.body.features.length ===0){
        getCode('can not find the place', undefined)
      }
      else {
          getCode(undefined, {
              lat:response.body.features[0].center[0],
              long: response.body.features[0].center[1],
              location: response.body.features[0].place_name
          });
        
      } 
    })
};

module.exports = geoCode;