import React from 'react';

import Modal from './Modal';
import TextBox from './TextBox';
import Button from './Button';

import { login } from '../../js/auth';
import getErrorMessage from '../../js/signupError';
import keyDown from '../../js/keyDown';

class Success extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object
    };
    constructor() {
        super();
    }
    close() {
        let { query } = this.context.location;
        delete query.modal;
        this.context.router.push(this.context.router.createPath(
            this.context.location.pathname,
            query
        ))
    }
    render() {
        let onClick = this.close.bind(this);
        return <Modal>
            <div className="Signup">
                <h1>Success!</h1>
                <div className="msg">We'll send you an email when the video has been capped! If you haven't received an email in fifteen minutes, please try again.</div>
                <Button text="OK" onClick={onClick}/>
            </div>    
        </Modal>    
    }
}

export default Success;