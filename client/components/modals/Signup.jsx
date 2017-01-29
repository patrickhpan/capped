import React from 'react';

import Modal from './Modal';
import TextBox from './TextBox';
import Button from './Button';

import { signup } from '../../js/auth';
import getErrorMessage from '../../js/signupError';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            error: null
        }
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
                    error: getErrorMessage(errorMessage)
                })
            } else {
                this.setState({
                    error: null
                })
            }
        })
    }
    render() {
        let onClick = this.onClick.bind(this);
        let errorMessage = this.state.error ? 
            <div className="error-message">{this.state.error}</div> :
            <div />

        return <Modal>
            <div className="Signup">
                <h1>Sign up to caption your video!</h1>
                {errorMessage}
                <TextBox ref={input => { this.name = input } } placeholder="Name"></TextBox>
                <TextBox ref={input => { this.email = input } } placeholder="Email Address"></TextBox>
                <TextBox ref={input => { this.pw = input } } placeholder="Password" password={true}></TextBox>
                <Button text="Sign up!" onClick={onClick}/>
            </div>    
        </Modal>    
    }
}

export default Signup;