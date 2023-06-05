import React, {useState} from "react";
import {Button, Divider, Snackbar, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TextMaskCustom from "../../../components/TextMaskCustom";
import MuiAlert from "@material-ui/lab/Alert";
import {_numberWithCommas} from "../../../constants";
import SvgCompleteSale from "../../../Icons/CompleteSale";
import clsx from "clsx";
import CountUp from "react-countup";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
    inputAreaRoot: {
        height: 40,
        paddingRight: 100
    },
    inputArea: {
        paddingRight: 10
    },
    receiptBtn: {
        width: 110,
        height: 40,
        padding: 0,
        position: 'absolute',
        right: 0
    },
    completeBtn: {
        height: 48
    },
    dividerRoot: {
        height: 40,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: theme.palette.primary.headerColor
    }
}));

function CashComplete(props) {
    const isLbp = props.isLbp;
    const classes = useStyles();
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const leftAmount = Number(props.data) - 3500;
    const leftAmountUsd = props.data === '19.45' ? 0 : 1500;
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [phoneSuccess, setPhoneSuccess] = useState(false);
    function validateMail(mail) {
        let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return !!mail.match(mailFormat);
    }
    function validatePhone() {
       let strLength = phone.replace(/\s/g, '').length
        return strLength === 9;
    }
    return (
        <div className='checkoutBody'>
            <div className='pt-105'>
                {/*<div className='flex flex-col align-end'>*/}
                {/*    <p className='p-0 m-0 fs-36 fw-bold'>{isLbp ? 'L£ 3,500' : '$19.45'}&nbsp; &nbsp;<span style={{fontWeight: "normal"}}>|</span></p>*/}
                {/*    <p className='pr-35 pt-5 m-0 fs-12'>Total paid</p>*/}
                {/*</div>*/}
                {/*<div className='flex flex-col'>*/}
                {/*    <p className='p-0 m-0 fs-36 fw-bold'>&nbsp; &nbsp;L£ {isLbp ? _numberWithCommas(leftAmount) : _numberWithCommas(leftAmountUsd)}</p>*/}
                {/*    <p className='pl-25 pt-5 m-0 fs-12'>Change due</p>*/}
                {/*</div>*/}
                <div className='flex flex-row justify-content align-center'>
                    <p className={clsx('p-0 m-0 fs-36 fw-bold width-200 text-right')}>
                        {isLbp ? 'L£ 3,500' : '$ 19.45'}
                    </p>
                    <Divider orientation='vertical' classes={{root: classes.dividerRoot}} />
                    <p className={clsx( 'p-0 m-0 fs-36 fw-bold width-200')}>
                        L£ 1,500
                    </p>
                </div>
                <div className='flex flex-row justify-content pt-10'>
                    <p className='pr-40 m-0 fs-12 width-200 text-right'>Total paid</p>
                    <p className='p-0 m-0 fs-12 width-200'>Change due</p>
                </div>
            </div>
            <div className='pt-85 pl-20 pr-20'>
                <div className='flex flex-row'>
                    <div className='flex flex-col pr-10 fullWidth'>
                        <p className='pb-10 m-0 fs-12'>Email receipt</p>
                        <div className='fullWidth flex flex-row position-relative'>
                            <TextField
                                fullWidth
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                variant='outlined'
                                InputProps={{
                                    classes: {root: classes.inputAreaRoot},
                                }}
                            />
                            <Button
                                variant='contained'
                                color='primary'
                                classes={{root: classes.receiptBtn}}
                                onClick={() => setEmailSuccess(true)}
                                disabled={!validateMail(mail)}
                            >
                                Send receipt</Button>
                        </div>
                    </div>
                    <div className='flex flex-col fullWidth'>
                        <p className='pb-10 m-0 fs-12'>WhatsApp receipt</p>
                        <div className='fullWidth flex flex-row position-relative'>
                            <TextField
                                fullWidth
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                onFocus={e =>e.target.select()}
                                variant='outlined'
                                InputProps={{
                                    classes: {root: classes.inputAreaRoot},
                                    inputComponent: TextMaskCustom
                                }}
                            />
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => setPhoneSuccess(true)}
                                disabled={!validatePhone()}
                                classes={{root: classes.receiptBtn}}>
                                Send receipt</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-40 pl-20 pr-20'>
                <Button
                    className={classes.completeBtn}
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={props.handleConfirm}
                    startIcon={<SvgCompleteSale/>}
                >Complete</Button>
            </div>
            <Snackbar open={emailSuccess} autoHideDuration={3000} onClose={() => setEmailSuccess(false)}>
                <Alert onClose={() => setEmailSuccess(false)} severity="success">
                    Message has been sent successfully!
                </Alert>
            </Snackbar>
            <Snackbar open={phoneSuccess} autoHideDuration={3000} onClose={() => setPhoneSuccess(false)}>
                <Alert onClose={() => setPhoneSuccess(false)} severity="success">
                    Message has been sent successfully!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default CashComplete;
