import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, IconButton} from "@material-ui/core";
import clsx from "clsx";
import LBPInput from "../../components/LBPInput";
import NumPadComponent from "../../components/NumPadComponent";
import {useDispatch, useSelector} from "react-redux";
import * as Actions from '../../store/actions'
import {useHistory} from "react-router-dom";
import MinusLBPInput from "../../components/MinusLbpInput";
import {setCashReason} from "../../store/actions";
import {CSSTransition} from "react-transition-group";
import {_transitionDuration} from "../../constants";
import PurchaseDetailModalDialog from "../Dialogs/purchase/PurchaseDetailModalDialog";
import CashReason from "./CashReason";
import CashComplete from "./CashComplete";
import CashDetail from "./CashDetail";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        overflow: 'hidden',
        width: 'calc(100vw - 269px)',
        position: 'relative',
        color: theme.palette.primary.headerColor
    },
    mainArea: {
        height: 'calc(100vh - 51px)',
        overflowY: 'auto'
    },
    payoutBtn: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        width: 120,
        height: 40,
        '&:hover': {
            backgroundColor: '#FF7781',
        }
    },
    payinBtn: {
        width: 120,
        height: 40,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    primaryBtn: {
        backgroundColor: theme.palette.primary.main
    },
    disabledBtn: {
        backgroundColor: theme.palette.primary.disabled
    },
    dangerBtn: {
        backgroundColor: theme.palette.primary.danger
    },
    disableDangerBtn: {
        backgroundColor: theme.palette.primary.dangerDisabled
    },
    inputAreaRoot: {
        width: 240,
        height: 50,
        fontSize: 36
    },
    confirmBtn: {
        width: 240,
        height: 60,
        fontSize: 28,
        '&:disabled': {
            color: 'white !important'
        },
    },
    payoutConfirmBtn: {
        width: 240,
        height: 60,
        fontSize: 28,
        backgroundColor: theme.palette.primary.danger,
        '&:disabled': {
            backgroundColor: theme.palette.primary.dangerDisabled,
            color: 'white !important'
        },
        '&:hover': {
            backgroundColor: '#FF7781',
        }
    }
}));

function CashRightSection(props) {
    const classes = useStyles();
    const diapatch = useDispatch();
    const isPayIn = useSelector(state => state.cash.type) === 'payin';
    const [reason, setReason] = useState(false);
    const [complete, setComplete] = useState(false);
    const {showDetail} = props;
    function setCashType(data) {
        diapatch(Actions.setCashType(data))
    }
    const [amount, setAmount] = useState('0');
    function handleInput(data) {
        if (data !== '=') {
            setAmount(prevState => {
                if (prevState !== '0') {
                    return prevState + data
                } else {
                    return data
                }
            })
        } else {
            setAmount(
                prevState => {
                    if (prevState === '0') {
                        return prevState
                    } else {
                       return prevState.slice(0, -1)
                    }
                }
            )
        }
    }

    function checkIfDisable() {
        return (amount === '' || amount === '0')
    }

    function handlePayIn() {
        // history.push('/main/cash/reason')
        setReason(true);
    }

    function handleConfirm() {
        setComplete(false);
        setReason(false);
        setAmount('0')
    }

    return (
        <div className={clsx(classes.root, 'position-relative')}>
            <div className='height-50 borderBottomLight backgroundWhite flex flex-row justify-content align-center'>
                <p className='p-0 m-0 color-41 fs-14'>
                    {isPayIn ? 'Pay-in amount' : 'Pay-out amount'}
                </p>
            </div>
            <div className={classes.mainArea}>
                <div className='pt-20 flex flex-row justify-content align-center'>
                    <Button
                        onClick={() => setCashType('payin')} variant='contained' color='primary'
                        className={clsx(isPayIn ? classes.primaryBtn : classes.disabledBtn, classes.payinBtn)}
                    >Pay-in</Button>
                    <Button
                        onClick={() => setCashType('payout')} variant='contained' color='primary'
                        className={clsx(!isPayIn ? classes.dangerBtn : classes.disableDangerBtn, classes.payoutBtn)}
                    >Pay-out</Button>
                </div>
                <div className='pt-20 flex flex-row justify-content'>
                    <p className='p-0 m-0 color-91 fs-24'>{isPayIn ? 'Pay-in amount' : 'Pay-out amount'}</p>
                </div>
                <div className='pt-10 flex flex-row justify-content'>
                    {
                        isPayIn ? <LBPInput
                            value={amount}
                            onChange={(e) => setAmount(e)}
                            variant='outlined'
                            InputProps={{
                                classes: {root: classes.inputAreaRoot},
                            }}
                            inputProps={{style: {marginBottom: '2px'}}}
                        />
                        :<MinusLBPInput
                                value={amount}
                                onChange={(e) => setAmount(e)}
                                variant='outlined'
                                InputProps={{
                                    classes: {root: classes.inputAreaRoot},
                                }}
                                inputProps={{style: {marginBottom: '2px'}}}
                            />
                    }
                </div>
                <div className='pt-40 flex flex-row justify-content'>
                    <NumPadComponent onClick={handleInput} disabled={checkIfDisable()}/>
                </div>
                <div className='pt-20 flex flex-row justify-content'>
                    {
                        isPayIn ?<Button onClick={handlePayIn} className={classes.confirmBtn} color='primary' variant='contained' disabled={checkIfDisable()}>Pay-in</Button>
                        : <Button onClick={handlePayIn} className={classes.payoutConfirmBtn} color='primary' variant='contained' disabled={checkIfDisable()}>Pay-out</Button>
                    }
                </div>
            </div>
            <CSSTransition
                in={reason}
                classNames="checkOutSlideSection"
                timeout={_transitionDuration}
            >
                <CashReason handleCancel={() => setReason(false)} handleConfirm={() => setComplete(true)}/>
            </CSSTransition>
            <CSSTransition
                in={complete}
                classNames="checkOutSlideSection"
                timeout={_transitionDuration}
            >
                <CashComplete handleConfirm={() => handleConfirm()}/>
            </CSSTransition>
            <CSSTransition
                in={showDetail}
                classNames="checkOutSlideSection"
                timeout={_transitionDuration}
            >
                <CashDetail handleCancel={props.handleCancel}/>
            </CSSTransition>
        </div>
    )
}

export default CashRightSection;
