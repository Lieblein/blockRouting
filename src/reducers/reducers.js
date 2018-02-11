import { combineReducers } from 'redux';

import appReducer from './app-reducer';

const reducers = {
    app: appReducer
};

export default combineReducers(reducers);
