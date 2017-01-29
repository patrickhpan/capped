import React from 'react';

class Modal extends React.Component {
    static contextTypes = {
        router: React.PropTypes.object,
        location: React.PropTypes.object
    };
    closeModal() {
        let { query } = this.context.location;
        delete query.modal;
        this.context.router.push(this.context.router.createPath(
            this.context.location.pathname,
            query
        ))
    }
    render() {
        let { children } = this.props;
        let closeModal = this.closeModal.bind(this);
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

