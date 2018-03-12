import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import cn from 'classnames';

import { hideConfirm } from '../../actions/confirm';
import Confirm from '../Confirm';
import './form.pcss';

const MIN_VALUE_LENGTH = 3;

export class PageMain extends React.Component {
    static propTypes = {
        confirmVisible: PropTypes.bool.isRequired,
        goToNextPage: PropTypes.func.isRequired,
        blockRouting: PropTypes.func.isRequired,
        hideConfirm: PropTypes.func.isRequired,

        history: PropTypes.shape({
            block: PropTypes.func.isRequired
        }).isRequired
    };

    state = {
        defaultValue: '',
        value: '',

        valid: null,
        changed: false,
        unblockRouting: () => {}
    };

    componentWillUpdate(nextProps, nextState) {
        const { history: { block } } = this.props;
        const { changed } = this.state;

        if (changed !== nextState.changed) {
            if (nextState.changed) {
                this.setState({
                    // https://github.com/ReactTraining/history#blocking-transitions
                    // nonempty string is necessary, but in fact we do not need it
                    unblockRouting: block('message')
                });
            } else {
                this.enableRouting();
                this.setState({
                    unblockRouting: () => {}
                });
            }
        }
    }
    componentWillUnmount() {
        this.enableRouting();
    }

    enableRouting = () => {
        this.state.unblockRouting();
        this.props.hideConfirm();
    }

    onChange = ({ target: { value } }) => {
        const { defaultValue } = this.state;

        const valid = this.isValid(value);
        const changed = defaultValue !== value;

        this.setState({
            value,
            valid,
            changed
        });
    };

    isValid = (value) => value.length >= MIN_VALUE_LENGTH;

    isSubmitDisabled = () => {
        const { changed, valid } = this.state;
        return !valid || !changed;
    };

    save = () => {
        console.log('save');
        this.setState({
            changed: false
        });
    };

    saveAndGoNext = () => {
        this.save();
        this.props.goToNextPage();
    };

    blockAndHide = () => {
        const { blockRouting, hideConfirm } = this.props;

        blockRouting();
        hideConfirm();
    };

    render() {
        const {
            confirmVisible, goToNextPage
        } = this.props;
        const {
            value, valid
        } = this.state;
        const disabled = this.isSubmitDisabled();

        return (
            <Form inline={ true } className='form'>
                <Input
                    className={ cn(
                        'form__input',
                        {
                            'form__input--error': valid === false,
                            'form__input--success': valid === true
                        }
                    ) }
                    placeholder='Your name'
                    required={ true }
                    value={ value }
                    onChange={ this.onChange }
                />
                <Button
                    className={ cn('form__button', { 'form__button--disabled': disabled }) }
                    color='primary'
                    disabled={ disabled }
                    onClick={ this.save }
                >
                    Submit
                </Button>

                {
                    confirmVisible &&
                        <Confirm
                            onClose={ this.blockAndHide }
                            buttons={ [
                                {
                                    text: valid ? 'Save' : 'Cancel',
                                    color: 'primary',
                                    onClick: valid ? this.saveAndGoNext : this.blockAndHide
                                },
                                {
                                    text: 'Go next',
                                    color: 'primary',
                                    onClick: goToNextPage
                                }
                            ] }
                        >
                            You have not saved form data
                            {
                                !valid && ', and form has error'
                            }
                        </Confirm>
                }
            </Form>
        );
    }
}

const mapStateToProps = ({
    confirm: { visible, goToNextPage, blockRouting }
}) => ({
    confirmVisible: visible,
    goToNextPage,
    blockRouting
});
export default connect(
    mapStateToProps,
    {
        hideConfirm
    }
)(PageMain);
