import React from 'react';
import { Link } from 'react-router';

import CreateBox from './CreateBox';

class Body extends React.Component {
    render() {
        return <div className="Body">
            <Link to="/"><h1 className="logo">capped</h1></Link>
            <CreateBox />
        </div>
    }
}

export default Body;