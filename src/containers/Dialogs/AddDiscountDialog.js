import React, { useState} from "react";
import {Dialog, Button, TextField, ButtonGroup} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Transition from "./Transitions/Transition";
import clsx from "clsx";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import {_transitionDuration} from "../../constants";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        position: 'absolute',
        top: 60
    },
    openBtn: {
        fontSize: 14,
        textTransform: "capitalize",
        height: 35,
    },
    noteArea: {
        height: 120
    },
    primaryBtn: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        border: `1px solid ${theme.palette.primary.main}`,
    },
    disableBtn: {
        color: `${theme.palette.primary.main} !important`,
        backgroundColor: 'white',
        border: `1px solid ${theme.palette.primary.main}`,
    },
    tabContainer: {
        height: 40
    },
    inputAreaRoot: {
        height: 40,
    },
    textRight: {
        textAlign: 'right'
    },
    textField: {
        paddingBottom: 35
    }
}));

function AddDiscount(props) {
    const classes = useStyles();
    const [tabStatus, setTabStatus] = useState('percent');
    const [percent, setPercent] = useState('');
    const [lbp, setLbp] = useState('');
    const [code, setCode] = useState('');
    function setLbpChanges(value) {
        setLbp(value.replace(/,/g, ''))
    }

    function checkActivity() {
        if (tabStatus === 'percent' && percent === '') {
            return true
        }
        if (tabStatus === 'lbp' && lbp === '') {
            return true
        }
        if (tabStatus === 'code' && code !== 'aaaa') {
            return true
        }
    }

    return (
        <Dialog onClose={props.handleCancel} open={props.open} classes={{paper: classes.dialogPaper}} TransitionComponent={Transition}
                transitionDuration={_transitionDuration}>
            <div
                className={clsx('pl-5 pr-5 flex flex-row justify-between height-50 align-center borderBottomLight', classes.header)}>
                <Button color='primary' className={classes.openBtn} onClick={props.handleCancel}>Cancel</Button>
                <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Apply discount</p>
                <Button color='primary' className={classes.openBtn} disabled={checkActivity()} onClick={props.handleConfirm}>Apply</Button>
            </div>
            <div className='pt-10 pb-10 pr-20 pl-20 borderBottomLight'>
                <ButtonGroup className={classes.tabContainer} aria-label="large outlined primary button group"
                             fullWidth>
                    <Button variant='contained' color='primary'
                            className={tabStatus === 'percent' ? classes.primaryBtn : classes.disableBtn}
                            onClick={() => setTabStatus('percent')}>%</Button>
                    <Button variant='contained' color='primary'
                            className={tabStatus === 'lbp' ? classes.primaryBtn : classes.disableBtn}
                            onClick={() => setTabStatus('lbp')}>LBP (L£)</Button>
                    <Button variant='contained' color='primary'
                            className={tabStatus === 'code' ? classes.primaryBtn : classes.disableBtn}
                            onClick={() => setTabStatus('code')}>Code</Button>
                </ButtonGroup>
            </div>
            <div className='p-20'>
                <p className='pb-10 m-0 fs-16'>{tabStatus === 'percent' ? 'Amount (%)' : tabStatus === 'lbp' ? 'Amount (LBP)' : 'Code'}</p>
                {
                    tabStatus === 'percent' && <CurrencyTextField
                        value={percent}
                        autoFocus
                        currencySymbol="%"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        decimalPlaces={0}
                        variant="outlined"
                        fullWidth
                        maximumValue={'100'}
                        className={classes.textField}
                        onFocus={(e) => {e.target.select()}}
                        onChange={(e) => {
                            setPercent(e.target.value)
                        }}
                        InputProps={{
                            classes: {root: classes.inputAreaRoot},
                        }}
                    />
                }
                {
                    tabStatus === 'lbp' && <CurrencyTextField
                        value={lbp}
                        autoFocus
                        currencySymbol="L£"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        decimalPlaces={0}
                        variant="outlined"
                        fullWidth
                        className={classes.textField}
                        onFocus={(e) => {e.target.select()}}
                        onChange={(e) => {
                            setLbpChanges(e.target.value)
                        }}
                        InputProps={{
                            classes: {root: classes.inputAreaRoot}
                        }}
                    />
                }
                {
                    tabStatus === 'code' &&
                    <TextField
                        variant="outlined"
                        value={code}
                        autoFocus
                        onChange={(e) => setCode(e.target.value)}
                        id="standard-start-adornment"
                        fullWidth
                        className={classes.textField}
                        placeholder={'e.g. NEW CUSTOMER'}
                        onFocus={(e) => {e.target.select()}}
                        InputProps={{
                            classes: {root: classes.inputAreaRoot},
                        }}
                    />
                }
            </div>
        </Dialog>
    )
}

export default AddDiscount;
