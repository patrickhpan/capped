import React from 'react';
import { Link } from 'react-router';

class UserStatus extends React.Component {
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
            newQuery.modal = 'login'
        }
        return this.context.router.createPath(
            this.context.location.pathname,
            newQuery
        );
    }
    getName() {
        return this.props.user ?
            this.props.user.name :
            'Login'
    }
    render() {
        let url = this.generateURL();
        return <Link className="LoginLink" to={url} onClick={(event) => { if (this.props.user) { event.preventDefault(); event.stopPropagation();}}}>
            {this.getName()}
        </Link>
    }
}

export default UserStatus;