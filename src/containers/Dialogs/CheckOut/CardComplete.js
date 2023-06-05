import React, {useState} from "react";
import {Button, Snackbar, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TextMaskCustom from "../../../components/TextMaskCustom";
import MuiAlert from "@material-ui/lab/Alert";
import clsx from "clsx";
import SvgCompleteSale from "../../../Icons/CompleteSale";
import SvgPrintComplete from "../../../Icons/PrintComplete";

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
        height: 48,
    },
    marginRight10: {
        marginRight: 10
    }
}));

function CardComplete(props) {
    const isLbp = props.isLbp;
    const classes = useStyles();
    const [mail, setMail] = useState('richard.lopez@gmail.com');
    const [phone, setPhone] = useState('03785478');
    const [emailSuccess, setEmailSuccess] = useState(false);
    const [phoneSuccess, setPhoneSuccess] = useState(false);

    function validateMail(mail) {
        let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return !!mail.match(mailFormat);
    }

    function validatePhone() {
        let strLength = phone.replace(/\s/g, '').length
        return strLength !== 0;
    }

    return (
        <div className='checkoutBody'>
            <div className='pt-105 flex flex-col justify-content align-center'>
                <p className='p-0 m-0 fs-36 fw-bold'>{isLbp ? 'L£ 3,500' : '$ 19.45'}&nbsp; &nbsp;</p>
                <p className='pt-5 pt-5 m-0 fs-12'>Total paid</p>
            </div>
            <div className='pt-85 pl-20 pr-20'>
                <div className='flex flex-row'>
                    <div className='flex flex-col pr-10 fullWidth'>
                        <p className='pb-10 m-0 fs-12'>Email receipt</p>
                        <div className='fullWidth flex flex-row position-relative'>
                            <TextField
                                fullWidth
                                value={mail}
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
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
                                onFocus={e => e.target.select()}
                                variant='outlined'
                                InputProps={{
                                    readOnly: true,
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

            <div className='pt-40 pl-20 pr-20 flex flex-row'>
                <Button
                    className={clsx(classes.completeBtn, classes.marginRight10)}
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={props.handleConfirm}
                    startIcon={<SvgCompleteSale/>}
                >Complete</Button>
                <Button
                    className={classes.completeBtn}
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={props.handleConfirm}
                    startIcon={<SvgPrintComplete/>}
                >Print & Complete</Button>
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

export default CardComplete;
