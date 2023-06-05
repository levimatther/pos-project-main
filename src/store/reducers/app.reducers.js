import {CLOSE_SHIFT_DIALOG, NAB_CLOSE, NAB_OPEN, OPEN_SHIFT_DIALOG, SET_LANGUAGE, SET_SHIFT_CLOSE} from "../actions";

const initialState = {
    language: 'en',
    navOpen: false,
    shiftOpen: true,
    shiftDialog: false,
};

const app = (state = initialState, action) => {
    switch (action.type) {
        case NAB_OPEN:
            return {...state, navOpen: true};
        case NAB_CLOSE:
            return {...state, navOpen: false};
        case SET_LANGUAGE:
            return {...state, language: action.data};
        case SET_SHIFT_CLOSE:
            return {...state, shiftOpen: false};
        case CLOSE_SHIFT_DIALOG:
            return {...state, shiftDialog: false};
        case OPEN_SHIFT_DIALOG:
            return {...state, shiftDialog: true};
        default:
            return state;
    }
};

export default app;
