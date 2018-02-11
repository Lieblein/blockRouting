import * as actionTypes from './types';

export function someActionCreator(payload) {
    return {
        type: actionTypes.SOME_ACTION_TYPE,
        payload
    };
}
