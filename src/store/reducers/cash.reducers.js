import {
    CLEAR_CASH_SUPPLIER,
    SET_CASH,
    SET_CASH_REASON,
    SET_CASH_SUPPLIER,
    SET_CASH_TYPE
} from "../actions/cash.actions";

const initialState={
    type: 'payout',
    reason: '',
    supplier: null,
    data: {
        amount: "- L£ 252,500",
        checked: false,
        companyName: "Supplier Company Name",
        time: "12:45 PM",
        type: "payout"
    }
};


const cash = (state=initialState, action) => {
    switch (action.type) {
        case  SET_CASH_TYPE:
            return({...state, type: action.data});
        case SET_CASH_REASON:
            return ({...state, reason: action.data});
        case CLEAR_CASH_SUPPLIER:
            return ({...state, supplier: null});
        case SET_CASH_SUPPLIER:
            return ({...state, supplier: action.data});
        case SET_CASH:
            return ({...state, data: {...action.data}});
        default:
            return (state);
    }
};

export default cash;
