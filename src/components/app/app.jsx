import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PageMain from '../page-main';
import PageSub from '../page-sub';

import './app.css';

export default class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route
                    exact={ true }
                    path='/'
                    component={ PageMain }
                />
                <Route
                    path='*'
                    component={ PageSub }
                />
            </Switch>
        );
    }
}
