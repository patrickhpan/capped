import React from 'react';
import { Link } from 'react-router';

import { logout } from '../../js/auth';

class Logout extends React.Component {
    render() {
        return <a href="/auth/logout" className="SignupLink">Log Out</a>;
    }
}

export default Logout;