const request = require('request-promise');

function sendMail(email, message) {
    let url = `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`;
    console.log(url)
    let form = Object.assign({}, message, {
        from: `Capped <mail@${process.env.MAILGUN_DOMAIN}>`,
        to: email,
    })
    let auth = {
        'user': 'api',
        'pass': process.env.MAILGUN_APIKEY
    }
    let options = {
        method: 'POST',
        uri: url,
        form: form,
        followAllRedirects: true,
        auth: auth
    }
    console.log(options);
    return request(options)
}

module.exports = {
    sendMail
}