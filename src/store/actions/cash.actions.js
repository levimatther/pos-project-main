export const SET_CASH_TYPE = 'SET_CASH_TYPE';
export const SET_CASH_REASON = 'SET_CASH_REASON';
export const CLEAR_CASH_SUPPLIER = 'CLEAR_CASH_SUPPLIER';
export const SET_CASH_SUPPLIER = 'SET_CASH_SUPPLIER';
export const SET_CASH = 'SET_CASH';

export function setCashType(data) {
    return dispatch => {
        dispatch(
            {
                type: SET_CASH_TYPE,
                data: data
            }
        )
    }
}

export function setCashReason(data) {
    return dispatch => {
        dispatch(
            {
                type: SET_CASH_REASON,
                data: data
            }
        )
    }
}
export function setCashSupplier(data) {
    return dispatch => {
        dispatch(
            {
                type: SET_CASH_SUPPLIER,
                data: data
            }
        )
    }
}

export function setCash(data) {
    return dispatch => {
        dispatch(
            {
                type: SET_CASH,
                data: data
            }
        )
    }
}
export function clearSupplier() {
    return dispatch => {
        dispatch(
            {
                type: CLEAR_CASH_SUPPLIER,
            }
        )
    }
}
