export const CASH_HISTORY_UPDATE= 'CASH_HISTORY_UPDATE';

export function updateCashHistory(index, transactionIndex) {
    return dispatch => {
        dispatch({
            type: CASH_HISTORY_UPDATE,
            data: {
                index: index,
                transactionIndex: transactionIndex
            }
        })
    }
}
