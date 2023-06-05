import React, {useState} from "react";
import {Button, FormControl, MenuItem, OutlinedInput, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as Actions from '../../store/actions'
import clsx from "clsx";
import Select from 'react-select'

const useStyles = makeStyles(theme => ({
    mainArea: {
        height: 'calc(100vh - 51px)',
        overflowY: 'auto'
    },
    inputArea: {
        height: 50
    },
    submitBtn: {
        height: 50,
        marginTop: 20,
        fontSize: 16
    },
    payinBtn: {
        width: 160,
        height: 40,
        color: 'white',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
    },
    payoutBtn: {
        width: 160,
        height: 40,
        color: 'white',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
    },
    primaryBtn: {
        backgroundColor: theme.palette.primary.main
    },
    disabledBtn: {
        backgroundColor: theme.palette.primary.disabled
    },
    currencySelect: {
        control: () => ({
            height: 45
        }),
    },
}));

function CashReason(props) {
    const classes = useStyles();
    const history = useHistory();
    const isPayIn = useSelector(state => state.cash.type) === 'payin';
    const dispatch = useDispatch();
    const [reason, setReason] = useState('');
    const [other, setOther] = useState(false);
    const supplier = [
        {
            label: 'ASupplier',
            value: 'ASupplier',
        },
        {
            label: 'BSupplier',
            value: 'BSupplier'
        },
        {
            label: 'CSupplier',
            value: 'CSupplier'
        },
        {
            label: 'DSupplier',
            value: 'DSupplier'
        },
        {
            label: 'ESupplier',
            value: 'ESupplier'
        }
    ];
    const [selectedOptions, setSelectedOptions] = useState(null);

    function handleBack() {
        // history.goBack();
        props.handleCancel();
    }

    function handleSubmit() {
        dispatch(Actions.setCashReason(reason));
        dispatch(Actions.clearSupplier());
        // history.push('/main/cash/complete')
        props.handleConfirm();
    }

    function checkIfSubmit() {
        return reason.length !== 0;
    }

    const customStyles = {
        control: (provided) => (
            {
                ...provided,
                height: 45
            }
        )
    };

    function checkIfPayout() {
        if (!other) {
            return !!(reason.length !== 0 && selectedOptions);
        } else {
            return reason.length !== 0;
        }
    }

    function handlePayout() {
        if (other) {
            dispatch(Actions.setCashReason(reason));
            dispatch(Actions.clearSupplier());
        } else {
            dispatch(Actions.setCashReason(reason));
            dispatch(Actions.setCashSupplier(selectedOptions.value));
        }
        // history.push('/main/cash/complete');
        props.handleConfirm();
        // props.handleCancel()
    }

    return (
        <div className='checkoutBody'>
            <div className='height-50 borderBottomLight backgroundWhite flex flex-row justify-between align-center'>
                <Button
                    color='primary'
                    startIcon={
                        <ArrowLeftIcon/>
                    }
                    onClick={handleBack}
                    className={classes.openBtn}>Back</Button>
                <p className='p-0 m-0 color-41 fs-14'>
                    {isPayIn ? 'Pay-in reason' : 'Pay-out reason'}
                </p>
                <Button
                    color='primary'
                    disabled
                    className={classes.openBtn}/>
            </div>
            <div className={classes.mainArea}>
                {
                    isPayIn ? <div className='m-20 backgroundWhite borderRadius height-340'>
                            <div className='pt-40 flex flex-col align-center'>
                                <p className='p-0 m-0 fs-36 color-primary fw-bold'>
                                    L£ 200,000
                                </p>
                                <p className='pt-10 m-0 color-91 fs-16'>
                                    Pay-in amount
                                </p>
                            </div>
                            <div className='pt-55 pl-20 pr-20 flex flex-col'>
                                <p className='fs-14 pb-10 m-0'>
                                    Reason
                                </p>
                                <TextField
                                    value={reason}
                                    fullWidth
                                    variant='outlined'
                                    placeholder={'Type in reason'}
                                    InputProps={{
                                        classes: {root: classes.inputArea}
                                    }}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                                <Button
                                    fullWidth
                                    className={classes.submitBtn}
                                    variant='contained'
                                    color='primary'
                                    onClick={handleSubmit}
                                    disabled={!checkIfSubmit()}
                                >Submit</Button>
                            </div>
                        </div>
                        : <div className='m-20 backgroundWhite borderRadius pb-20'>
                            <div className='pt-20 pb-20 flex flex-col align-center'>
                                <div className='flex flex-row'>
                                    <Button
                                        className={clsx(!other ? classes.primaryBtn : classes.disabledBtn, classes.payinBtn)}
                                        onClick={() => setOther(false)}
                                    >Purchase inventory</Button>
                                    <Button
                                        className={clsx(other ? classes.primaryBtn : classes.disabledBtn, classes.payoutBtn)}
                                        onClick={() => setOther(true)}
                                    >Other</Button>
                                </div>
                                <p className='pt-35 m-0 fs-36 fw-bold color-pink'>
                                    - L£ 200,000
                                </p>
                                <p className='pt-5 m-0 fs-16 color-91'>
                                    Pay-out amount
                                </p>
                            </div>
                            {
                                !other && <div className='pt-20 pl-20 pr-20 flex flex-col'>
                                    <p className='fs-14 pb-10 m-0'>
                                        Supplier
                                    </p>
                                    <Select
                                        placeholder={'Select supplier'}
                                        options={supplier}
                                        styles={customStyles}
                                        value={selectedOptions}
                                        onChange={(data) => setSelectedOptions(data)}
                                        theme={theme => ({
                                            ...theme,
                                            colors: {
                                                ...theme.colors,
                                                primary: '#7CE7AC',
                                            }
                                        })}
                                    />
                                </div>
                            }
                            <div className='pt-20 pl-20 pr-20 flex flex-col'>
                                <p className='fs-14 pb-10 m-0'>
                                    Reason
                                </p>
                                <TextField
                                    value={reason}
                                    fullWidth
                                    variant='outlined'
                                    placeholder={'Type in reason'}
                                    InputProps={{
                                        classes: {root: classes.inputArea}
                                    }}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </div>
                            <div className='pl-20 pr-20'>
                                <Button
                                    fullWidth
                                    className={classes.submitBtn}
                                    variant='contained'
                                    color='primary'
                                    onClick={handlePayout}
                                    disabled={!checkIfPayout()}
                                >Submit</Button>
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default CashReason;
