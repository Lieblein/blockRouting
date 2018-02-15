import React from 'react';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';
import cn from 'classnames';

import './form.pcss';

const MIN_VALUE_LENGTH = 3;

export default class PageMain extends React.Component {
    state = {
        defaultValue: '',
        value: '',

        valid: null
    };

    onChange = ({ target: { value } }) => {
        const valid = this.isValid(value);
        this.setState({
            value,
            valid
        });
    };

    isValid = (value) => value.length >= MIN_VALUE_LENGTH;;

    isSubmitDisabled = () => {
        const { defaultValue, value, valid } = this.state;
        const changed = defaultValue !== value;

        return !valid || !changed;
    };

    render() {
        const { value, valid } = this.state;
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
                >
                    Submit
                </Button>
            </Form>
        );
    }
}
