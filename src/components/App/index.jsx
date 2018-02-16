import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { MAIN_PAGE_ROUTE, SUB_PAGE_ROUTE } from '../../constants/routes';
import Layout from '../Layout';
import PageMain from '../PageMain';
import PageSub from '../PageSub';

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter basename='/'>
                <Layout>
                    <Switch>
                        <Route
                            exact={ true }
                            path={ MAIN_PAGE_ROUTE }
                            component={ PageMain }
                        />
                        <Route
                            path={ SUB_PAGE_ROUTE }
                            component={ PageSub }
                        />
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}
