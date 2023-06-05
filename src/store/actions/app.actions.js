export const NAB_OPEN = 'NAB_OPEN';
export const NAB_CLOSE = 'NAB_CLOSE';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_SHIFT_CLOSE = 'SET_SHIFT_CLOSE';
export const CLOSE_SHIFT_DIALOG = 'CLOSE_SHIFT_DIALOG';
export const OPEN_SHIFT_DIALOG = 'OPEN_SHIFT_DIALOG';

export function openNab() {
    return dispatch => {
        return dispatch({
            type: NAB_OPEN
        })
    };
}
export function closeNav() {
    return dispatch => {
        return dispatch({
            type: NAB_CLOSE
        })
    };
}
export function closeShift() {
    return dispatch => {
        return dispatch({
            type: SET_SHIFT_CLOSE
        })
    };
}

export function language(data) {
    return dispatch => {
        return dispatch({
            type: SET_LANGUAGE,
            data: data
        })
    }
}

export function closeShiftDialog() {
    return dispatch => {
        dispatch({
            type: CLOSE_SHIFT_DIALOG
        })
    }
}

export function openShiftDialog() {
    return dispatch => {
        dispatch({
            type: OPEN_SHIFT_DIALOG
        })
    }
}
