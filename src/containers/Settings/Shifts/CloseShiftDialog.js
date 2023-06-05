import React, { useEffect, useState} from "react";
import { Dialog, Button, Switch, OutlinedInput } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Transition from "../../Dialogs/Transitions/Transition";
import { _numberWithCommas, _transitionDuration } from "../../../constants";
import LBPInput from "../../../components/LBPInput";
import USDInput from "../../../components/USDInput";
import SvgRefunded from "../../../Icons/Refunded";
import SvgPaid from "../../../Icons/Paid";

const useStyle = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        height: 580,
        position: 'absolute',
        top: 60,
        color: theme.palette.primary.headerColor
    },
    closeBtn: {
        fontSize: 14,
        padding: 0
    },
    inputAreaRoot: {
        height: 40
    },
    outLined: {
        padding: 0
    },
    shiftBtn: {
        height: 40,
        fontSize: 16,
        fontWeight: 'bold'
    },
    cashBox: {
        width: 70,
        height: 20,
        textAlign: 'center',
        fontSize: 11,
        paddingTop: 10,
        float: "left"
    },
    symbol: {
        textAlign: 'center',
        width: 20,
        paddingTop: 9,
        float: "left"
    },
    input: {
        width: 'calc(100% - 95px)',
        float: "left"
    },
    redBox: {
        background: '#FFF2F3',
        color: '#FF808B'
    },
    yellowBox: {
        background: '#FEF9EF',
        color: '#F4BE5E'
    },
    greenBox: {
        background: '#F4FCEF',
        color: '#6DD230'
    },
    title: {
        float: "left",
        width: 90,
    },
    lbp: {
        float: "left",
        textAlign: "left",
        width: 'calc((100% - 90px)/2)',
    },
    usd: {
        float: "right",
        textAlign: "right",
        width: 'calc((100% - 90px)/2)',
    }
})
);

