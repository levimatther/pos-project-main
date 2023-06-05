import React, {useEffect, useState} from "react";
import {Button, MenuItem, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextMaskCustom from "../../../components/TextMaskCustom";

const useStyles = makeStyles(theme => (
    {
        dialogPaper: {
            width: 520,
            height: 562,
            position: 'absolute',
            top: 60
        },
        openBtn: {
            fontSize: 14,
            textTransform: "capitalize",
            height: 35,
        },
        inputField: {
            paddingTop: 10
        },
        inputRoot: {
            color: theme.palette.primary.product,
            fontSize: 14,
            height: 40
        },
        customSelect: {
            "&&&:focus" : {
                backgroundColor: 'transparent'
            }
        },
        customDatePicker: {
            marginTop: 10,
            height: 40,
            border: `1px solid #c5c5c5`,
            borderRadius: 4,
            paddingLeft: 10
        },
        underline: {
            "&&&:before": {
                borderBottom: 0
            },
            "&&&:hover:not(.Mui-disabled):before": {
                borderBottom: 0
            }
        }
    }
));
function AddCustomerDialog(props) {
    const classes = useStyles();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('male');
    const [date, setDate] = useState(new Date());
    const [mobile, setmobile] = useState('');
    const [mail, setMail] = useState('');
    const [address, setAddress] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [uniqueId, setUniqueId] =  useState('')

    function checkValidate() {
        return !(firstname.length > 0 && lastname.length > 0 && address.length > 0);
    }
    useEffect(() => {
        setUniqueId(getUniqueId());
        setFirstname('');
        setLastname('');
        setGender('');
        setDate(new Date());
        setmobile('');
        setMail('');
        setAddress('');
        setCustomerId('');
    }, [props]);

    function handleSubmit() {
        let data = {
            shortName: firstname.substring(0, 1) + lastname.substring(0, 1),
            name: firstname + ' ' + lastname,
            phone: mobile,
            mail: mail,
            id: customerId,
            no: uniqueId,
        };
        props.handleConfirm(data);
    }

    function getUniqueId() {
        let uniqueID = '';
        for (let i =0; i < 7; i++) {
            uniqueID = uniqueID + String(Math.floor(Math.random() * 10));
        }
        return uniqueID
    }
    return(
            <div className='list-body'>
                <div className='pl-5 pr-5 flex flex-row justify-between height-50 align-center borderBottomLight'>
                    <Button color='primary' className={classes.openBtn} onClick={props.handleCancel}>Cancel</Button>
                    <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Create new customer</p>
                    <Button color='primary' className={classes.openBtn} disabled={checkValidate()} onClick={handleSubmit} >Save</Button>
                </div>
                <div className='pr-20 flex flex-row justify-end align-center height-40 borderBottomLight'>
                    <p className='p-0 m-0 fs-12 color-light-blue'>Customer no.: {uniqueId}</p>
                </div>
                <div className='p-20'>
                    <div className='flex flex-row'>
                        <div className='flex flex-col fullWidth pr-10'>
                            <div className='text-area height-20'>
                                <p className='fs-14 p-0 m-0'>First name</p>
                            </div>
                            <TextField
                                variant='outlined'
                                fullWidth
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className={classes.inputField}
                                InputProps={{
                                    classes: {root: classes.inputRoot}
                                }}
                            />
                        </div>
                        <div className='flex flex-col fullWidth'>
                            <div className='text-area height-20'>
                                <p className='fs-14 p-0 m-0'>Last name</p>
                            </div>
                            <TextField
                                variant='outlined'
                                fullWidth
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                className={classes.inputField}
                                InputProps={{
                                    classes: {root: classes.inputRoot}
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex flex-row pt-20'>
                        <div className='flex flex-col fullWidth pr-10'>
                            <div className='text-area height-20'>
                                <p className='fs-14 p-0 m-0'>Gender</p>
                            </div>
                            <TextField
                                variant='outlined'
                                select
                                fullWidth
                                className={classes.inputField}
                                value={gender}
                                onChange={(e) => setGender(e.target.value) }
                                SelectProps={{
                                    classes: {select: classes.customSelect}
                                }}
                                InputProps={{
                                    classes: {root: classes.inputRoot}
                                }}
                            >
                                <MenuItem value='male'>
                                    Male
                                </MenuItem>
                                <MenuItem value='female'>
                                    Female
                                </MenuItem>
                            </TextField>
                        </div>
                        <div className='flex flex-col fullWidth'>
                            <div className='text-area height-20'>
                                <p className='fs-14 p-0 m-0'>DOB</p>
                            </div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    id="date-picker-dialog"
                                    format="MM/dd/yyyy"
                                    value={date}
                                    onChange={(e) => setDate(e)}
                                    variant='outlined'
                                    InputProps={{
                                        classes: {root: classes.customDatePicker, underline: classes.underline}
                                    }}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>
                    <div className='flex flex-row pt-20'>
                        <div className='flex flex-col fullWidth pr-10'>
                            <div className='text-area height-20'>
                                <p className='fs-14 p-0 m-0'>Mobile</p>
                            </div>
                            <TextField
                                variant='outlined'
                                onFocus={(e) => e.target.select()}
                                fullWidth
                                className={classes.inputField}
                                value={mobile}
                                onChange={(e) => setmobile(e.target.value)}
                                InputProps={{
                                    classes: {root: classes.inputRoot},
                                    inputComponent: TextMaskCustom
                                }}
                            />
                        </div>
                        <div className='flex flex-col fullWidth'>
                            <div className='text-area height-20'>
                                <p className='fs-14 p-0 m-0'>Email</p>
                            </div>
                            <TextField
                                variant='outlined'
                                fullWidth
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                className={classes.inputField}
                                InputProps={{
                                    classes: {root: classes.inputRoot}
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col fullWidth pt-20'>
                        <div className='text-area height-20'>
                            <p className='fs-14 p-0 m-0'>Address</p>
                        </div>
                        <TextField
                            variant='outlined'
                            fullWidth
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={classes.inputField}
                            InputProps={{
                                classes: {root: classes.inputRoot}
                            }}
                        />
                    </div>
                    <div className='flex flex-col fullWidth pt-20'>
                        <div className='text-area height-20'>
                            <p className='fs-14 p-0 m-0'>Customer ID</p>
                        </div>
                        <TextField
                            variant='outlined'
                            fullWidth
                            value={customerId}
                            onChange={(e) => setCustomerId(e.target.value)}
                            className={classes.inputField}
                            InputProps={{
                                classes: {root: classes.inputRoot}
                            }}
                        />
                    </div>
                </div>
            </div>
    )
}

export default AddCustomerDialog;
