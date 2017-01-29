import request from 'request-promise';
import resolveUrl from './resolveUrl';

const URLS = {
    CHECK: resolveUrl('/auth'),
    LOGIN: resolveUrl('/auth/login'),
    LOGOUT: resolveUrl('/auth/logout'),
    SIGNUP: resolveUrl('/auth/signup')
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

function logout() {
    let options = {
        method: 'POST',
        uri: URLS.LOGOUT
    }
    return wrapRequest(options);
}

function signup(name, email, password) {
    let options = {
        method: 'POST',
        uri: URLS.SIGNUP,
        form: {
            name, 
            email,
            password
        }
    }
    return wrapRequest(options);
}

export {
    check,
    login,
    logout,
    signup
}