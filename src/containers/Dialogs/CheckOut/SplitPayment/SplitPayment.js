import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton, Select, MenuItem, FormControl, OutlinedInput, Button, Divider} from "@material-ui/core";
import SvgPlus from "../../../../Icons/Plus";
import SvgClose from "../../../../Icons/Close";
import LBPInput from "../../../../components/LBPInput";
import clsx from "clsx";
import USDInput from "../../../../components/USDInput";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import {CSSTransition} from "react-transition-group";
import {_transitionDuration} from "../../../../constants";
import SplitPaymentStep2 from "./SplitPaymentStep2";
import CashComplete from "../CashComplete";
import SplitPaymentStep3 from "./SplitPaymentStep3";
import index from "../../../../store/reducers";
import SplitPaymentCard from "./SplitPaymentCard";
import SvgPaid from "../../../../Icons/Paid";
import SvgMinus from "../../../../Icons/Minus";
import CountUp from "react-countup";
import SvgPlusSmall from "../../../../Icons/PlusSmall";


const useStyles = makeStyles(theme => ({
    inputAreaRoot: {
        height: 48,
    },
    inputArea: {
        paddingRight: 10
    },
    currencySelect: {
        height: 48,
        marginTop: 2
    },
    chargeBtn: {
        height: 48
    },
    column1: {
        flexBasis: '15%',
        paddingRight: 10
    },
    column2: {
        flexBasis: '55%',
        paddingRight: 10
    },
    column3: {
        flexBasis: '15%',
    },
    amountBtn: {
        width: 48,
        height: 48,
        border: `1px solid ${theme.palette.primary.main}`
    },
    step1Height: {
        height: 'calc(100vh - 51px)'
    },
    dividerRoot: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: theme.palette.primary.headerColor
    },
    whiteBtn: {
        backgroundColor: 'white'
    }
}));

