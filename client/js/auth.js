import request from 'request-promise';
import resolveUrl from './resolveUrl';

const URLS = {
    CHECK: resolveUrl('/auth'),
    LOGIN: resolveUrl('/auth/login'),
    SIGNUP: resolveUrl('/auth/signup'),
    SIGNOUT: resolveUrl('/auth/signout')
}

let wrapRequest = options => request(options)
    .then(data => (data && typeof data === 'string') ?
        JSON.parse(data) :
        data
    )
    .catch(console.error.bind(console))

function check() {
    return wrapRequest({ url: URLS.CHECK });
}

function login(email, password) {
    let options = {
        method: 'POST',
        uri: URLS.LOGIN,
        form: {
            email,
            password
        }
    }
    return wrapRequest(options);
}

function signup(email, password) {
    let options = {
        method: 'POST',
        uri: URLS.SIGNUP,
        form: {
            email,
            password
        }
    }
    return wrapRequest(options);
}

function signout() {
    let options = {
        method: 'POST',
        uri: URLS.SIGNOUT
    }
    return wrapRequest(options);
}

export {
    check,
    login,
    signup,
    signout
}