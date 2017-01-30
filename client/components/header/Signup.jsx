import React from 'react';
import { Link } from 'react-router';

class Signup extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object
    };
    generateURL() {
        let loc = Object.assign({}, this.context.location);
        let query = loc.query;
        let newQuery = Object.assign({}, query)
        if (newQuery.modal) {
            delete newQuery.modal
        } else {
            newQuery.modal = 'signup'
        }
        return this.context.router.createPath(
            this.context.location.pathname,
            newQuery
        );
    }
    render() {
        return this.props.user ? 
            null :
            <Link className="SignupLink" to={this.generateURL()}>Sign Up</Link>
    }
}

export default Signup;