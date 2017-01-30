import React from 'react';
import { Icon } from 'react-fa';

class TextBox extends React.Component {
    getValue() {
        return this.input.value;
    }
    clear() {
        this.input.value = ''
    }
    render() {
        let { icon, password, placeholder, onKeyDown } = this.props;
        let inputType = (password === true || password === 'true') ?    
            'password' :
            'text';
        
        let iconElement = icon ?
            <Icon className="Icon" name={icon} /> :
            null;
        
        return <div className="TextBox">
            <div className="background">
                { iconElement }
                <input onKeyDown={onKeyDown} ref={input => { this.input = input } } type={inputType} placeholder={placeholder}/>    
            </div>    
        </div>
    }
}

export default TextBox;