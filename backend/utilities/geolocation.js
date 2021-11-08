// Third party modules
const axios = require('axios')
require("dotenv").config();

// Custom modules
const HttpError = require('../models/http-error')


const getCoordinates = async (address) => {
    try {
        const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_API_KEY}`)

        const coordinates = response.data.features[0].geometry.coordinates
        console.log(coordinates)        // test
        return {
            lng: coordinates[0],
            lat: coordinates[1]
        }
    } catch (error) {
       const errorMessage = error.response //.data 
            ? error.response.data.message 
            : 'Could not find location for the address entered. Please check the address and enter it again'
       const errorStatus = error.response 
            ? error.response.status
            : 500   
        throw new HttpError(errorMessage, errorStatus)
    }
}

module.exports = getCoordinates