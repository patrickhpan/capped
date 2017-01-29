import React from 'react';

class Modal extends React.Component {
    closeModal() {
        window.history.back();
    }
    render() {
        let { children } = this.props;
        let closeModal = this.closeModal;
        let doNothing = event => {
            event.stopPropagation();
            return false;
        }
        return <div className="Modal" onClick={closeModal}>
            <div className="modal-container" onClick={doNothing}>
                {children}
            </div>    
        </div>
    }
}

export default Modal;

