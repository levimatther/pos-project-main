import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Dialog} from "@material-ui/core";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Transition from "./Transitions/Transition";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import {TextField} from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import {_transitionDuration} from "../../constants";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        height: 320,
        position: 'absolute',
        top: 60
    },
    header: {
        color: theme.palette.primary.deleteModalText
    },
    contained: {
        boxShadow: 'none'
    },
    openBtn: {
        color: 'white',
        fontSize: 14,
        textTransform: "capitalize",
        width: 100,
        height: 35,
        backgroundColor: theme.palette.primary.main
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
    amountBtn: {
        backgroundColor: 'white',
        color: 'black',
        height: 42,
        width: 72
    },
    amountBtnRoot: {
        borderRadius: 4,
        border: `1px solid ${theme.palette.primary.lightgray}`
    },
    inputAreaRoot: {
        height: 42,
        width: 316,
    },
    inputAreaStyle: {
        textAlign: 'center'
    },
    commentAreaRoot: {
        height: 40,
    }
}));

function CommentDialog(props) {
    const {open, handleCancel, handleConfirm, data} = props;
    const [singleData, setSingleData] = useState({});
    useEffect(() => {
        setSingleData(prevState => {
            let flag = { ...data};
            return flag;
        });
    }, [props]);
    useEffect(() => {
        return () => {
            setSingleData({});
        }
    }, []);
    const classes = useStyles();
    const isDisabled = singleData.amount === 1;

    function handleMinus() {
        setSingleData(prevState => {
            let amount = prevState.amount - 1;
            let flag = {...prevState, amount: amount};
            return flag
        });
    }

    function handlePlus() {
        setSingleData(prevState => {
            let amount = prevState.amount + 1;
            let flag = {...prevState, amount: amount};
            return flag
        })
    }

    function handleAmount(e) {
        e.persist();
        if (e.target.value === '' || /^\d+$/.test(e.target.value)) {
            setSingleData(prevState => {
                let amount;
                if (e.target.value === '') {
                    amount = 1
                } else {
                    amount = parseInt(e.target.value);
                }

                return {...prevState, amount: amount};
            })
        }
    }

    function handleComment(e) {
        e.persist();
        setSingleData(prevState => {
            return {...prevState, comment: e.target.value}
        })
    }

    function handleChange(e) {
        e.persist();
        setSingleData(prevState => {
            return {...prevState, amount: Number(e.target.value)}
        })
    }

    function handleFocus(e) {
        e.target.select();
    }

    return (
        <Dialog onClose={props.handleCancel} open={open} classes={{paper: classes.dialogPaper}} TransitionComponent={Transition}
                transitionDuration={_transitionDuration}>
            <div className='flex flex-row justify-between pb-15 pt-15 pl-20 pr-20'
                 style={{borderBottom: '1px solid #E8ECEF'}}>
                <div className='text-area height-30'>
                    <p className={clsx('p-0 m-0 fs-16 fw-bold', classes.header)}>
                        {singleData && singleData.name}
                    </p>
                </div>
                <div className='text-area height-30'>
                    <p className={clsx('p-0 m-0 fs-16 fw-bold', classes.header)}>
                        {singleData && singleData.price}
                    </p>
                </div>
            </div>
            <div className='p-20 flex-row flex justify-between'>
                <IconButton className={classes.amountBtn} classes={{root: classes.amountBtnRoot}} disabled={isDisabled}
                            onClick={handleMinus}>
                    <Icon className="fa fa-minus" style={{fontSize: 18}}/>
                </IconButton>
                {
                    singleData.type!==2 ? <TextField
                        variant="outlined"
                        InputProps={{
                            classes: {root: classes.inputAreaRoot, input: classes.inputAreaStyle},
                        }}
                        onFocus={handleFocus}
                        value={singleData.amount}
                        onChange={handleAmount}
                    /> : <CurrencyTextField
                        value={singleData.amount}
                        currencySymbol=""
                        decimalCharacter="."
                        digitGroupSeparator=","
                        variant="outlined"
                        onChange={handleChange}
                        decimalPlaces={3}
                        InputProps={{
                            classes: {root: classes.inputAreaRoot, input: classes.inputAreaStyle},
                        }} />
                }
                <IconButton className={classes.amountBtn} classes={{root: classes.amountBtnRoot}} onClick={handlePlus}>
                    <Icon className="fa fa-plus" style={{fontSize: 18}}/>
                </IconButton>
            </div>
            <div className='pt-5 pl-20 pr-20'>
                <p className='m-0 p-0 fs-14'>Comment</p>
                <div className='pt-10'/>
                <TextField
                    variant="outlined"
                    InputProps={{
                        classes: {root: classes.commentAreaRoot, input: classes.commentAreaStyle},
                    }}
                    value={singleData.comment || ''}
                    onChange={handleComment}
                    fullWidth={true}
                    placeholder='Enter comment'
                    error={singleData.comment && singleData.comment.length > 100}
                />
            </div>
            <div className='flex justify-end pr-20'>
                <p className={clsx('p-0 m-0 fs-10 color-CE', singleData.comment && singleData.comment.length > 100 ? 'errorText' : '')}>{singleData.comment && singleData.comment.length >0 ? singleData.comment.length : 0}/100</p>
            </div>
            <div className='pt-45 pr-20 flex flex-row justify-end'>
                <Button variant="contained" className={classes.cancelBtn} classes={{contained: classes.contained}}
                        onClick={handleCancel}>Cancel</Button>
                <Button variant="contained" className={classes.openBtn} classes={{contained: classes.contained}}
                        onClick={() => handleConfirm(singleData)}>Update</Button>
            </div>
        </Dialog>
    )
}

export default CommentDialog;
