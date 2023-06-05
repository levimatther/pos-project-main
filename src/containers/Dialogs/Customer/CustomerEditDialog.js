import React, {useEffect, useState} from "react";
import {Button,TextField, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextMaskCustom from "../../../components/TextMaskCustom";

const useStyles = makeStyles(theme => (
    {
        dialogPaper: {
            width: 520,
            height: 580,
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
function CustomerEditDialog(props) {
    const classes = useStyles();
    const initialData = {
        no: 5280002,
        id: '0923892002',
        firstname: 'James',
        lastname: 'Nakhleh',
        gender: 'male',
        date: new Date(2018, 11, 24),
        mobile: '03-999 444',
        mail: 'name@company.com',
        address: 'Jounieh, Haret Sakher st., 1022 Bldg., 3rd floor',
    };
    const [customerData, setCustomerData] = useState({
        no: 5280002,
        id: '0923892002',
        firstname: 'James',
        lastname: 'Nakhleh',
        gender: 'male',
        date: new Date(2018, 11, 24),
        mobile: '03-999 444',
        mail: 'name@company.com',
        address: 'Jounieh, Haret Sakher st., 1022 Bldg., 3rd floor',
    });

    useEffect(() => {
        setCustomerData({...initialData})
    }, [props]);
    function checkIsChanged() {
        if (JSON.stringify(customerData) === JSON.stringify(initialData)) {
            return false;
        } else {
            if (customerData.firstname.length > 0 && customerData.lastname.length > 0 && customerData.address.length > 0) {
                return true;
            } else {
                return false
            }
        }

    }

    function handleSubmit() {
        props.handleEdit()
    }

    function handleChange(field, value) {

        setCustomerData(prevState => {
            let item = prevState;
            item[field] = value;
            return {...item};
        })
    }

    return(
            <div className='list-body'>
                <div
                    className='pl-5 pr-5 flex flex-row justify-between height-50 align-center borderBottomLight'>
                    <Button color='primary' className={classes.openBtn} onClick={props.handleCancel}>Cancel</Button>
                    <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Edit customer</p>
                    <Button color='primary' className={classes.openBtn} disabled={!checkIsChanged()} onClick={handleSubmit} >Save</Button>
                </div>
                <div className='pr-20 flex flex-row justify-end align-center height-40 borderBottomLight'>
                    <p className='p-0 m-0 fs-12 color-light-blue'>Customer no.: {customerData && customerData.no}</p>
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
                                value={customerData && customerData.firstname}
                                onChange={(e) => handleChange('firstname', e.target.value)}
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
                                value={customerData && customerData.lastname}
                                onChange={(e) => handleChange('lastname', e.target.value)}
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
                                defaultValue={'male'}
                                fullWidth
                                className={classes.inputField}
                                value={customerData && customerData.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
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
                                    value={customerData && customerData.date}
                                    onChange={(e) => handleChange('date', e)}
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
                                fullWidth
                                className={classes.inputField}
                                value={customerData && customerData.mobile}
                                onChange={(e) => handleChange('mobile', e.target.value)}
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
                                value={customerData && customerData.mail}
                                onChange={(e) => handleChange('mail', e.target.value)}
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
                            value={customerData && customerData.address}
                            onChange={(e) => handleChange('address', e.target.value)}
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
                            value={customerData && customerData.id}
                            onChange={(e) => handleChange('id', e.target.value)}
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

export default CustomerEditDialog;
