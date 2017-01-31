import request from 'request-promise';
import resolveUrl from './resolveUrl';

const URLS = {
    EXISTS: resolveUrl('/video-info/exists/'),
    ANALYZE: resolveUrl('/video-info/analyze/'),
    INFO: resolveUrl('/video-info/info/'),
    SOME: resolveUrl('/video-info/some')
}

let wrapRequest = options => request(options)
    .then(data => (data && typeof data === 'string') ?
        JSON.parse(data) :
        data
    )
    .catch(data => {
        console.error(data);
        return data;
    })

function dataExists(ytid) {
    let options = {
        uri: URLS.EXISTS + ytid
    }
    return wrapRequest(options);
}

function analyze(ytid) { 
    let options = {
        uri: URLS.ANALYZE + ytid
    }
    return wrapRequest(options)
}

function info(ytid) {
    let options = {
        uri: URLS.INFO + ytid
    }
    return wrapRequest(options)
}

function some(number) {
    let uri = URLS.SOME;
    if (number) {
        uri += `?number=${number}`
    }
    return wrapRequest({ uri })
}

export {
    dataExists,
    analyze,
    info,
    some
}