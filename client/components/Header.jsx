import React from 'react';
import { Link } from 'react-router';

import Logo from './header/Logo';
import UserStatus from './header/UserStatus';
import Signup from './header/Signup';
import Logout from './header/Logout';

class Header extends React.Component {
    render() {
        let updateUserStatus = this.props.updateUserStatus.bind(this);
        return <div className="Header">
            <div className="left">
                <Logo />
            </div>
            <div className="right">
                <Link to="/about">About</Link>
                {
                    this.props.user ?
                        <Logout /> :    
                        <Signup user={this.props.user} />
                }
                <UserStatus user={this.props.user} updateUserStatus={updateUserStatus}/>
            </div>
        </div>
    }
}

export default Header;
