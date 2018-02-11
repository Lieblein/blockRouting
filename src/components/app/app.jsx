import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'muicss/lib/react/container';

import PageMain from '../page-main';
import PageSub from '../page-sub';

export default class App extends React.Component {
    render() {
        return (
            <Container>
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
            </Container>
        );
    }
}
