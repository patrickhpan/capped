import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Landing from './components/Landing';
import About from './components/About';
import Watch from './components/Watch';

let routes = <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="about" component={About} />
    <Route path="watch/:ytid" component={Watch} />
</Route>

export default routes;