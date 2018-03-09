import { CONFIRM_SHOW, CONFIRM_HIDE } from '../constants/actions';

const initialState = {
    visible: false,
    goToNextPage: () => {},
    blockRouting: () => {}
};

export default function cofirmReducer(state = initialState, action) {
    switch (action.type) {
        case CONFIRM_SHOW: {
            const { goToNextPage, blockRouting } = action;
            return {
                ...state,
                visible: true,
                goToNextPage,
                blockRouting
            };
        }

        case CONFIRM_HIDE: 
            return initialState;

        default:
            return state;
    }
}
