import React from 'react';

import CreateButton from './CreateButton';

import keyDown from '../js/keyDown';
import youtubeUrl from '../js/youtubeUrl';
import resolveUrl from '../js/resolveUrl';

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
        if (ytid !== null) {   
            window.open(resolveUrl(`/video-info/analyze/${ytid}`));   
        } else {
            this.setState({
                errorMessage: "Invalid YouTube URL."
            })
        }
    }

    render() {
        let errorMessage = this.state.errorMessage === null ? 
            null :
            <div className="error-message">
                {this.state.errorMessage}    
            </div>    
        
        let onClick = this.create.bind(this);
        
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