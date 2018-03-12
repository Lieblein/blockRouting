import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './nav.pcss';

export default class Nav extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        links: PropTypes.arrayOf(PropTypes.shape({
            path: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })).isRequired
    };
    static defaultProps = {
        className: ''
    };

    render() {
        const { className, links } = this.props;

        return (
            <nav className={ 'nav ' + className } >
                <ul className='nav__list'>
                    {
                        links.map(({ path, text }) =>
                            <li key={ path } className='nav__item'>
                                <NavLink
                                    to={ path }
                                    exact={ true }
                                    className='nav__link'
                                    activeClassName='nav__link--current'
                                >
                                    { text }
                                </NavLink>
                            </li>
                        )
                    }
                </ul>
            </nav>
        );
    }
}
