import React, {useState} from "react";
import {Button, Dialog, InputAdornment, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Transition from "../Transitions/Transition";
import {_numberWithCommas, _transitionDuration} from "../../../constants";
const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        height: 325,
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
function PointsComplete(props) {
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
                <p className='color-light-blue fs-16 fw-bold p-0 m-0'>Points</p>
            </div>
            <div className='pt-10 pl-20 pr-20 flex flex-row justify-between'>
                <p className='p-0 m-0 fs-14 color-light'>Total due: <span className='fw-bold'>L£ 3,500</span></p>
                <p className='p-0 m-0 fs-14 color-light'><span className='fw-bold'>{3500 - Number(amount)} </span>Points remaining</p>
            </div>
            <div className='p-20'>
                <div className='flex flex-col fullWidth pr-10'>
                    <p className='pb-10 m-0 fs-14 color-light-black fullWidth'>Points amount</p>
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
            </div>
            <div className='flex justify-end pr-20'>
                <p className='p-0 m-0 fs-14 color-light'>Total paid: <span className='fw-bold'>L£ {_numberWithCommas(amount)}</span></p>
            </div>
            <div className='pt-65 pr-20 flex flex-row justify-end'>
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

export default PointsComplete;
