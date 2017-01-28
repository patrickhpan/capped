const dateFormat = require('dateformat');
global.devlog = function(...args) {
    if (process.env.QUIET !== 'true') {
        let time = dateFormat(new Date(), "HH:MM:ss >>");
        console.log(time, ...args)
    }
}