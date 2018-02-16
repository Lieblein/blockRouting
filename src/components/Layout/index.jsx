import React from 'react';
import PropTypes from 'prop-types';
import Container from 'muicss/lib/react/container';

import { MAIN_PAGE_ROUTE, SUB_PAGE_ROUTE } from '../../constants/routes';
import Nav from '../Nav';
import './layout.pcss';

const LINKS = [
    {
        path: MAIN_PAGE_ROUTE,
        text: 'Form'
    },
    {
        path: SUB_PAGE_ROUTE,
        text: 'Not form'
    }
];

export default class Layout extends React.Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]).isRequired
    };

    render() {
        return (
            <Container>
                <div className='layout'>
                    <Nav
                        className='layout__nav'
                        links={ LINKS }
                    />
                    <div className='layout__content'>
                        { this.props.children }
                    </div>
                </div>
            </Container>
        );
    }
}
