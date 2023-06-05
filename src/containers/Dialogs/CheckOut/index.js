import React, {useEffect, useState} from "react";
import {Dialog, Button, TextField, InputAdornment, Divider} from "@material-ui/core";
import TransitionLeft from "../Transitions/TransitionLeft";
import {makeStyles} from "@material-ui/core/styles";
import LeftSection from "./LeftSection";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import clsx from "clsx";
import {_transitionDuration} from "../../../constants";
import {CSSTransition} from "react-transition-group";
import CashComplete from "./CashComplete";
import CardComplete from "./CardComplete";
import VoucherComplete from "./VoucherComplete";
import PointsComplete from "./PointsComplete";
import SplitPayment from "./SplitPayment/SplitPayment";
import LBPInput from "../../../components/LBPInput";
import USDInput from "../../../components/USDInput";
import SvgCharge from "../../../Icons/Charge";
import SvgVoucher from "../../../Icons/Voucher";
import SvgPoints from "../../../Icons/Points";
import SvgCard from "../../../Icons/Card";
import CountUp from 'react-countup';
import SvgPayLater from "../../../Icons/PayLater";

const useStyles = makeStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.primary.backgroundColor,
        display: 'flex',
        flexDirection: 'row'
    },
    rightSection: {
        width: `calc(100vw - 268px)`,
        borderLeft: `1px solid ${theme.palette.primary.borderColor}`,
        color: theme.palette.primary.headerColor
    },
    primaryBtn: {
        minWidth: 55,
        width: 55,
        height: 34,
        backgroundColor: theme.palette.primary.main
    },
    chargeBtn: {
        height: 48,
        paddingRight: 10
    },
    disabledBtn: {
        minWidth: 55,
        width: 55,
        height: 34,
        backgroundColor: theme.palette.primary.disabled
    },
    lbpBtn: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    },
    usdBtn: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    },
    marginRight10: {
        marginRight: 10
    },
    inputAreaRoot: {
        height: 40
    },
    inputArea: {
        paddingRight: 10
    },
    dividerRoot: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: theme.palette.primary.headerColor
    }
}));

