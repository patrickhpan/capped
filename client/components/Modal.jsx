import React from 'react';

import Header from './Header';

class Modal extends React.Component {
    render() {
        let { children } = this.props;
        return <div className="Modal">
            <div className="modal-container">
                {children}
            </div>    
        </div>
    }
}

export default Modal;

