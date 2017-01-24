import React from 'react';
import { Link } from 'react-router';
import request from 'request-promise';

import { check, login, logout } from '../js/auth';

class Name extends React.Component {
    constructor() {
        super();
        this.state = {
            name: window.user && window.user.loggedIn ?
                window.user.name:
                null
        }
    }
    updateUserStatus() {
        check().then(user => {
            this.setState({
                name: user.loggedIn ? 
                    user.name : 
                    null
            })
        })
    }
    getName() {
        return this.state.name || 'Login'
    }
    onClick(event) {
        (
            this.state.name ? 
                logout() :
                login('services@patrickpan.com', 'doge')

        ).then(() => {
                this.updateUserStatus();    
            })
        event.preventDefault();
        return false;
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