function SplitPayment(props) {
    const classes = useStyles();
    const [amount, setAmount] = useState(2);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const [card, setCard] = useState(false);
    const [isLbp, setIsLbp] = useState(true);
    const [indexItem, setIndexItem] = useState(0);
    const [purchaseAmount, setPurchaseAmount] = useState(3500);
    const [payments, setPayments] = useState([
        {
            currency: "lbp",
            type: "cash",
            amount: 1750,
            isPaid: false
        },
        {
            currency: "lbp",
            type: "cash",
            amount: 1750,
            isPaid: false
        }
    ]);

    function checkIfMinus() {
        return amount === 2;
    }

    function checkIfPlus() {
        return amount === 4;
    }

    function handleMinus() {
        let paymentNumber = amount - 1;
        let newAmount = Math.floor(3500/paymentNumber);
        setAmount(prevState => {
            return prevState - 1
        });
        setPayments(prevState => {
            let newPrevState = prevState.map((item) => {
                return({...item, amount: newAmount})
            });
            return ([...newPrevState.slice(0, -1)])
        })
    }

    function handlePlus() {
        let paymentNumber = amount + 1;
        let newAmount = Math.floor(3500/paymentNumber);
        setAmount(prevState => {
            return prevState + 1
        });
        setPayments(prevState => {
            let newPrevState = prevState.map((item) => {
               return({...item, amount: newAmount})
            });
            return ([...newPrevState, {
                currency: "lbp",
                type: "cash",
                amount: newAmount,
                isPaid: false
            }])
        })
    }

    function handleChange(data, type, index) {
        setPayments(prevState => {
            let item = prevState[index];
            item[type] = data;
            if (type === 'currency') {
                item.type = 'cash';
                if (data === 'lbp') {
                    item.amount = 1750
                } else {
                    item.amount = 9.45
                }
            }
            return ([...prevState.slice(0, index), item, ...prevState.slice(index + 1)])
        })
    }

    function handleBack() {
        if (step2) {
            setStep2(false);
        } else {
            props.handleCancel();
            setStep2(false);
        }
    }

    function charge(index) {
        setIndexItem(index);
        if (payments[index].currency === 'lbp') {
            setIsLbp(true);
            if (payments[index].type === 'card') {
                setCard(true);
            } else {
                setStep2(true);
            }
        } else {
            setIsLbp(false);
            if (payments[index].type === 'card') {
                setCard(true);
            } else {
                setStep2(true)
            }
        }
    }

    function chargePayment(s) {
        setPurchaseAmount(s);
        setStep3(true);
    }

    function handleConfirmStep3() {
        if (checkIfLast()) {
            props.handleConfirm();
        }
        setPayments(prevState => {
            let item = prevState[indexItem];
            item.isPaid = true;
            return ([...prevState.slice(0, indexItem), item, ...prevState.slice(indexItem + 1)])
        });
        setStep3(false);
        setStep2(false);
    }

    function handleConfirmCard() {
        if (checkIfLast()) {
            props.handleConfirm();
        }
        setPayments(prevState => {
            let item = prevState[indexItem];
            item.isPaid = true;
            return ([...prevState.slice(0, indexItem), item, ...prevState.slice(indexItem + 1)])
        });
        setCard(false);
    }

    function checkIfLast() {
        let uncheckedPayments = payments.filter((item, index) => {
            return !item.isPaid
        });
        return uncheckedPayments.length <= 1;
    }
    function checkIfFirst() {
        let checkedPayments = payments.filter((item, index) => {
            return item.isPaid
        });
        return checkedPayments.length < 1;
    }
    return (
        <div className='checkoutBody'>
            <div className='position-relative fullHeight'>
                <div
                    className='height-50 borderBottomLight flex flex-row justify-between align-center pl-10 pr-10 backgroundWhite'>
                    <Button
                        startIcon={<ArrowLeftIcon/>}
                        color='primary'
                        onClick={handleBack}
                    >Back</Button>
                    <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Split payment</p>
                    <Button
                        color='primary'
                        disabled
                    />
                </div>
                <div className={clsx('position-relative', classes.step1Height)}
                     style={{overflowX: 'hidden', overflowY: 'auto'}}>
                    <div className='pt-65 flex flex-col justify-content align-center'>
                        {
                            checkIfFirst() ?  <div className='flex flex-row justify-content align-center'>
                                <p className='p-0 m-0 fs-36 fw-bold width-200 text-right'>L£ 3,500</p>
                                <Divider orientation='vertical' classes={{root: classes.dividerRoot}}/>
                                <p className='p-0 m-0 fs-36 fw-bold width-200'>$ 19.45</p>
                            </div>
                                : <div className='flex flex-row justify-content align-center'>
                                    <p className='p-0 m-0 fs-36 fw-bold width-200 text-right'>
                                        <CountUp end={1750} start={3500} duration={1}
                                        decimal="." prefix="L£ " separator=","
                                        />
                                    </p>
                                    <Divider orientation='vertical' classes={{root: classes.dividerRoot}}/>
                                    <p className='p-0 m-0 fs-36 fw-bold width-200'>
                                        <CountUp end={9.73} start={19.45} duration={1}
                                        decimals={2} decimal="." prefix="$ " separator=","/>
                                    </p>
                                </div>
                        }

                        <p className='pt-10 m-0 fs-12'>{checkIfFirst() ? 'Total amount due' : 'Remaining amount'}</p>
                    </div>
                    <div className='pt-50 flex flex-row justify-content'>
                        <IconButton
                            className={classes.amountBtn}
                            onClick={() => handleMinus()}
                            disabled={checkIfMinus()}
                        >
                            <SvgMinus/>
                        </IconButton>
                        <p className='p-0 m-auto-0 width-80 text-center fs-32'>{amount}</p>
                        <IconButton
                            className={classes.amountBtn}
                            onClick={() => handlePlus()}
                            disabled={checkIfPlus()}
                        >
                           <SvgPlusSmall/>
                        </IconButton>
                    </div>
                    <div className='flex justify-content pb-35'>
                        <p className='pt-10 m-0 fs-12'>Payments</p>
                    </div>
                    {
                        payments.map((item, index) => (
                            <div className='pt-20 flex flex-row pl-20 pr-20' key={index}>
                                <div className={classes.column1}>
                                    <p className={clsx('pt-5 pb-5 m-0 fs-14', item.isPaid ? 'color-light' : 'color-light-black')}>
                                        Currency
                                    </p>
                                    <FormControl
                                        fullWidth
                                        variant='outlined'
                                        margin='dense'
                                        disabled={item.isPaid}
                                    >
                                        <Select
                                            value={item.currency}
                                            onChange={(e) => (handleChange(e.target.value, 'currency', index))}
                                            input={<OutlinedInput classes={{root: classes.currencySelect}}/>}
                                        >
                                            <MenuItem value={"lbp"}>LBP (L£)</MenuItem>
                                            <MenuItem value={"usd"}>USD ($)</MenuItem>
                                        </Select>
                                    </FormControl>

                                </div>
                                <div className={classes.column1}>
                                    <p className={clsx('pt-5 pb-5 m-0 fs-14', item.isPaid ? 'color-light' : 'color-light-black')}>
                                        Payment type
                                    </p>
                                    <FormControl
                                        fullWidth
                                        variant='outlined'
                                        margin='dense'
                                        disabled={item.isPaid}
                                    >
                                        {
                                            item.currency === "lbp" ?
                                                <Select
                                                    value={item.type}
                                                    input={<OutlinedInput classes={{root: classes.currencySelect}}/>}
                                                    onChange={(e) => (handleChange(e.target.value, 'type', index))}
                                                >
                                                    <MenuItem value={'cash'}>Cash</MenuItem>
                                                    <MenuItem value={'card'}>Card</MenuItem>
                                                    <MenuItem value={'voucher'}>Voucher</MenuItem>
                                                    <MenuItem value={'points'}>Points</MenuItem>
                                                </Select> :
                                                <Select
                                                    value={item.type}
                                                    input={<OutlinedInput classes={{root: classes.currencySelect}}/>}
                                                    onChange={(e) => (handleChange(e.target.value, 'type', index))}
                                                >
                                                    <MenuItem value={'cash'}>Cash</MenuItem>
                                                    <MenuItem value={'card'}>Card</MenuItem>
                                                </Select>
                                        }

                                    </FormControl>
                                </div>
                                <div className={classes.column2}>
                                    <p className={clsx('pt-5 pb-15 m-0 fs-14', item.isPaid ? 'color-light' : 'color-light-black')}>
                                        Amount
                                    </p>
                                    {
                                        item.currency === "lbp" ?
                                            <LBPInput
                                                fullWidth
                                                variant='outlined'
                                                value={item.amount}
                                                InputProps={{
                                                    classes: {root: classes.inputAreaRoot},
                                                }}
                                                disabled={item.isPaid}
                                                onChange={(data) => handleChange(data, 'amount', index)}
                                            /> :
                                            <USDInput
                                                fullWidth
                                                variant='outlined'
                                                value={item.amount}
                                                InputProps={{
                                                    classes: {root: classes.inputAreaRoot},
                                                }}
                                                disabled={item.isPaid}
                                                onChange={(data) => handleChange(data, 'amount', index)}
                                            />
                                    }
                                </div>
                                <div className={clsx('flex align-end pb-5', classes.column3)}>
                                    {
                                        item.isPaid ? <Button
                                            color='primary'
                                            variant='outlined'
                                            fullWidth
                                            className={clsx(classes.chargeBtn, classes.whiteBtn)}
                                            startIcon={<SvgPaid/>}
                                        >Paid</Button> : <Button
                                            color='primary'
                                            variant={'contained'}
                                            fullWidth
                                            onClick={() => charge(index)}
                                            className={classes.chargeBtn}
                                        >Charge</Button>
                                    }
                                </div>
                            </div>
                        ))
                    }
                    <CSSTransition
                        in={step2}
                        classNames="checkOutSlideSection"
                        timeout={_transitionDuration}
                    >
                        <SplitPaymentStep2 autoFocus={step2} isLbp={isLbp} charge={chargePayment}/>
                    </CSSTransition>
                </div>
                <CSSTransition
                    in={step3}
                    classNames="checkOutSlideSection"
                    timeout={_transitionDuration}
                >
                    <SplitPaymentStep3 isLast={checkIfLast()} isLbp={isLbp} data={purchaseAmount}
                                       handleConfirm={() => handleConfirmStep3()}/>
                </CSSTransition>
                <CSSTransition
                    in={card}
                    classNames="checkOutSlideSection"
                    timeout={_transitionDuration}
                >
                    <SplitPaymentCard isLast={checkIfLast()} isLbp={isLbp} handleConfirm={() => handleConfirmCard()}/>
                </CSSTransition>
            </div>

        </div>
    )
}

export default SplitPayment;
