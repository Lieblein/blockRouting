import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { showConfirm } from '../../actions/confirm';
import { MAIN_PAGE_ROUTE, SUB_PAGE_ROUTE } from '../../constants/routes';
import Layout from '../Layout';
import PageMain from '../PageMain';
import PageSub from '../PageSub';

export class App extends React.Component {
    static propTypes = {
        showConfirm: PropTypes.func.isRequired
    };

    getUserConfirmation = (message, callback) => {
        const { showConfirm } = this.props;
    
        const goToNextPage = callback.bind(null, true);
        const blockRouting = callback.bind(null, false);
        showConfirm(goToNextPage, blockRouting);
    };    

    render() {
        return (
            <BrowserRouter
                basename='/'
                getUserConfirmation={ this.getUserConfirmation }
            >
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

export default connect(
    null,
    {
        showConfirm
    }
)(App);
