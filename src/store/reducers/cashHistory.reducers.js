import {CASH_HISTORY_UPDATE} from "../actions";

const initialState = {
    data : [
        {
            date: "Friday, June 26",
            transactions: [
                {
                    type: "payout",
                    time: "12:45 PM",
                    amount: "- L£ 252,500",
                    companyName: 'Supplier Company Name',
                    checked: false
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "This is for too long reasons sd fsdf sdf alsdkjf asldf kjasldfj asldfjalsdf jals;df jalsdjlasdjk flasjkd f",
                    checked: false
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "Reason for pay in will be italic",
                    checked: false
                },
            ]
        },
        {
            date: "Friday, June 25",
            transactions: [
                {
                    type: "payout",
                    time: "12:45 PM",
                    amount: "- L£ 252,500",
                    companyName: 'Supplier Company Name',
                    checked: false,
                    noSupplier: true
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "Reason for pay in will be italic",
                    checked: false
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "This is for too long reasons sd fsdf sdf alsdkjf asldf kjasldfj asldfjalsdf jals;df jalsdjlasdjk flasjkd f",
                    checked: false
                },
            ]
        },
        {
            date: "Friday, June 24",
            transactions: [
                {
                    type: "payout",
                    time: "12:45 PM",
                    amount: "- L£ 252,500",
                    companyName: 'Supplier Company Name',
                    checked: false
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "Reason for pay in will be italic",
                    checked: false
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "Reason for pay in will be italic",
                    checked: false
                },
            ]
        },
        {
            date: "Friday, June 23",
            transactions: [
                {
                    type: "payout",
                    time: "12:45 PM",
                    amount: "- L£ 252,500",
                    companyName: 'Supplier Company Name',
                    checked: false
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "This is for too long reasons sd fsdf sdf alsdkjf asldf kjasldfj asldfjalsdf jals;df jalsdjlasdjk flasjkd f",
                    checked: false
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "Reason for pay in will be italic",
                    checked: false
                },
            ]
        },
        {
            date: "Friday, June 22",
            transactions: [
                {
                    type: "payout",
                    time: "12:45 PM",
                    amount: "- L£ 252,500",
                    companyName: 'Supplier Company Name',
                    checked: false
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "Reason for pay in will be italic",
                    checked: false
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "Reason for pay in will be italic",
                    checked: false
                },
            ]
        },
        {
            date: "Friday, June 21",
            transactions: [
                {
                    type: "payout",
                    time: "12:45 PM",
                    amount: "- L£ 252,500",
                    companyName: 'Supplier Company Name',
                    checked: false
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "This is for too long reasons sd fsdf sdf alsdkjf asldf kjasldfj asldfjalsdf jals;df jalsdjlasdjk flasjkd f",
                    checked: false
                },
                {
                    type: "payin",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    reason: "Reason for pay in will be italic",
                    checked: false
                },
            ]
        },
    ]
};

const cashHistory = (state=initialState, action) => {
    switch (action.type) {
        case CASH_HISTORY_UPDATE:
        {
            let {data} = state;
            let {index} = action.data;
            let {transactionIndex} = action.data;
            let newCashHistory = data.map((item, iex) => {
                        let newTransactions = item.transactions.map((i, t) => {
                            return ({...i, checked: (iex === index && t === transactionIndex)})
                        });
                        return ({...item, transactions: [...newTransactions]})
                    });
            return ({...state, data: newCashHistory})
        }
        default:
            return state;
    }
};

export default cashHistory;
