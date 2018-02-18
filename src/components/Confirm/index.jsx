import React from 'react';
import Modal from 'react-material-modal';

import Portal from '../Portal';

export default class Confirm extends React.Component {
    render() {
        return (
            <Portal>
                <Modal
                    title='Confirm'
                    showing={ true }
                    close={ () => {} }
                >
                    123
                </Modal>
            </Portal>
        );
    }
}
