import React from 'react';
import { Link } from 'react-router';

class HelloWorld extends React.Component {
    render() {
        let onClick = () => false;
        return <a className="HelloWorld" href="#" onClick={onClick}>
            Patrick Pan
        </a>
    }
}

export default HelloWorld;