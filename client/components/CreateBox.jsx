import React from 'react';

import CreateButton from './CreateButton';

import keyDown from '../js/keyDown';

class CreateBox extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false,
            errorMessage: null
        }
    }
    render() {
        let errorMessage = this.state.errorMessage === null ? 
            null :
            <div className="error-message">
                {this.state.errorMessage}    
            </div>    
        
        let onClick = alert;
        
        return <div className="CreateBox">
            <div className="background">
                <input type="text" onKeyDown={keyDown(onClick, [13])} />
                <CreateButton onClick={onClick}/>
            </div>    
            {errorMessage}
        </div>
    }
}

export default CreateBox;