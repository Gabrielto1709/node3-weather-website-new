const request = require('request')

const geocode = (address, callback)=>{
    const geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ2FicmllbHRvIiwiYSI6ImNreHV5bjRjMDBwb3cyd3FmOGJ1MDEwbHYifQ.7gSgHbvAC_f_cYqFU5R2hg&limit=1'
    request({url: geoUrl, json:true}, (error,{body})=>{
        if(error){
            callback(error)
        }else if(body.features.length === 0){
            callback(error)
        }else{
            const coordinates = body.features[0].center
            callback(undefined, {
                latitude: coordinates[1],
                longitude: coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode