const NodeGeocoder = require('node-geocoder');

const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};

// util that creates a geocoder object with the necessary options
const geocoder = NodeGeocoder(options);

module.exports = geocoder;