import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import LBPInput from "../../../../components/LBPInput";
import USDInput from "../../../../components/USDInput";
import {Button, TextField} from "@material-ui/core";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import {makeStyles} from "@material-ui/core/styles";
import SvgCharge from "../../../../Icons/Charge";

const useStyles = makeStyles(theme => ({
    chargeBtn: {
        height: 48,
        paddingRight: 10
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
}));

function SplitPaymentStep2(props) {
    const classes = useStyles();
    const {autoFocus} = props;
    const isLbp = props.isLbp;
    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                if (isLbp) {
                    inputRef1.current.focus();
                } else {
                    inputRef2.current.focus();
                }

            }, 300)
        }
    }, [props]);
    const [amount, setAmount] = useState(3500);
    const [amountUsd, setAmountUsd] = useState('19.45');
    const inputRef1 = useRef();
    const inputRef2 = useRef();

    function charge(s) {
        props.charge(s);
    }

    function checkIfCharge() {
        if (isLbp) {
            return amount >= 3500;
        } else {
            return Number(amountUsd) >= 19.04;
        }
    }

    return (
        <div className='checkoutBody'>
            <div className='pt-55 flex justify-content align-center'>
                <p className='p-0 m-0 fs-36 fw-bold'>{isLbp ? 'L£ 3,500' : '$ 19.45'}
                </p>
            </div>
            <div className='pt-5 flex align-center justify-content'>
                <p className='p-0 m-0 fs-12'>{'Amount due'}</p>
            </div>
            <div className='pt-60 pl-20 pr-20'>
                <p className='p-0 m-0 fs-14'>
                    Cash received
                </p>
                <div className='flex flex-row pt-10 fullWidth'>
                    {
                        isLbp ?
                            <LBPInput
                                fullWidth={true}
                                value={amount}
                                variant='outlined'
                                className={classes.inputArea}
                                InputProps={{
                                    classes: {root: classes.inputAreaRoot},
                                    inputRef: inputRef1
                                }}
                                onChange={(data) => setAmount(data)}
                            />
                            :
                            <USDInput
                                fullWidth={true}
                                value={amountUsd}
                                variant='outlined'
                                className={classes.inputArea}
                                InputProps={{
                                    classes: {root: classes.inputAreaRoot},
                                    inputRef: inputRef2
                                }}
                                onChange={(data) => setAmountUsd(data)}
                            />
                    }
                    <Button
                        startIcon={<SvgCharge/>}
                        color='primary'
                        variant='contained'
                        fullWidth
                        disabled={!checkIfCharge()}
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
        </div>
    )
}

export default SplitPaymentStep2;
