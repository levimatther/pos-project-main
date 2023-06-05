import React, {useEffect, useState} from "react";
import {Dialog, Button, TextField, FormControl, Select, OutlinedInput, MenuItem} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Transition from "../../../Dialogs/Transitions/Transition";
import {_transitionDuration} from "../../../../constants";

const useStyle = makeStyles(theme => ({
        dialogPaper: {
            width: 520,
            height: 420,
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
        inputAreaPR100: {
            paddingRight: 100,
            height: 40
        },
        shiftBtn: {
            height: 40,
            fontSize: 16,
            fontWeight: 'bold'
        },
        receiptBtn: {
            width: 110,
            height: 40,
            padding: 0,
            position: 'absolute',
            right: 0
        },
        testBtn: {
            fontSize: 16,
            fontWeight: 'bold',
            height: 40
        }
    })
);

function EditPrinterDialog(props) {
    const classes = useStyle();
    const {tag} = props;
    const [printerName, setPrinterName] = useState('');
    const [printerType, setPrinterType] = useState('');
    const [ipAdr, setIpAdr] = useState('');
    const {open} = props;


    function checkIfSave() {
        if (props.data) {
            return (printerName !== props.data.name || printerType !== props.data.type || ipAdr !== props.data.ipAdr)
        }
    }
    useEffect(() => {
        {
            if (props.data) {
                const initialName = props.data.name;
                const initialType = props.data.type;
                const initialIp = props.data.ipAdr;
                setPrinterName(initialName);
                setPrinterType(initialType);
                setIpAdr(initialIp);
            }
        }
    }, [props]);
    return (
        <Dialog
            open={open}
            classes={{paper: classes.dialogPaper}}
            TransitionComponent={Transition}
            transitionDuration={_transitionDuration}
            onClose={props.onClose}
        >
            <div className='height-50 flex flex-row borderBottomLight justify-between align-center pl-15 pr-5'>
                <Button
                    className={classes.closeBtn}
                    color='primary'
                    onClick={props.onClose}
                >
                    Cancel
                </Button>
                <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>
                    Edit printer
                </p>
                <Button
                    className={classes.closeBtn}
                    color='primary'
                    disabled={!checkIfSave()}
                    onClick={() => props.addPrinter({
                        name: printerName,
                        type: printerType,
                        ipAdr: ipAdr
                    })}
                >Save</Button>
            </div>
            <div className='p-20'>
                <p className='fs-14 pb-10 m-0'>Printer Name</p>
                <TextField
                    fullWidth
                    value={printerName || ''}
                    onChange={(e) => setPrinterName(e.target.value)}
                    variant='outlined'
                    placeholder='Name'
                    InputProps={{
                        classes: {root: classes.inputAreaRoot}
                    }}
                />
                <p className='fs-14 pb-5 pt-20 m-0'>Printer model</p>
                <FormControl
                    fullWidth
                    variant='outlined'
                    margin='dense'
                    placeholder={'Select printer model'}
                >
                    <Select
                        value={printerType || ''}
                        onChange={(e) => (setPrinterType(e.target.value))}
                        input={<OutlinedInput classes={{root: classes.inputAreaRoot}}/>}
                    >
                        <MenuItem value={"Panda PA1293"}>Panda PA1293</MenuItem>
                        <MenuItem value={"Panda PA1207"}>Panda PA1207</MenuItem>
                        <MenuItem value={"Panda PA1208"}>Panda PA1208</MenuItem>
                        <MenuItem value={"Panda PA1209"}>Panda PA1209</MenuItem>
                    </Select>
                </FormControl>
                <p className='fs-14 pb-10 pt-15 m-0'>Printer IP address</p>
                <div className='fullWidth flex flex-row position-relative'>
                    <TextField
                        fullWidth
                        value={ipAdr || ''}
                        onChange={(e) => setIpAdr(e.target.value)}
                        variant='outlined'
                        placeholder='IP Address'
                        InputProps={{
                            classes: {root: classes.inputAreaPR100},
                        }}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        classes={{root: classes.receiptBtn}}
                        // onClick={() => setEmailSuccess(true)}
                        // disabled={!validateMail(mail)}
                    >
                        Search</Button>
                </div>
                <div className='pt-40'>
                    <Button
                        color='primary'
                        variant='contained'
                        fullWidth
                        className={classes.testBtn}
                        disabled={!checkIfSave()}
                    >Test print</Button>
                </div>
            </div>
        </Dialog>
    )
}

export default EditPrinterDialog;
