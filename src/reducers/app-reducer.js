import * as actionTypes from '../actions/types';

let initialState = {
    random: null
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SOME_ACTION_TYPE: {
            const random = Math.random();

            return Object.assign(
                {},
                { random }
            );
        }
        default: return state;
    }
}
