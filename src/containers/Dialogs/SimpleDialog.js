import React from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import Transition from "./Transitions/Transition";
import {_transitionDuration} from "../../constants";

const useStyle = makeStyles(theme => ({
        dialogPaper: {
            width: 420,
            height: 190,
            padding: 20,
            position: 'absolute',
            top: 60
        },
        header: {
            color: theme.palette.primary.modalText
        },
        inputArea: {
            paddingTop: 10,
            paddingBottom: 45,
            fontSize: 14,
        },
        inputAreaRoot: {
            height: 40
        },
        openBtn: {
            color: 'white',
            fontSize: 14,
            textTransform: "capitalize",
            width: 120,
            height: 35
        },
        contained: {
            boxShadow: 'none'
        }
    })
);

function SimpleDialog(props) {
    const classes = useStyle();
    const {open, amount, handleChange, onClose} = props;
    const isDisabled = amount > 0;

    function keyPress(e) {
        if (e.keyCode === 13) {
            if (isDisabled) {
                onClose();
            }
        }
    }

    return (
        <Dialog
            open={open}
            classes={{paper: classes.dialogPaper}}
            TransitionComponent={Transition}
            transitionDuration={_transitionDuration}
        >
            <div className='pb-20'>
                <p className={clsx('p-0 m-0 fs-16 fw-bold', classes.header)}>Enter starting amount</p>
            </div>
            <p className='pl-0 m-0 fs-14 color-black'>Amount</p>
            <CurrencyTextField
                autoFocus
                value={amount}
                currencySymbol="L£"
                decimalCharacter="."
                digitGroupSeparator=","
                decimalPlaces={0}
                onKeyDown={keyPress}
                variant="outlined"
                className={classes.inputArea}
                onChange={handleChange}
                InputProps={{
                    classes: {root: classes.inputAreaRoot}
                }}
            />
            {/*<TextField type="number" value={amount} onChange={handleChange} variant="outlined" placeholder='L£' className={classes.inputArea}/>*/}
            <div className='flex flex-row justify-end'>
                <Button disabled={!isDisabled} variant="contained" color="primary" className={classes.openBtn}
                        classes={{contained: classes.contained}} onClick={onClose}>Open shift</Button>
            </div>
        </Dialog>
    )
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default SimpleDialog;
