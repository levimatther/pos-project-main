import React, {useEffect, useState} from "react";
import {
    Dialog,
    Button,
    FormControlLabel,
    Checkbox,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Transition from "./Transitions/Transition";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {_numberWithCommas, _transitionDuration} from "../../constants";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        height: 520,
        position: 'absolute',
        top: 60
    },
    header: {
        color: theme.palette.primary.modalText,
        borderBottom: `1px solid ${theme.palette.primary.borderColor}`
    },
    searchArea: {
        borderBottom: `1px solid ${theme.palette.primary.borderColor}`
    },
    contained: {
        boxShadow: 'none'
    },
    trashBtn: {
        color: theme.palette.danger.main,
        padding: 0,
    },
    mergeBtn: {
        color: theme.palette.primary.main,
        padding: 0,
        marginLeft: 10
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
        border: `1px solid ${theme.palette.primary.borderColor}`,
        height: 40,
        borderRadius: 4
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
    },
    salesArea: {
        borderBottom: `1px solid ${theme.palette.primary.borderColor}`,
        paddingLeft: 20,
        paddingRight: 20,
        height: 55
    },
    labelDisabled: {
        color: theme.palette.primary.product
    },
    topCheckbox: {
        paddingLeft: 0
    },
    column1: {
        flexBasis: '70%',
    },
    column2: {
        flexBasis: '30%',
        display: 'flex',
        justifyContent: 'flex-end'
    },
    row: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        color: theme.palette.primary.product
    },
    customSummary: {
        flexDirection: 'row-reverse',
        paddingLeft: 20,
        borderBottom: `1px solid ${theme.palette.primary.borderColor}`,
        height: 55
    },
    expandIcon: {
        paddingLeft: 0,
        paddingRight: 0,
        marginRight: 1
    },
    customCheckControl: {
        margin: 0
    },
    openBtn: {
        fontSize: 14,
        textTransform: "capitalize",
        height: 35,
    },
}));

