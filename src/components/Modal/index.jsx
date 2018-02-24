import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

import './modal.pcss';

const customStyles = {
    content : {
        position: 'fixed',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 45px, rgba(0, 0, 0, 0.22) 0px 10px 18px',
        border: 'none'
    }
};

export default class CustomModal extends React.Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired,
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired
    };

    render() {
        const { onClose, title, children } = this.props;

        return (
            <Modal 
                isOpen={ true }
                onRequestClose={ onClose }
                shouldCloseOnOverlayClick={ true }
                style={ customStyles }
                ariaHideApp={ false }
            >
                <div className='modal'>
                    <h3 className='modal__title'>
                        { title }
                    </h3>
                    <div className='modal__body'>
                        { children }
                    </div>
                </div>
            </Modal>
        );
    }
}
