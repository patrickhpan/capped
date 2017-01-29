import React from 'react';
import { Link } from 'react-router';

import { login, logout } from '../../js/auth';

class UserStatus extends React.Component {
    getName() {
        return this.props.user ?
            this.props.user.name :
            'Login';
    }
    render() {
        // let onClick = event => {
        //     event.preventDefault();

        //     (
        //         this.props.user ?
        //             logout() :
        //             login('services@patrickpan.com', 'doge')
        //     ).then(() => {
        //         this.props.updateUserStatus();
        //     });
        // }
    
        let name = this.getName();
        return <Link to="/login">{name}</Link>
        // return <a className="HelloWorld" onClick={onClick} href="#">
        //     { name }
        // </a>
    }
}

export default UserStatus;