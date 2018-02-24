import React from 'react';
import PropTypes from 'prop-types';
import Button from 'muicss/lib/react/button';

import Modal from '../Modal';
import './confirm-buttons.pcss';

const BUTTON_TYPE = PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.oneOf(['primary', 'danger', 'accent']),
    onClick: PropTypes.func
});

export default class Confirm extends React.Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        buttons: PropTypes.arrayOf(BUTTON_TYPE.isRequired),
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired
    };
    static defaultProps = {
        buttons: [
            {
                text: 'Cancel',
                color: 'danger',
                onClick: () => {}
            },
            {
                text: 'Submit',
                color: 'primary',
                onClick: () => {}
            }
        ]
    };

    render() {
        const { onClose, buttons, children } = this.props;

        return (
            <Modal
                title='Confirm'
                onClose={ onClose }
            >
                { children }
                <div className='confirm-buttons'>
                    {
                        buttons.map(({ text, color, onClick }, index) =>
                            <Button
                                key={ index }
                                className='confirm-buttons__item'
                                color={ color }
                                size='small'
                                variant='flat'
                                onClick={ onClick }
                            >
                                { text }
                            </Button>
                        )
                    }
                </div>
            </Modal>
        );
    }
}
