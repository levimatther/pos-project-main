import React, {useState} from "react";
import {Button, Dialog, InputAdornment, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Transition from "../Transitions/Transition";
import {_numberWithCommas, _transitionDuration} from "../../../constants";
const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        height: 260,
        position: 'absolute',
        top: 60
    },
    noteArea: {
        height: 120
    },
    refundBtn: {
        fontSize: 14,
        height: 40,
    },
    cancelBtn: {
        color: 'white',
        fontSize: 14,
        textTransform: "capitalize",
        width: 60,
        height: 35,
        marginRight: 10,
        backgroundColor: theme.palette.primary.lightgray,
    },
    openBtn: {
        color: 'white',
        fontSize: 14,
        textTransform: "capitalize",
        width: 140,
        height: 35,
        backgroundColor: theme.palette.primary.main
    },
    inputAreaRoot: {
        height: 40,
    },
}));
function VoucherComplete(props) {
    const classes = useStyles();
    const [amount, setAmount] = useState(3500);

    function setLbpChanges(value) {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value.replace(/,/g, '')))
            setAmount(value.replace(/,/g, ''))
    }

    function checkIfSend() {
        return Number(amount) <= 3500;
    }

    function handleConfirm() {
        if (Number(amount) === 3500) {
            props.handleConfirm()
        } else {
            props.handleRemain(3500 - Number(amount))
        }
    }

    return(
        <Dialog onClose={props.handleCancel} open={props.open} classes={{paper: classes.dialogPaper}} TransitionComponent={Transition}
                transitionDuration={_transitionDuration}>
            <div className='height-50 flex align-center justify-content borderBottomLight'>
                <p className='color-light-blue fs-16 fw-bold p-0 m-0'>Voucher</p>
            </div>
            <div className='p-20 flex flex-row'>
                <div className='flex flex-col fullWidth pr-10'>
                    <p className='pb-10 m-0 fs-14 color-light-black fullWidth'>Enter amount</p>
                    <TextField
                        fullWidth
                        variant='outlined'
                        value={_numberWithCommas(amount)}
                        onFocus={e=> e.target.select()}
                        onChange={(e) => setLbpChanges(e.target.value)}
                        InputProps={{
                            classes: {root: classes.inputAreaRoot},
                            startAdornment: <InputAdornment position="start">L£</InputAdornment>,
                        }}
                    />
                </div>
                <div className='flex flex-col fullWidth'>
                    <p className='pb-10 m-0 fs-14 color-light-black fullWidth'>Voucher ID</p>
                    <TextField
                        fullWidth
                        variant='outlined'
                        InputProps={{
                            classes: {root: classes.inputAreaRoot},
                        }}
                    />
                </div>
            </div>
            <div className='pt-55 pr-20 flex flex-row justify-end'>
                <div className='flex flex-row'>
                    <Button variant="contained" className={classes.cancelBtn} classes={{contained: classes.contained}}
                            onClick={props.handleCancel}
                    >Cancel</Button>
                    <Button variant="contained" color='primary' className={classes.openBtn} classes={{contained: classes.contained}}
                            onClick={() => handleConfirm()}
                            disabled={!checkIfSend()}
                    >Continue</Button>
                </div>
            </div>
        </Dialog>
    )
}

export default VoucherComplete;
