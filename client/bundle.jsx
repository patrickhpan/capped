import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, browserHistory } from 'react-router';

import preload from './preload';
import routes from './routes';
import './style/master.scss';

let history = process.env.NODE_ENV === 'production' ?
    browserHistory :
    hashHistory;

let router = <Router 
    children={routes}
    history={history}
/>

preload().then(() => {
    ReactDOM.render(router, document.getElementById("app-root"));
})