import { check } from './js/auth';

export default () => {
    return check()
        .then(data => {
            window.user = data;
        })
}