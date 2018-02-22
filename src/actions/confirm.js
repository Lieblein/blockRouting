import { CONFIRM_SHOW, CONFIRM_HIDE } from '../constants/actions';

export function showConfirm(goToNextPage, blockRouting) {
    return (dispatch) => {
        dispatch({ type: CONFIRM_SHOW, goToNextPage, blockRouting });
    };
}

export function hideConfirm() {
    return (dispatch) => {
        dispatch({ type: CONFIRM_HIDE });
    };
}
