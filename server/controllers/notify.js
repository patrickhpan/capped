const { getInfo } = require('../apis/youtube');
const { sendMail } = require('../apis/mailgun');

function notify(ytid, email) {
    let message = {
        subject: `Your video has been Capped! ${new Date()}`,
        html: `Your <a href='https://www.youtube.com/watch?v=${ytid}'>video</a> has been capped!`
    }
    sendMail(email, message);
}

module.exports = notify;