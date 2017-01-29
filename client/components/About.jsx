import React from 'react';
import { Link } from 'react-router';

class About extends React.Component {
    render() {
        return <div className="About">
            Hello World    123
            { this.props.children }
        </div>            
    }
}

export default About