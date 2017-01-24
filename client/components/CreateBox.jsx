import React from 'react';

import CreateButton from './CreateButton';

import keyDown from '../js/keyDown';
import youtubeUrl from '../js/youtubeUrl';

class CreateBox extends React.Component {
    constructor() {
        super();
        this.state = {
            disabled: false,
            errorMessage: null
        }
    }
    
    create() {
        let { value } = this.input;
        let ytid = youtubeUrl(value);
        if (dwtrue) {
            
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
                <input type="text" placeholder="Paste a YouTube Link!" ref={(input) => this.input = input} onKeyDown={keyDown(onClick, [13])} />
                <CreateButton onClick={onClick}/>
            </div>    
            {errorMessage}
        </div>
    }
}

export default CreateBox;