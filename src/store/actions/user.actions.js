import authService from '../../services'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CLOCK_IN = 'CLOCK_IN';
export const CLOCK_OUT = 'CLOCK_OUT';
export const LOGOUT_USER = 'LOGOUT_USER';

export const login = (data) => {
    return dispatch => {
        authService.signInWithPin
            .then((user) => {
                return dispatch({
                    type: LOGIN_SUCCESS,
                    data: user
                })
            })
            .catch(e => {
                return dispatch({
                    type: LOGIN_ERROR
                })
            })
    }
};

export const clockIn = () => {
    return dispatch => {
        return dispatch({
            type: CLOCK_IN
        })
    }
};

export const clockOut = () => {
    return dispatch => {
        return dispatch({
            type: CLOCK_OUT
        })
    }
};

export function logout() {
    return dispatch => {
        return dispatch({
            type: LOGOUT_USER
        })
    }
}

