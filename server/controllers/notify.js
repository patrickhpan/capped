const { getInfo } = require('../apis/youtube');
const { sendMail } = require('../apis/mailgun');

function notify(ytid, name, title, email) {
    let message = {
        subject: `"${title}" has been Capped!`,
        html: `Hi ${name}, <br> <br> Thanks for trying out Capped. Your video, "${title}", is ready to be viewed <a href='http://capped.patrickpan.com/watch/${ytid}'>here!</a><br><br>Thanks, <br> <br><a href='http://capped.patrickpan.com/'>The Capped Team</a>`
    }
    sendMail(email, message);
}

module.exports = notify;