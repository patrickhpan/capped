import React from 'react';
import { Link } from 'react-router';

import Name from './Name';

import keyify from '../js/keyify';
import Config from '../json/Header.json';

let components = {
    Name: Name
}

class Header extends React.Component {
    renderItem(element) {
        let { component, props } = element;
        if (component !== undefined && components[component] !== undefined) {
            let Component = components[component];
            return <Component {...props} />;
        }
        return <Link to={element.link} {...props}>{element.text}</Link>
    }
    render() {
        return <div className="Header">
            <div className="left">
                {keyify(Config.left.map(this.renderItem))}
            </div>
            <div className="right">
                {keyify(Config.right.map(this.renderItem))}
            </div>
        </div>
    }
}

export default Header;
