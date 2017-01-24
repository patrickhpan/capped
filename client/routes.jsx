import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import Landing from './components/Landing';
import Modal from './components/Modal';
import About from './components/About';

let routes = <Route path="/" component={App}>
    <IndexRoute component={Landing} />
    <Route path="/about" component={Landing}>
        <Route component={Modal}>
            <IndexRoute component={About} />    
        </Route>    
    </Route>    
</Route>

export default routes;