function MergeWidhDialog(props) {
    const classes = useStyles();


    const [searchWord, setSearchWord] = useState('');
    const [isMerge, setIsMerge] = useState(false);

    const deliveries = [
        {
            customer: {
                name: "Richard Lopez",
                email: "email@customer.com",
                phone: "03-123445",
                shortName: 'RL'
            },
            name: "Sale 1",
            price: 86000,
            time: 3,
            items: [
                {
                    name: "Mankoushe Cheese",
                    price: 20000,
                    quantity: 2,
                    variant: "Extra cheese, Vegetables, Hot paste",
                    comment: "Comments will be in italic font style"
                },
                {
                    name: "Dairy Khoury Laban Ayran 180ml",
                    price: 22000,
                    quantity: 0.24,
                    variant: "Extra cheese, Vegetables, Hot paste",
                    comment: "Comments will be in italic font style"
                },
                {
                    name: "Mankoushe Zaatar",
                    price: 20000,
                    quantity: 2,
                    variant: "Extra cheese, Vegetables, Hot paste",
                },
                {
                    name: "Pita",
                    price: 20000,
                    quantity: 2,
                },
                {
                    name: "Mankoushe Cheese",
                    price: 20000,
                    quantity: 2,
                    variant: "Extra cheese, Vegetables, Hot paste",
                    comment: "Comments will be in italic font style"
                },
                {
                    name: "Dairy Khoury Laban Ayran 180ml",
                    price: 22000,
                    quantity: 0.24,
                    variant: "Extra cheese, Vegetables, Hot paste",
                    comment: "Comments will be in italic font style"
                },
                {
                    name: "Mankoushe Zaatar",
                    price: 20000,
                    quantity: 2,
                    variant: "Extra cheese, Vegetables, Hot paste",
                },
                {
                    name: "Pita",
                    price: 20000,
                    quantity: 2,
                },
            ],
            change: 1500
        },
        {
            name: "Sale 2",
            price: 123000,
            time: 3,
            items: [
                {
                    name: "Mankoushe Cheese",
                    price: 20000,
                    quantity: 2,
                    variant: "Extra cheese, Vegetables, Hot paste",
                    comment: "Comments will be in italic font style"
                },
                {
                    name: "Dairy Khoury Laban Ayran 180ml",
                    price: 22000,
                    quantity: 0.24,
                    variant: "Extra cheese, Vegetables, Hot paste",
                    comment: "Comments will be in italic font style"
                },
                {
                    name: "Mankoushe Zaatar",
                    price: 20000,
                    quantity: 2,
                    variant: "Extra cheese, Vegetables, Hot paste",
                },
                {
                    name: "Pita",
                    price: 20000,
                    quantity: 2,
                },
            ]
        },
        {
            customer: {
                name: "Vladimir",
                email: "email@customer.com",
                phone: "03-123445",
                shortName: 'V'
            },
            name: "Sale 3",
            price: 546000,
            time: 3,
            items: [
                {
                    name: "Mankoushe Cheese",
                    price: 20000,
                    quantity: 2,
                    variant: "Extra cheese, Vegetables, Hot paste",
                    comment: "Comments will be in italic font style"
                },
                {
                    name: "Dairy Khoury Laban Ayran 180ml",
                    price: 22000,
                    quantity: 0.24,
                    variant: "Extra cheese, Vegetables, Hot paste",
                    comment: "Comments will be in italic font style"
                },
                {
                    name: "Mankoushe Zaatar",
                    price: 20000,
                    quantity: 2,
                    variant: "Extra cheese, Vegetables, Hot paste",
                },
                {
                    name: "Pita",
                    price: 20000,
                    quantity: 2,
                },
            ]
        },
        {
            customer: {
                name: "Horbatovski",
                email: "email@customer.com",
                phone: "03-123445",
                shortName: 'H'
            },
            name: "Sale 4",
            price: 80000,
            time: 3,
            items: [
                {
                    name: "Mankoushe Cheese",
                    price: 20000,
                    quantity: 2,
                    variant: "Extra cheese, Vegetables, Hot paste",
                    comment: "Comments will be in italic font style"
                },
                {
                    name: "Dairy Khoury Laban Ayran 180ml",
                    price: 22000,
                    quantity: 0.24,
                    variant: "Extra cheese, Vegetables, Hot paste",
                    comment: "Comments will be in italic font style"
                },
                {
                    name: "Mankoushe Zaatar",
                    price: 20000,
                    quantity: 2,
                    variant: "Extra cheese, Vegetables, Hot paste",
                },
                {
                    name: "Pita",
                    price: 20000,
                    quantity: 2,
                },
            ]
        }
    ];
    const [checked, setChecked] = useState(deliveries.map((item) => {
        return {...item, checked: false}
    }));
    useEffect(() => {
        const checkedItems = checked.filter((item) => {
            return item.checked;
        });
        if (checkedItems.length > 1) {
            setIsMerge(true)
        } else {
            setIsMerge(false)
        }
    }, [checked]);

    function checkIsAll() {
        let flag = true;
        checked.map((item, index) => {
            flag = flag && item.checked;
        });
        return flag;
    }

    function handleChecked(item) {
        let index = checked.indexOf(item);
        setChecked(prevState => {
            item.checked = !prevState[index].checked;
            return [...prevState.slice(0, index), item, ...prevState.slice(index + 1)]
        })
    }

    function changeSearch(value) {
        setSearchWord(value);
    }

    function handleMergeSales() {
        let checkedSales = checked.filter((item) => {
            return item.checked;
        });
        let firstItem = checkedSales[0];
        let firstIndex = checked.indexOf(firstItem);
        let newItem = checked.slice(0);
        for (let i = checkedSales.length; i > 1; i--) {
            let item = checkedSales[i - 1];
            firstItem.items = [...firstItem.items, ...item.items];
            firstItem.price += item.price;
            let index = checked.indexOf(item);
            newItem.splice(index, 1);
        }
        setChecked([...newItem.slice(0, firstIndex), {
            ...firstItem,
            time: 0,
            checked: false
        }, ...newItem.slice(firstIndex + 1)]);
    }

    function handleCheckAll(e) {
        let flag = e.target.checked;

        setChecked(prevState => {
            let newChecked = prevState.map((item) => {
                return ({...item, checked: flag})
            });
            return [...newChecked];
        });
    }

    return (
        <Dialog open={props.open} classes={{paper: classes.dialogPaper}} TransitionComponent={Transition}
                transitionDuration={_transitionDuration} onClose={props.handleCancel}>
            <div className={clsx('pl-20 pr-5 flex flex-row justify-between height-50 align-center', classes.header)}>
                <p className='cursor-pointer p-0 m-0 fs-14 color-primary' onClick={props.handleCancel}>Cancel</p>
                <p className='p-0 m-0 fs-16 fw-bold'>Merge with…</p>
                <div>
                    <Button color='primary' className={classes.openBtn} disabled={!isMerge} onClick={handleMergeSales}>Merge</Button>
                </div>
            </div>
            <div className='height-450'>
                <div className={clsx('pl-55 pr-16 flex flex-row align-center height-40 borderBottomLight')}>
                    <Checkbox
                        checked={checkIsAll()}
                        onChange={(e) => {
                            handleCheckAll(e)
                        }}
                        name="checkedB"
                        color="primary"
                        className={classes.topCheckbox}
                    />
                    <div className={classes.row}>
                        <div className={classes.column1}>
                            <p className='fs-12 p-0 m-0 fw-bold'>Pending sales</p>
                        </div>
                        <div className={classes.column2}>
                            <p className='fs-12 p-0 m-0 fw-bold'>Amount</p>
                        </div>
                    </div>
                </div>
                {checked.filter((item) => {
                    return item.name.toLowerCase().includes(searchWord.toLowerCase())
                }).map((item, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            className={classes.customSummary}
                            classes={{expandIcon: classes.expandIcon}}
                        >
                            <div className='fullWidth flex height-30'>
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Checkbox color="primary" checked={item.checked} onChange={() => handleChecked(item)}/>}
                                    className={classes.customCheckControl}
                                />
                                <div className={classes.row}>
                                    <div className={classes.column1}>
                                        <p className='fs-14 p-0 m-0'>{`${item.name} (${item.items.length} items)`}</p>
                                    </div>
                                    <div className={classes.column2}>
                                        <p className='fs-14 p-0 m-0'>{`L£ ${_numberWithCommas(item.price)}`}</p></div>
                                </div>
                            </div>
                            <p className='pl-40 m-0 fs-10 f-italic color-light-blue'>{item.time} minutes ago</p>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className='flex flex-col fullWidth'>
                                {
                                    item.customer && <div
                                        className='borderBottomLight align-center flex height-50 flex-row justify-between fullWidth'>
                                        <div className='flex flex-row'>
                                            <div className='circleArea backcolor-pink'>
                                                <p className='p-0 m-0 fs-12 fw-bold color-pink'>{item.customer.shortName}</p>
                                            </div>
                                            <div className='nameArea'>
                                                <p className='m-0 fs-14 fw-bold color-light-black'>{item.customer.name}</p>
                                                <p className='pt-5 m-0 fs-10 color-light'>{`${item.customer.phone} | ${item.customer.email}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {
                                    item.items.map((it, inx) => (
                                        <div
                                            className='borderBottomLight align-center flex height-50 flex-row justify-between fullWidth'
                                            key={inx}>
                                            <div className='flex flex-row'>
                                                <div className='circleArea normal'>
                                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black'>{it.quantity}</p>
                                                </div>
                                                <div className='nameArea'>
                                                    <p className='m-0 fs-14 fw-bold color-light-black'>{it.name}</p>
                                                    {it.variant &&
                                                    <p className='pt-3 m-0 fs-10 color-light'>{it.variant}</p>}
                                                    {it.comment &&
                                                    <p className='pt-3 m-0 fs-10 color-light f-italic'>{it.comment}</p>}
                                                </div>
                                            </div>

                                            <div className='checkPrice'>
                                                <p className='p-0 m-0 fs-14 fw-bold color-light-black'>L£ {_numberWithCommas(it.price)}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </Dialog>
    )
}

export default MergeWidhDialog;
