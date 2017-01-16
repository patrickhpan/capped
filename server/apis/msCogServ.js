const request = require('request-promise');

const CV_URL = 'https://api.projectoxford.ai/vision/v1.0/analyze'

function generateCVRequest(fileReadStream, visualFeatures = [], details = [], language = 'en') {
    const APIKEY = process.env.MSFT_CV_APIKEY;

    let visualFeaturesString = visualFeatures.join(',');
    let detailsString = details.join(',');

    let options = {
        method: 'POST',
        uri: CV_URL,
        qs: {
            visualFeatures: visualFeaturesString,
            details: detailsString,
            language: language
        },
        headers: {
            'Ocp-Apim-Subscription-Key': APIKEY
        },
        multipart: [{
            body: fileReadStream
        }],
        json: true
    };

    return request(options)
}

module.exports = generateCVRequest;