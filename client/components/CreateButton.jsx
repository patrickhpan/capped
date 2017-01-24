import React from 'react';
import cn from 'classnames';

class CreateButton extends React.Component {
    render() {
        let { onClick, disabled  } = this.props;
        let classNames = [
            'CreateButton',
            { 'disabled': this.props.disabled === true }
        ]
        
        return <button className="CreateButton" onClick={onClick} className={cn(classNames)}>
            Caption It!
        </button>
    }
}

export default CreateButton;