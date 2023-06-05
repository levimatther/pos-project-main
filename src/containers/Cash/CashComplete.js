import React, {useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import * as Actions from '../../store/actions'
import {useHistory} from "react-router-dom";
import SvgCompleteSale from "../../Icons/CompleteSale";
import {useDispatch, useSelector} from "react-redux";
import clsx from "clsx";
import SvgPayInComplete from "../../Icons/PayInComplete";

const useStyles = makeStyles(theme => ({
    mainArea: {
        height: 'calc(100vh - 51px)',
        overflowY: 'auto'
    },
    inputArea: {
        height: 50
    },
    submitBtn: {
        height: 50,
        marginTop: 20,
        fontSize: 16
    }

}));
function CashComplete(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const reason = useSelector(state => state.cash.reason);
    const isPayIn = useSelector(state => state.cash.type) === 'payin';
    const supplier = useSelector(state => state.cash.supplier);
    function handleSubmit() {
        dispatch(Actions.setCashType('payout'));
        // history.push('/main/cash')
        props.handleConfirm();
    }

    return(
        <div className='checkoutBody'>
            <div className='height-50 borderBottomLight backgroundWhite flex flex-row justify-between align-center'>
                <Button
                    color='primary'
                    disabled
                    className={classes.openBtn} />
                <p className='p-0 m-0 color-41 fs-14'>
                    {isPayIn ? 'Pay-in complete' : 'Pay-out complete'}
                </p>
                <Button
                    color='primary'
                    disabled
                    className={classes.openBtn} />
            </div>
            <div className={classes.mainArea}>
                <div className='m-20 backgroundWhite borderRadius pb-20'>
                    <div className='pt-40 flex flex-col align-center'>
                        <p className={clsx(isPayIn ? 'color-primary' : 'color-pink', 'p-0 m-0 fs-36 fw-bold')}>
                            L£ 200,000
                        </p>
                        <div className='pt-50 pb-40 height-70'>
                            <SvgPayInComplete/>
                        </div>
                        {
                            supplier &&
                            <p className='pb-10 m-0 fs-16 fw-bold'>
                                {supplier}
                            </p>
                        }

                        <p className='p-0 m-0 fs-16 f-italic'>
                            {reason}
                        </p>
                        <p className='pt-80 m-0 fs-16'>
                            {isPayIn ? 'Enter amount in cash drawer' : 'Pay-out supplier from cash drawer'}
                        </p>
                    </div>
                    <div className='pl-20 pr-20 flex flex-col'>
                        <Button
                            fullWidth
                            className={classes.submitBtn}
                            variant='contained'
                            color='primary'
                            onClick={handleSubmit}
                            startIcon={<SvgCompleteSale/>}
                        >Complete</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CashComplete;
