import React from 'react';
import { Link } from 'react-router';

import { check } from '../../js/auth';

class Signup extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object
    };
    generateURL() {
        let { query } = this.context.location;
        if (query.modal) {
            delete query.modal
        } else {
            query.modal = 'signup'
        }
        return this.context.router.createPath(
            this.context.location.pathname,
            query
        );
    }
    render() {
        return this.props.user ? 
            null :
            <Link className="SignupLink" to={this.generateURL()}>Sign Up</Link>
    }
}

export default Signup;