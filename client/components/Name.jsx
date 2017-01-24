import React from 'react';
import { Link } from 'react-router';
import request from 'request-promise';

import { check, login } from '../js/auth';

class Name extends React.Component {
    constructor() {
        super();
        this.state = {
            name: null
        }
    }
    componentDidMount() {
        check().then(data => {
            console.log(typeof data)
            if (data.loggedIn) {
                this.setState({
                    name: data.name
                })
            }
        })
    }
    getName() {
        return this.state.name || 'Login'
    }
    onClick() {
        login('patrick@patrickpan.com', 'doge').then(console.log.bind(console))
    }
    render() {
        let onClick = this.onClick.bind(this)
        let name = this.getName();
        return <a className="HelloWorld" href="#" onClick={onClick}>
            { name }
        </a>
    }
}

export default Name;