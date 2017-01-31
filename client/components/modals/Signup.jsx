import React from 'react';

import Modal from './Modal';
import TextBox from './TextBox';
import Button from './Button';

import { signup } from '../../js/auth';
import getErrorMessage from '../../js/signupError';
import keyDown from '../../js/keyDown';

class Signup extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object
    };
    constructor() {
        super();
        this.state = {
            error: null,
            done: false,
        }
    }
    toLogin() {
        let { query } = this.context.location;
        query.modal = "login"
        this.context.router.push(this.context.router.createPath(
            this.context.location.pathname,
            query
        ))
    }
    onClick() {
        let name = this.name.getValue();
        let email = this.email.getValue();
        let pw = this.pw.getValue();
        signup(name, email, pw).then(data => {
            let { error } = data;
            if (error) {
                let errorMessage = (
                    typeof error === 'string' ? 
                        JSON.parse(error) :
                        error
                ).message
                this.setState({
                    error: getErrorMessage(errorMessage),
                    done: false
                })
            } else {
                this.setState({
                    error: null,
                    done: true
                }, () => {
                    this.name.clear()
                    this.email.clear()
                    this.pw.clear()    
                })
            }
        })
    }
    renderMessage() {
        if (this.state.done) {
            return <div className="clickable" onClick={this.toLogin.bind(this)}>
                Signup successful. Click here to log in!    
            </div>
        }
        return this.state.error === null ?
            <div className="clickable" onClick={this.toLogin.bind(this)}>
                Already signed up? Click here to log in!    
            </div> :
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
                <h1>Sign up to caption your video!</h1>
                <TextBox icon="user" onKeyDown={onEnter} ref={input => { this.name = input } } placeholder="Name"></TextBox>
                <TextBox icon="envelope" onKeyDown={onEnter} ref={input => { this.email = input } } placeholder="Email Address"></TextBox>
                <TextBox icon="key" onKeyDown={onEnter} ref={input => { this.pw = input } } placeholder="Password" password={true}></TextBox>
                {message}
                <Button ref={button => { this.button = button} }text="Sign up!" onClick={onClick}/>
            </div>    
        </Modal>    
    }
}

export default Signup;