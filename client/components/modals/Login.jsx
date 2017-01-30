import React from 'react';

import Modal from './Modal';
import TextBox from './TextBox';
import Button from './Button';

import { login } from '../../js/auth';
import getErrorMessage from '../../js/signupError';
import keyDown from '../../js/keyDown';

class Login extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object
    };
    constructor() {
        super();
        this.state = {
            error: null
        }
    }
    close() {
        let { query } = this.context.location;
        delete query.modal;
        this.context.router.push(this.context.router.createPath(
            this.context.location.pathname,
            query
        ))
    }
    onClick() {

        let email = this.email.getValue();
        let pw = this.pw.getValue();
        login(email, pw).then(data => {
            let { error } = data;
            if (error) {
                this.setState({
                    error: 'Login failed. Please try again.'
                })
            } else {
                this.setState({
                    error: null,
                }, () => {
                    this.email.clear()
                    this.pw.clear()    
                    this.props.updateUserStatus();
                    this.close()
                })
            }
        })
    }
    renderMessage() {
        return this.state.error === null ?
            <br /> :
            this.state.error;
    }
    render() {
        let onClick = this.onClick.bind(this);
        let message = <div className="message">
            { this.renderMessage() }
        </div>
        
        let onEnter = keyDown(onClick, 13);

        return <Modal>
            <div className="Signup">
                <h1>Welcome back! Log in here.</h1>
                <TextBox icon="envelope" onKeyDown={onEnter} ref={input => { this.email = input } } placeholder="Email Address"></TextBox>
                <TextBox icon="key" onKeyDown={onEnter} ref={input => { this.pw = input } } placeholder="Password" password={true}></TextBox>
                {message}
                <Button ref={button => { this.button = button} }text="Log in!" onClick={onClick}/>
            </div>    
        </Modal>    
    }
}

export default Login;