function CloseShiftDialog(props) {
    const classes = useStyle();
    const [countedLbp, setCountedLbp] = useState('');
    const [countedUsd, setCountedUsd] = useState('');
    const [paymentLbp, setPaymentLbp] = useState('');
    const [paymentUsd, setPaymentUsd] = useState('');
    const [totalUsd, setTotalUsd] = useState('');
    const [totalLbp, setTotalLbp] = useState(0);
    const [otherPayment, setOtherPayment] = useState('');
    const [printReport, setPrintReport] = useState(true);
    const { open } = props;

    const [lbp100000, setLbp100000] = useState(0);
    const [lbp50000, setLbp50000] = useState(0);
    const [lbp20000, setLbp20000] = useState(0);
    const [lbp10000, setLbp10000] = useState(0);
    const [lbp5000, setLbp5000] = useState(0);
    const [lbp1000, setLbp1000] = useState(0);
    const [lbp500, setLbp500] = useState(0);
    const [lbp250, setLbp250] = useState(0);

    const [usd100, setUsd100] = useState(0);
    const [usd50, setUsd50] = useState(0);
    const [usd20, setUsd20] = useState(0);
    const [usd10, setUsd10] = useState(0);
    const [usd5, setUsd5] = useState(0);
    const [usd1, setUsd1] = useState(0);

    function checkIfClose() {
        return (countedLbp !== '');
    }
    useEffect(() => {
        let total = lbp100000 * 100000 + lbp50000 * 50000 + lbp20000 * 20000 + lbp10000 * 10000 + lbp5000 * 5000 + lbp1000 * 1000 + lbp500 * 500 + lbp250 * 250;
        setTotalLbp(total);
    }, [lbp100000, lbp50000, lbp20000, lbp10000, lbp5000, lbp1000, lbp500, lbp250]);
    useEffect(() => {
        let total = usd100 * 100 + usd50 * 50 + usd20 * 20 + usd10 * 10 + usd5 * 5 + usd1 * 1;
        setTotalUsd(total);
    }, [usd100, usd50, usd20, usd10, usd5, usd1]);
    useEffect(() => {
        setCountedLbp('');
        setCountedUsd('');
        setPaymentLbp('');
        setPaymentUsd('');
        setOtherPayment('');
        setPrintReport(true);
    }, [props]);

    function removeComas(value) {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value.replace(/,/g, '')))
        {
            let noComa = value.replace(/,/g, '');
            let val = isNaN(parseInt(noComa)) ? 0 : parseInt(noComa);
            return val;
        }
    }
    return (
        <Dialog
            open={open}
            classes={{ paper: classes.dialogPaper }}
            TransitionComponent={Transition}
            transitionDuration={_transitionDuration}
            onClose={props.onClose}
        >
            <div className='height-50 flex flex-row borderBottomLight justify-between align-center pl-15 pr-15'>
                <Button
                    className={classes.closeBtn}
                    color='primary'
                    onClick={props.onClose}
                >
                    Cancel
                </Button>
                <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>
                    Close shift
                </p>
                <Button
                    className={classes.closeBtn}
                    disabled
                />
            </div>
            <div className='height-430'>
                <div className='flex flex-row align-center justify-between height-80 borderBottomLight pl-20 pr-20'>
                    <div className='flex flex-col align-center'>
                        <p className='pb-5 m-0 fs-18 fw-bold'>L£ 2,568,500</p>
                        <p className='p-0 m-0 fs-10 '>Expected cash</p>
                    </div>
                    <div className='flex flex-col align-center'>
                        <p className='pb-5 m-0 fs-18 fw-bold'>L£ 2,568,500</p>
                        <p className='p-0 m-0 fs-10 '>Gross sales</p>
                    </div>
                    <div className='flex flex-col align-center'>
                        <p className='pb-5 m-0 fs-18 fw-bold'>L£ 2,568,500</p>
                        <p className='p-0 m-0 fs-10 '>Net sales</p>
                    </div>
                </div>
                {/* //////////////////////// */}
                <div className='flex flex-row align-center justify-between height-80 borderBottomLight pl-20 pr-20 pb-20'>
                    <div className='flex flex-col fullWidth'>
                        <p className='pb-10 m-0 fs-14'>Petty cash</p>
                        <LBPInput
                            value={countedLbp}
                            onChange={(data) => setCountedLbp(data)}
                            fullWidth
                            variant='outlined'
                            InputProps={
                                { classes: { root: classes.inputAreaRoot }, }
                            }
                        />
                    </div>
                </div>
                {/* //////////////////////////// */}
                <div className='p-20 borderBottomLight'>
                    {/* //////////////// */}
                    <p className='m-0 fs-14 fw-bold'>Payments</p>
                    <div
                        className='cursor-pointer height-55 borderBottomLight pb-10 flex flex-col justify-between'
                    // onClick={(e) => props.handleClick( index, transactionIndex)}
                    >
                        <div
                            className='color-pink pt-10 flex flex-row justify-between'>
                            <div className='flex flex-row align-center'>
                                <SvgRefunded />
                                <p className='pl-5 m-0 fs-12'>Pay out</p>
                            </div>
                            <p className='p-0 m-0 fs-16 fw-bold'>- L£ 252,500</p>
                        </div>
                        <div className='pb-10 flex flex-row justify-between color-light'>
                            <p className='p-0 m-0 fs-12'>12:45 PM</p>
                            <p className='p-0 m-0 fs-12'>CompanyName</p>
                        </div>
                    </div>
                    <div
                        className='cursor-pointer height-55 flex flex-col justify-between'
                    // onClick={(e) => props.handleClick( index, transactionIndex)}
                    >
                        <div
                            className='color-primary pt-10 flex flex-row justify-between'>
                            <div className='flex flex-row align-center'>
                                <SvgPaid />
                                <p className='pl-5 m-0 fs-12'>Pay in</p>
                            </div>
                            <p className='p-0 m-0 fs-16 fw-bold'>L£ 52,500</p>
                        </div>
                        <div className='pb-10 flex flex-row justify-between color-light'>
                            <p className='p-0 m-0 fs-12'>12:45 PM</p>
                            <p className='p-0 m-0 fs-12 f-italic max-140'>Reason for pay in will be italic</p>
                        </div>
                    </div>
                </div>
                {/* /////////////// */}
                {/* ////////////// */}
                <div className='p-20 borderBottomLight'>
                    <div className='flex flex-row pb-20 borderBottomLight'>
                        <div className='flex flex-col fullWidth pr-20'>
                            <p className='pb-10 m-0 fs-14'>LBP card amount</p>
                            <LBPInput
                                value={paymentLbp}
                                onChange={(data) => setPaymentLbp(data)}
                                fullWidth
                                variant='outlined'
                                InputProps={
                                    { classes: { root: classes.inputAreaRoot }, }
                                }
                            />
                        </div>
                        <div className='flex flex-col fullWidth'>
                            <p className='pb-10 m-0 fs-14'>USD card amount</p>
                            <USDInput
                                value={paymentUsd}
                                onChange={(data) => setPaymentUsd(data)}
                                fullWidth
                                variant='outlined'
                                InputProps={
                                    { classes: { root: classes.inputAreaRoot }, }
                                }
                            />
                        </div>
                    </div>


                    <div className='flex flex-col fullWidth pt-20 pb-20'>
                        <p className='pb-10 m-0 fs-14 fw-bold'>Cash count</p>
                    </div>
                    <div className='flex flex-row pb-20 borderBottomLight'>
                        <div className='flex flex-col fullWidth pr-20'>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.redBox, 'mt-5')}>L£ 100,000</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(lbp100000)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setLbp100000(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.redBox, 'mt-5')}>L£ 50,000</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(lbp50000)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setLbp50000(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.redBox, 'mt-5')}>L£ 20,000</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(lbp20000)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setLbp20000(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.redBox, 'mt-5')}>L£ 10,000</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(lbp10000)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setLbp10000(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.redBox, 'mt-5')}>L£ 5,000</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(lbp5000)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setLbp5000(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.redBox, 'mt-5')}>L£ 1,000</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(lbp1000)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setLbp1000(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.yellowBox, 'mt-5')}>L£ 500</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(lbp500)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setLbp500(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.yellowBox, 'mt-5')}>L£ 250</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(lbp250)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setLbp250(lbp); }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col fullWidth'>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.greenBox, 'mt-5')}>$ 100.00</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(usd100)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setUsd100(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.greenBox, 'mt-5')}>$ 50.00</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(usd50)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setUsd50(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.greenBox, 'mt-5')}>$ 20.00</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(usd20)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setUsd20(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.greenBox, 'mt-5')}>$ 10.00</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(usd10)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setUsd10(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.greenBox, 'mt-5')}>$ 5.00</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(usd5)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setUsd5(lbp); }}
                                    />
                                </div>
                            </div>
                            <div className='mb-10'>
                                <div className={clsx(classes.cashBox, classes.greenBox, 'mt-5')}>$ 1.00</div>
                                <div className={clsx(classes.symbol)}>x</div>
                                <div className={clsx(classes.input)}>
                                    <OutlinedInput
                                        value={_numberWithCommas(usd1)}
                                        inputProps={{ style: { padding: 11 } }}
                                        placeholder='0'
                                        onChange={(e) => { let lbp = removeComas(e.target.value); setUsd1(lbp); }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row fullWidth pt-10 pb-10 borderBottomLight'>
                        <div className={clsx(classes.title, 'p-0 m-0 fs-14 fw-bold')}>Total</div>
                        <div className={clsx(classes.lbp, 'p-0 m-0 fs-18 fw-bold')}>{'L£ ' + _numberWithCommas(totalLbp)}</div>
                        <div className={clsx(classes.usd, 'p-0 m-0 fs-18 fw-bold')}>{'$ ' + totalUsd + '.00'}</div>
                    </div>
                    <div className='flex flex-row fullWidth pt-10'>
                        <div className={clsx(classes.title, 'p-0 m-0 fs-14 fw-bold')}>Difference</div>
                        <div className={clsx(classes.lbp, 'p-0 m-0 fs-18 fw-bold color-pink')}>- L£ 2000</div>
                        <div className={clsx(classes.usd, 'p-0 m-0 fs-18 fw-bold color-primary')}>L£ 2,568,500</div>
                    </div>
                </div>
                <div className='height-60 borderBottomLight pl-20 pr-20 flex flex-row justify-between align-center'>
                    <p className='p-0 m-0 fs-14 fw-bold'>
                        Print report
                    </p>
                    <Switch
                        checked={printReport}
                        onChange={() => setPrintReport(prevState => {
                            return !prevState
                        })}
                        color='primary'
                        size='medium'
                        name="checkedB"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
            </div>
            <div className='pt-40 pb-20 pl-20 pr-20'>
                <Button
                    fullWidth
                    color='primary'
                    variant='contained'
                    className={classes.shiftBtn}
                    onClick={props.handleConfirm}
                    disabled={!checkIfClose()}
                >
                    Close shift
                </Button>
            </div>
        </Dialog>
    )
}

export default CloseShiftDialog;
