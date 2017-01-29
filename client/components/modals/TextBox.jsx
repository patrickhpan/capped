import React from 'react';

class TextBox extends React.Component {
    getValue() {
        return this.input.value;
    }
    render() {
        let { password, placeholder } = this.props;
        let inputType = (password === true || password === 'true') ?    
            'password' :
            'text';
        
        return <div className="TextBox">
            <div className="background">
                <input ref={input => { this.input = input } } type={inputType} placeholder={placeholder}/>    
            </div>    
        </div>
    }
}

export default TextBox;