import React from 'react';

import Header from './Header';
import { check } from '../js/auth';

import Signup from './modals/Signup';
import Login from './modals/Login';
import Success from './modals/Success';

const MODALS = {
    Signup,
    Login,
    Success
}

class App extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object
    };
    static childContextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object,
        user: React.PropTypes.object
    };
    getChildContext() {
        return {
            router: this.context.router,
            location: this.props.location,
            user: this.state.user
        }
    }
    constructor() {
        super();
        this.state = {
            user: window.user && window.user.loggedIn ?
                window.user:
                null
        }   
    }
    updateUserStatus() {
        check().then(user => {
            if (!user.loggedIn) {
                user = null;
            }
            this.setState({
                user
            });
            window.user = user;
        })
    }
    getModal(location) {
        if (!location) {
            return null;
        }
        let { query } = location;
        if (query && query.modal) {
            let modalName = query.modal[0].toUpperCase() + query.modal.slice(1);
            let ModalComponent = MODALS[modalName];
            return ModalComponent === null ?
                null :
                <ModalComponent updateUserStatus={this.updateUserStatus.bind(this)}/>
        }
        return null;
    }
    render() {
        window.router = this.context.router
        let modalComponent = this.getModal(this.props.location);
        
        let updateUserStatus = this.updateUserStatus.bind(this)
        let { children } = this.props;
        return <div id="App">
            <Header user={this.state.user} updateUserStatus={updateUserStatus} />
            {children}
            {modalComponent}
        </div>
    }
}

export default App;

