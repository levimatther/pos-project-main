import React, {useState} from "react";
import {Button, Switch} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import AmountController from "../../../components/AmountController";
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import ReturnProductReason from "./ReturnProductReason";
import ReturnProductsComplete from "./ReturnProductsComplete";
import {_transitionDuration} from "../../../constants";
import {CSSTransition} from "react-transition-group";
import SvgAddNote from "../../../Icons/AddNote";
import SvgAddNoteP from "../../../Icons/AddNoteP";

const useStyles = makeStyles(theme => ({
    paperDialog: {
        width: 520,
        height: 520,
        position: 'absolute',
        top: 60
    },
    openBtn: {
        fontSize: 14,
        textTransform: "capitalize",
        height: 35,
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
        height: 40,
        border: `1px solid ${theme.palette.primary.borderColor}`,
        borderRadius: 4
    },
    startIcon: {
        marginRight: 5
    },
    popoverPaper: {
        boxShadow: 'none'
    },
    refundBtn: {
        fontSize: 14,
        height: 40,
    },
    inputAreaRoot: {
        height: 30,
        width: 100,
        borderRadius: 4,
        fontSize: 12
    },
    inputArea: {
        fontSize: 12
    }
}));

function ReturnProductsEmpty(props) {
    const classes = useStyles();
    const initialProducts = [
        {
            name: "Mankoushe Zaatar",
            amount: 6,
            refund: 0
        },
        {
            name: "Mankoushe Zaatar",
            amount: 6,
            refund: 0
        },
        {
            name: "Mankoushe Zaatar",
            amount: 6,
            refund: 0
        },
        {
            name: "Dairy Khoury Laban Ayran 180ml",
            amount: 12,
            refund: 0
        },
        {
            name: "Dairy Khoury Laban Ayran 180ml",
            amount: 12,
            refund: 0
        }

    ];
    const [products, setProducts] = useState(initialProducts);
    const [isRestock, setIsRestock] = useState(true);
    const [addNote, setAddNote] = useState(false);
    const [notes, setNotes] = useState({
        category: "Mistake",
        reason: ""
    });
    const [cashLbp, setCashLbo] = useState(20000);
    const [complete, setComplete] = useState(false);

    function handlePlus(index) {
        setProducts(prevState => {
            let item = prevState[index];
            item.refund++;
            return ([...prevState.slice(0, index), item, ...prevState.slice(index + 1)])
        })
    }

    function handleMinus(index) {
        setProducts(prevState => {
            let item = prevState[index];
            item.refund--;
            return ([...prevState.slice(0, index), item, ...prevState.slice(index + 1)])
        })
    }
    function handleChange(index, data) {
        setProducts(prevState => {
            let item = prevState[index];
            item.refund = data;
            return ([...prevState.slice(0, index), item, ...prevState.slice(index + 1)])
        })
    }

    function checkIfRefund() {
        if (JSON.stringify(initialProducts) === JSON.stringify(products)) {
            return true
        } else {
            return false
        }
    }

    function handleCompleteReturn() {
        props.handleCancel();
    }

    function handleAddNotes(data) {
        setAddNote(false);
        setNotes({...data})
    }

    return (
            <div className='down-body'>
                <div
                    className={clsx('pl-5 pr-5 flex flex-row justify-between height-50 align-center borderBottomLight', classes.header)}>
                    <Button color='primary' className={classes.openBtn} onClick={props.handleCancel}>
                        Cancel
                    </Button>
                    <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Return products — #SW-1-987345</p>
                    <Button color='primary' disabled>
                    </Button>
                </div>
                <div className='height-450 overflowYAuto'>
                    <div className='borderBottomLight pl-20 pr-20'>
                        {
                            products.map((item, index) => (
                                <div key={index}>
                                    <div
                                        className={clsx('height-60 flex flex-row align-center justify-between', index < products.length - 1 ? 'borderBottomLight' : '')}>
                                        <div className='flex flex-row align-center'>
                                            <div className='circleAreaProducts'>
                                                <p className='p-0 m-0 fs-12 color-light-black'>{item.amount}</p>
                                            </div>
                                            <p className='p-0 m-0 color-light-black fs-12 fw-bold'>{item.name}</p>
                                        </div>
                                        <AmountController value={item.refund}
                                                          maxValue={item.amount}
                                                          handlePlus={() => handlePlus(index)}
                                                          handleMinus={() => handleMinus(index)}
                                                          handleChange={(data) => handleChange(index, data)}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {
                        !checkIfRefund() && <div className='height-50 pl-20 pr-20 borderBottomLight'>
                            <div className='flex flex-row justify-between align-center'>
                                <p className='p-0 m-0 fs-14 color-light-black'>Restock</p>
                                <Switch
                                    disableRipple
                                    checked={isRestock}
                                    onChange={() => setIsRestock(prevState => {
                                        return !prevState
                                    })}
                                    color='primary'
                                    size='medium'
                                    name="checkedB"
                                    inputProps={{'aria-label': 'primary checkbox'}}
                                />
                            </div>
                        </div>
                    }

                    <div className='borderBottomLight pl-20 pr-20'>
                        <div className='borderBottomLight pt-10 pb-5'>
                            <div className='flex flex-row justify-between pb-10'>
                                <p className='fs-12 color-light-black p-0 m-0'>Return subtotal</p>
                                <p className={clsx('fs-12 p-0 m-0', checkIfRefund() ? 'color-light-blue' : 'color-light-black')}>{checkIfRefund() ? 'L£ 0' : 'L£ 20,000'}</p>
                            </div>
                            <div className='flex flex-row justify-between'>
                                <p className='fs-12 color-light-black p-0 m-0'>Return VAT</p>
                                <p className={clsx('fs-12 p-0 m-0', checkIfRefund() ? 'color-light-blue' : 'color-light-black')}>{checkIfRefund() ? 'L£ 0' : 'L£ 2,000'}</p>
                            </div>
                        </div>
                        <div className='height-45 flex flex-row justify-between align-center'>
                            <p className='fs-12 fw-bold color-light-black p-0 m-0'>Return total</p>
                            <p className={clsx('fs-18 fw-bold p-0 m-0', checkIfRefund() ? 'color-light-blue' : 'color-light-black')}>{checkIfRefund() ? 'L£ 0' : 'L£ 20,000'}</p>
                        </div>
                    </div>
                    {
                        !checkIfRefund() &&
                        <div className='height-60 pl-20 pr-20 pt-15 pb-5 borderBottomLight flex flex-col justify-between'>
                            <div className='flex flex-row justify-between'>
                                <p className='p-0 m-0 fs-12 color-light'>Refund amount</p>
                                <p className='p-0 m-0 fs-12 color-light'>L£ {20000 - cashLbp} remaining</p>
                            </div>
                            <div className='flex flex-row justify-between align-center'>
                                <p className='p-0 m-0 fs-12 color-light-black'>Cash (LBP)</p>
                                <CurrencyTextField
                                    className='customAreaTextMine'
                                    value={cashLbp}
                                    currencySymbol="L£"
                                    decimalCharacter="."
                                    digitGroupSeparator=","
                                    decimalPlaces={0}
                                    variant="outlined"
                                    maximumValue={'20000'}
                                    onChange={(e) => {
                                        setCashLbo(Number((e.target.value).replace(/,/g, '')))
                                    }}
                                    InputProps={{
                                        classes: {root: classes.inputAreaRoot}
                                    }}
                                />
                            </div>
                        </div>
                    }
                    {
                        !checkIfRefund() && notes.reason.length === 0 && <div className='pl-15 pr-20 pt-10 pb-10 borderBottomLight'>
                            <Button
                                startIcon={<SvgAddNoteP/>}
                                classes={{startIcon: classes.startIcon}}
                                color='primary' className={classes.openBtn}
                                onClick={() => setAddNote(true)}
                            >Add reason for return</Button>
                        </div>
                    }
                    {
                        !checkIfRefund() && notes.reason.length > 0 &&
                        <div className='pl-20 pr-20 pt-10 pb-10 borderBottomLight'>
                            <div className='flex flex-row justify-between'>
                                <p className='fs-12 p-0 m-0 color-light'>Reason for return</p>
                                <p className='fs-12 p-0 m-0 color-primary cursor-pointer' onClick={() => setAddNote(true)}>Edit</p>
                            </div>
                            <div className='pt-10'>
                                <p className='fs-12 p-0 m-0 color-light-black'>{"{" }<span className='fw-bold'>{notes.category}</span>{"}"} {notes.reason}</p>
                            </div>
                        </div>
                    }
                </div>
                <div className='pl-20 pr-20 pt-20'>
                    <Button className={classes.refundBtn} fullWidth color='primary' variant='contained'
                            disabled={checkIfRefund()} onClick={() => setComplete(true)}>{checkIfRefund() ? 'Refund' : 'Refund L£ 20,000'}</Button>
                </div>
                <CSSTransition
                    in={addNote}
                    timeout={_transitionDuration}
                    classNames="down-transition"
                    unmountOnExit
                    appear
                >
                    <ReturnProductReason
                        data={notes} handleCancel={() => setAddNote(false)}
                        handleConfirm={(data) => handleAddNotes(data)}
                    />
                </CSSTransition>
                <CSSTransition
                    in={complete}
                    timeout={_transitionDuration}
                    classNames="right-transition"
                    unmountOnExit
                    appear
                >
                    <ReturnProductsComplete
                        handleConfirm={handleCompleteReturn}
                    />
                </CSSTransition>
            </div>
    )
}

export default ReturnProductsEmpty;