function CheckoutDialog(props) {
    const classes = useStyles();
    const [isLbp, setIsLbp] = useState(true);
    const [amount, setAmount] = useState(3500);
    const [amountUsd, setAmountUsd] = useState('19.45');
    const [complete, setComplete] = useState(false);
    const [completeCard, setCompleteCard] = useState(false);
    const [completeVoucher, setCompleteVoucher] = useState(false);
    const [completePoints, setCompletePoints] = useState(false);
    const [remainAmount, setRemainAmount] = useState(false);
    const [remainQuantity, setRemainQuantity] = useState(0);
    const [splitPayment, setSplitPayment] = useState(false);

    useEffect(() => {
        setIsLbp(true);
        setRemainAmount(false);
        setAmount(3500);
        setAmountUsd('19.45')
    }, [props]);
    function charge(amount) {
        if (isLbp) {
            setAmount(amount);
        } else {
            setAmountUsd(amount);
        }
        setComplete(prevState => {
            return !prevState;
        })
    }

    function checkIfCharge() {
        if (isLbp) {
            return Number(amount) < 3500;
        } else {
            return Number(amountUsd) < 19.45;
        }

    }

    function handleRemain(amount) {
        setCompleteVoucher(false);
        setCompletePoints(false);
        setRemainAmount(true);
        setRemainQuantity(amount)
    }

    function handleComplete() {
        setCompleteCard(false);
        setComplete(false);
        setSplitPayment(false);
        props.handleConfirm();
    }

    return (
        <Dialog open={props.open} fullScreen TransitionComponent={TransitionLeft}
                transitionDuration={_transitionDuration} classes={{paper: classes.paper}}>
            <VoucherComplete open={completeVoucher}
                             handleConfirm={() => {
                                 setCompleteVoucher(false);
                                 setRemainAmount(false);
                                 setComplete(true)
                             }}
                             handleRemain={(amount) => handleRemain(amount)}
                             handleCancel={() => setCompleteVoucher(false)}
            />
            <PointsComplete open={completePoints}
                            handleConfirm={() => {
                                setCompletePoints(false);
                                setRemainAmount(false);
                                setComplete(true)
                            }}
                            handleRemain={(amount) => handleRemain(amount)}
                            handleCancel={() => setCompletePoints(false)}
            />
            <LeftSection checkout={props.data} customerDetail={props.customerDetail} isTakeAway={props.isTakeAway}/>
            <div className={classes.rightSection}>
                <div className='position-relative fullHeight' style={{overflow: 'hidden'}}>
                    <div>
                        <div
                            className='height-50 borderBottomLight flex flex-row justify-between align-center pl-10 pr-10 backgroundWhite'>
                            <Button
                                startIcon={<ArrowLeftIcon/>}
                                color='primary'
                                onClick={props.handleCancel}
                            >Back</Button>
                            <div className='flex flex-row'>
                                <Button
                                    onClick={() => setIsLbp(true)} variant='contained' color='primary'
                                    className={clsx(classes.lbpBtn, isLbp ? classes.primaryBtn : classes.disabledBtn)}
                                >L£</Button>
                                <Button
                                    onClick={() => setIsLbp(false)} variant='contained' color='primary'
                                    className={clsx(classes.usdBtn, !isLbp ? classes.primaryBtn : classes.disabledBtn)}
                                >$</Button>
                            </div>
                            <Button
                                color='primary'
                                onClick={() => setSplitPayment(true)}
                                disabled={!props.isTakeAway}
                            >{props.isTakeAway ? 'Split' : ''}</Button>
                        </div>
                        {
                            !remainAmount && <div className='pt-55 flex justify-content align-center'>
                                <div className='flex flex-row justify-content align-center'>
                                    <p className={clsx(!isLbp ? 'color-light' : 'color-light-black', 'p-0 m-0 fs-36 fw-bold width-200 text-right')}>
                                        L£ 3,500
                                    </p>
                                    <Divider orientation='vertical' classes={{root: classes.dividerRoot}} />
                                    <p className={clsx(isLbp ? 'color-light' : 'color-light-black', 'p-0 m-0 fs-36 fw-bold width-200')}>
                                        $ 19.45
                                    </p>
                                </div>
                            </div>
                        }

                        {
                            remainAmount && <div className='pt-55 flex justify-content align-center'>
                                <div className='flex flex-row justify-content align-center'>
                                    <p className={clsx(!isLbp ? 'color-light' : 'color-light-black', 'p-0 m-0 fs-36 fw-bold width-200 text-right')}>
                                        <CountUp end={remainQuantity} start={3500}/>&nbsp;
                                    </p>
                                    <Divider orientation='vertical' classes={{root: classes.dividerRoot}} />
                                    <p className={clsx(isLbp ? 'color-light' : 'color-light-black', 'p-0 m-0 fs-36 fw-bold width-200')}>
                                        $ 19.45
                                    </p>
                                </div>
                            </div>
                        }
                        <div className='pt-5 flex align-center justify-content'>
                            <p className='p-0 m-0 fs-12'>{!remainAmount ? 'Total amount due' : 'Remaining amount due'}</p>
                        </div>
                        {
                            props.isTakeAway ? <div>
                                    <div className='pt-60 pl-20 pr-20'>
                                        <p className='p-0 m-0 fs-14'>
                                            Cash received
                                        </p>
                                        <div className='flex flex-row pt-10'>
                                            {
                                                isLbp ?
                                                    <LBPInput
                                                        autoFocus={true}
                                                        fullWidth={true}
                                                        value={amount}
                                                        variant='outlined'
                                                        className={classes.inputArea}
                                                        InputProps={{
                                                            classes: {root: classes.inputAreaRoot},
                                                        }}
                                                        onChange={(data) => setAmount(data)}
                                                    />
                                                    :
                                                    <USDInput
                                                        autoFocus={true}
                                                        fullWidth={true}
                                                        value={amountUsd}
                                                        variant='outlined'
                                                        className={classes.inputArea}
                                                        InputProps={{
                                                            classes: {root: classes.inputAreaRoot},
                                                        }}
                                                        onChange={(data) => setAmountUsd(data)}
                                                    />
                                            }
                                            <Button
                                                startIcon={<SvgCharge/>}
                                                color='primary'
                                                variant='contained'
                                                fullWidth
                                                disabled={checkIfCharge()}
                                                onClick={() => {
                                                    if (isLbp) {
                                                        charge(amount)
                                                    } else {
                                                        charge(amountUsd)
                                                    }
                                                }}
                                            >Charge</Button>
                                        </div>
                                    </div>
                                    {
                                        isLbp ? <div className='pt-30 flex flex-row pl-20 pr-20'>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    classes={{root: classes.marginRight10}}
                                                    onClick={() => charge(4000)}
                                                >L£ 4,000</Button>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    classes={{root: classes.marginRight10}}
                                                    onClick={() => charge(5000)}
                                                >L£ 5,000</Button>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    classes={{root: classes.marginRight10}}
                                                    onClick={() => charge(10000)}
                                                >L£ 10,000</Button>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    classes={{root: classes.marginRight10}}
                                                    onClick={() => charge(20000)}
                                                >L£ 20,000</Button>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    classes={{root: classes.marginRight10}}
                                                    onClick={() => charge(50000)}
                                                >L£ 50,000</Button>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    onClick={() => charge(100000)}
                                                >L£ 100,000</Button>
                                            </div> :
                                            <div className='pt-30 flex flex-row pl-20 pr-20'>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    classes={{root: classes.marginRight10}}
                                                    onClick={() => charge('20.00')}
                                                >$ 20.00</Button>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    classes={{root: classes.marginRight10}}
                                                    onClick={() => charge('50.00')}
                                                >$ 50.00</Button>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    onClick={() => charge('100.00')}
                                                >$ 100.00</Button>
                                            </div>
                                    }
                                    {
                                        isLbp ? <div className='pt-60 flex flex-row pl-20 pr-20'>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    classes={{root: classes.marginRight10}}
                                                    onClick={() => setCompleteCard(true)}
                                                    startIcon={<SvgCard/>}
                                                >Card (L£ 3,500)</Button>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    classes={{root: classes.marginRight10}}
                                                    onClick={() => setCompleteVoucher(true)}
                                                    startIcon={<SvgVoucher/>}
                                                >Voucher </Button>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    onClick={() => setCompletePoints(true)}
                                                    startIcon={<SvgPoints/>}
                                                >Points (1,000)</Button>
                                            </div> :
                                            <div className='pt-60 flex flex-row pl-20 pr-20'>
                                                <Button
                                                    className={classes.chargeBtn}
                                                    variant='contained'
                                                    color='primary'
                                                    fullWidth
                                                    onClick={() => setCompleteCard(true)}
                                                    startIcon={<SvgCard/>}
                                                >Card (L£ 19.45)</Button>
                                            </div>
                                    }
                                </div> :
                                <div>
                                    <div className='pt-80 pl-20 pr-20'>
                                        <Button
                                            startIcon={<SvgPayLater/>}
                                            color='primary'
                                            variant='contained'
                                            className={classes.chargeBtn}
                                            fullWidth
                                            onClick={() => {
                                               props.handleConfirm()
                                            }}
                                        >Pay later</Button>
                                    </div>
                                    <div className='pt-80 pl-20 pr-20 flex flex-row align-center'>
                                        <hr className='customHorizontal fullWidth' />
                                        <p className='pl-20 pr-20 m-0 color-light width-120 text-center fs-12'>Provide change</p>
                                        <hr className='customHorizontal fullWidth' />
                                    </div>
                                    <div className='flex flex-row pl-20 pr-20 pt-40'>
                                        <Button
                                            className={classes.chargeBtn}
                                            variant='contained'
                                            color='primary'
                                            fullWidth
                                            classes={{root: classes.marginRight10}}
                                        >L£ 20,000</Button>
                                        <Button
                                            className={classes.chargeBtn}
                                            variant='contained'
                                            color='primary'
                                            fullWidth
                                            classes={{root: classes.marginRight10}}
                                        >L£ 50,000</Button>
                                        <Button
                                            className={classes.chargeBtn}
                                            variant='contained'
                                            color='primary'
                                            fullWidth
                                        >L£ 100,000</Button>
                                    </div>
                                </div>
                        }


                    </div>
                    <CSSTransition
                        in={complete}
                        classNames="checkOutSlideSection"
                        timeout={_transitionDuration}
                    >
                        <CashComplete isLbp={isLbp} data={isLbp ? amount : amountUsd}
                                      handleConfirm={() => handleComplete()}/>
                    </CSSTransition>
                    <CSSTransition
                        in={completeCard}
                        classNames="checkOutSlideSection"
                        timeout={_transitionDuration}
                    >
                        <CardComplete isLbp={isLbp} handleConfirm={() => handleComplete()}/>
                    </CSSTransition>
                    <CSSTransition
                        in={splitPayment}
                        classNames="checkOutSlideSection"
                        timeout={_transitionDuration}
                    >
                        <SplitPayment handleCancel={() => setSplitPayment(false)} handleConfirm={handleComplete}/>
                    </CSSTransition>
                </div>
            </div>
        </Dialog>
    )
}

export default CheckoutDialog;
