const dateFormat = require('dateformat');
global.devlog = function(...args) {
    if (process.env.NODE_ENV !== 'production') {
        let time = dateFormat(new Date(), "HH:MM:ss >>");
        console.log(time, ...args)
    }
}