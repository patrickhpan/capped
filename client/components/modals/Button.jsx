import React from 'react';
import cn from 'classnames';

class Button extends React.Component {
    render() {
        let { text, onClick, disabled, className } = this.props;
        let classNames = [
            'Button',
            className,
            { 'disabled': this.props.disabled === true }
        ]
        
        return <button className="Button" onClick={onClick} className={cn(classNames)}>
            { text }
        </button>
    }
}

export default Button;