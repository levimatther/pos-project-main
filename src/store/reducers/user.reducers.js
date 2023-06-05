import {CLOCK_IN, CLOCK_OUT, LOGIN_ERROR, LOGIN_SUCCESS, LOGOUT_USER} from '../actions';
const initialState = {
    isLoggedIn : false,
    clockIn: false,
    data: {}
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return({...initialState, isLoggedIn: true, data: action.data});
        case LOGIN_ERROR:
            return ({...initialState, isLoggedIn: false});
        case CLOCK_IN:
            return ({...initialState, clockIn: true});
        case CLOCK_OUT:
            return ({...initialState, clockIn: false});
        case LOGOUT_USER:
            return ({...initialState, isLoggedIn: false});
        default:
            return state
    }
};

export default user;
