import React, {useState} from "react";
import {Button, Popover, Icon} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import EmailReceiptDialog from "./EmailReceiptDialog";
import ReturnProductsEmpty from "../ReturnProducts/ReturnProductsEmpty";
import clsx from "clsx";
import {CSSTransition} from "react-transition-group";
import PurchaseAddNote from "./PurchaseAddNnote";
import SvgAddNote from "../../../Icons/AddNote";
import SvgPrinter from "../../../Icons/Printer";
import SvgEmail from "../../../Icons/Email";
import SvgWhatsapp from "../../../Icons/Whatsapp";
import {_transitionDuration} from "../../../constants";
import SvgAdd from "../../../Icons/Add";
import SvgAddNoteG from "../../../Icons/AddNoteG";
import SvgAddNoteP from "../../../Icons/AddNoteP";
import SvgTooltip from "../../../Icons/Tooltip";

const useStyles = makeStyles(theme => ({
    paperDialog: {
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
        marginRight: 0
    },
    addNote: {
        marginRight: 5
    },
    popoverPaper: {
        boxShadow: 'none'
    }
}));

function PurchaseDetailDialog(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showEmailReceipt, setShowEmailReceipt] = useState(false);
    const [addNote, setAddNote] = useState(false);
    const [refundProducts, setRefundProducts] = useState(false);
    const [newNotes, setNewNotes] = useState('');
    const products = [
        {
            amount: 6,
            name: 'Mankoushe Zaatar',
            variant: "Extra cheese, Vegetables, Hot paste",
            price: "L£ 20,000",
            returned: 'Returned x 3'
        },
        {
            amount: 12,
            name: 'Dairy Khoury Laban Ayran 180ml',
            price: "L£ 220,000",
            returned: 'Returned x 4'
        },
        {
            amount: 2,
            name: 'Mankoushe Cheese',
            variant: "Extra cheese, Vegetables, Hot paste",
            comment: "Comments will be in italic font style",
            price: "L£ 20,000",
            returned: 'Returned x 2'
        },
        {
            amount: 7,
            name: 'Dairy Khoury Labneh Ayran 250ml',
            comment: "Comments will be in italic font style",
            price: "L£ 12,000",
            returned: 'Returned x 1'
        },
    ]

    function handlePopOver(e) {
        setAnchorEl(e.currentTarget);
    }
    function handlePopoverClose() {
        setAnchorEl(null);
    }
    const open = Boolean(anchorEl);

    function handleNotes(data) {
        setAddNote(false);
        setNewNotes(data);
    }

    return (
            <div className='right-body'>
                <EmailReceiptDialog open={showEmailReceipt} handleCancel={() => setShowEmailReceipt(false)}/>
                <div
                    className='pl-5 pr-5 flex flex-row justify-between height-50 align-center borderBottomLight'>
                    <Button
                        startIcon={<ArrowLeftIcon/>}
                        classes={{startIcon: classes.startIcon}}
                        color='primary' className={classes.openBtn} onClick={props.handleCancel}>Back</Button>
                    <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Purchase details</p>
                    <Button color='primary' disabled className={classes.openBtn} onClick={props.handleCancel}></Button>
                </div>
                <div className='height-530'>
                    {/*Price section*/}
                    <div className='p-20 borderBottomLight background-F0 height-80'>
                        <div className='flex flex-row justify-between fullHeight align-center'>
                            <div className='flex flex-col'>
                                <div className='text-area height-40'>
                                    <p className='p-0 m-0 fs-32 fw-bold color-light-black'>L£ 7,500</p>
                                </div>
                                <div className='text-area height-20 pt-5'>
                                    <p className='p-0 m-0 fs-10 color-light-black'>April 12, 2020 at 12:45 PM</p>
                                </div>
                            </div>
                            <div className='flex flex-col align-end'>
                                <div className='flex flex-row justify-between align-center'>
                                    <img className='width-10 height-10' src={"/assets/images/svg/Partial-refund.svg"}
                                         alt="logo"/>
                                    <p className='pl-5 m-0 fs-10 color-pink text-right'>Partially refunded</p>
                                </div>
                                <p className='pt-5 m-0 fs-10 color-light-black'>Sold by James Franko</p>
                                <p className='pt-5 m-0 fs-10 color-light-black'>West Side Location &nbsp;&nbsp;  | &nbsp;&nbsp; POS 2</p>
                            </div>
                        </div>
                    </div>

                    {/*Customer section*/}
                    <div className='pl-20 pr-20 pt-10 pb-10 height-60 borderBottomLight'>
                        <p className='pb-5 m-0 fs-12 color-light-blue'>Customer</p>
                        <div className='flex flex-row align-center cursor-pointer'>
                            <div className='circleAreaCustomer backcolor-pink'>
                                <p className='p-0 m-0 fs-14 fw-bold color-pink'>RL</p>
                            </div>
                            <div className='nameArea'>
                                <p className='m-0 fs-14 fw-bold color-light-black'>Richard Lopez</p>
                                <p className='pt-5 m-0 fs-10 color-light'>03-123445 &nbsp;&nbsp; | &nbsp;&nbsp; email@customer.com</p>
                            </div>
                        </div>
                    </div>

                    {/*Products section*/}
                    <div className='pl-20 pr-20 pt-10 pb-10 borderBottomLight'>
                        <p className='pb-5 m-0 color-light-blue fs-12'>Products</p>
                        {
                            products.map((item, index) => (
                                <div
                                    className={clsx('borderBottomLight align-center flex flex-row justify-between fullWidth', item.variant && item.comment? 'height-65' : 'height-50')}
                                    key={index}>
                                    <div className='flex flex-row align-center'>
                                        <div className='circleArea normal'>
                                            <p className='p-0 m-0 fs-12 fw-bold color-light-black'>{item.amount}</p>
                                        </div>
                                        <div className='nameArea'>
                                            <p className='m-0 fs-12 fw-bold color-light-black'>{item.name}</p>
                                            {item.variant &&
                                            <p className='pt-3 m-0 fs-10 color-light'>{item.variant}</p>}
                                            {item.comment &&
                                            <p className='pt-3 m-0 fs-10 color-light f-italic'>{item.comment}</p>}
                                        </div>
                                    </div>

                                    <div className='checkPrice'>
                                        <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>{item.price}</p>
                                        <p className='p-0 m-0 fs-10 color-FF text-right'>{item.returned}</p>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='pt-10'>
                            <Button fullWidth color='primary' variant='contained' onClick={() => setRefundProducts(true)}>Refund products</Button>
                        </div>
                    </div>

                    {/*Payment section*/}
                    <div className='pl-20 pr-20 pt-10 pb-10 borderBottomLight'>
                        <p className='pb-5 m-0 color-light-blue fs-12'>Payment</p>
                        <div className='flex flex-row justify-between pb-10 pt-10'>
                            <p className='p-0 m-0 fs-12 color-light-black'>Subtotal</p>
                            <p className='p-0 m-0 fs-12 color-light-black'>L£ 20,000</p>
                        </div>
                        <div className='flex flex-row justify-between pb-10'>
                            <p className='p-0 m-0 fs-12 color-light-black'>{'Discount  {'}<span className='fw-bold'>New Customer</span>{'}'}
                            </p>
                            <p className='p-0 m-0 fs-12 color-pink'>- L£ 20,000</p>
                        </div>
                        <div className='flex flex-row justify-between pb-10'>
                            <p className='p-0 m-0 fs-12 color-light-black'>VAT (11% included)</p>
                            <p className='p-0 m-0 fs-12 color-light-black'>L£ 1,100</p>
                        </div>
                        <div className='flex flex-row justify-between pb-10'>
                            <p className='p-0 m-0 fs-12 color-light-black fw-bold'>Total paid</p>
                            <p className='p-0 m-0 fs-12 color-light-black fw-bold'>L£ 10,000</p>
                        </div>
                        <div className='flex flex-row justify-between pb-10 borderBottomLight'>
                            <p className='p-0 m-0 fs-12 color-pink'>Refunded</p>
                            <p className='p-0 m-0 fs-12 color-pink'>- L£ 1,5000</p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className='pt-10 pb-10 m-0 color-light-black fw-bold fs-12'>Net payment</p>
                            <p className='pt-10 pb-10 m-0 color-light-black fw-bold fs-18'>L£ 8,500</p>
                        </div>
                        <Button color='primary' variant='contained' fullWidth endIcon={<Icon className='fa fa-angle-up' style={{fontSize: 12}}></Icon>} onClick={(e) => handlePopOver(e)}>Receipt</Button>
                        <Popover
                            PaperProps={{
                                classes: {elevation8: classes.popoverPaper}
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                        >
                            <div className='receiptPopover'>
                                <div className='mainSection'>
                                    <div className='height-34 borderBottomLight flex flex-row pl-10 align-center cursor-pointer' onClick={() => handlePopoverClose()}>
                                        {/*<Icon className='fa fa-print' style={{fontSize: 14, color: "white"}}></Icon>*/}
                                        <SvgPrinter/>
                                        <p className='pl-10 m-0 fs-14 color-white'>Print receipt</p>
                                    </div>
                                    <div className='height-34 borderBottomLight flex flex-row pl-10 align-center cursor-pointer' onClick={() => {setShowEmailReceipt(true); handlePopoverClose()}}>
                                        {/*<Icon className='fa fa-envelope' style={{fontSize: 14, color: "white"}}></Icon>*/}
                                        <SvgEmail/>
                                        <p className='pl-10 m-0 fs-14 color-white'>Email receipt</p>
                                    </div>
                                    <div className='height-34 flex flex-row pl-10 align-center cursor-pointer' onClick={() => handlePopoverClose()}>
                                        {/*<Icon className='fa fa-phone-square' style={{fontSize: 14, color: "white"}}></Icon>*/}
                                        <SvgWhatsapp/>
                                        <p className='pl-10 m-0 fs-14 color-white'>Whatsapp receipt</p>
                                    </div>
                                </div>
                                <div className='triangle'>
                                    {/*<img className='width-16 height-7' src={"/assets/images/Triangle.png"} alt="logo" />*/}
                                    <SvgTooltip/>
                                </div>
                            </div>
                        </Popover>
                    </div>

                    {/*Payment details*/}
                    <div className='pl-20 pr-20 pt-10 pb-10 borderBottomLight'>
                        <p className='pb-5 m-0 color-light-blue fs-12'>Payment details</p>
                        <div className='pt-10 flex flex-row justify-between align-center'>
                            <div className='flex flex-col'>
                                <p className='color-light-black p-0 m-0 fs-12'>Cash (LBP)</p>
                                <p className='color-light pt-5 m-0 fs-10'>Apr 12, 2020 at 12:45 PM</p>
                            </div>
                            <p className='p-0 m-0 fs-12 color-light-black'>L£ 20,000</p>
                        </div>
                        <div className='pt-10 flex flex-row justify-between align-center'>
                            <div className='flex flex-col'>
                                <p className='color-pink p-0 m-0 fs-12'>Cash (LBP) - REFUND</p>
                                <p className='color-light pt-5 m-0 fs-10'>Apr 12, 2020 at 12:45 PM</p>
                            </div>
                            <p className='p-0 m-0 fs-12 color-pink'> -L£ 5,000</p>
                        </div>
                        <div className='pt-10 flex flex-row justify-between align-center'>
                            <div className='flex flex-col'>
                                <p className='color-pink p-0 m-0 fs-12'>Cash (LBP) - REFUND</p>
                                <p className='color-light pt-5 m-0 fs-10'>Apr 12, 2020 at 12:45 PM</p>
                            </div>
                            <p className='p-0 m-0 fs-12 color-pink'> -L£ 10,000</p>
                        </div>
                    </div>

                    {/*Add notes section*/}
                    {
                        newNotes.length === 0 &&  <div className='pl-15 pr-20 pt-10 pb-10 borderBottomLight'>
                            <Button
                                startIcon={<SvgAddNoteP/>}
                                classes={{startIcon: classes.addNote}}
                                color='primary' className={classes.openBtn}
                                onClick={() => setAddNote(true)}
                            >Add note</Button>
                        </div>
                    }
                    {
                        newNotes.length !== 0 && <div className='pl-20 pr-20 pt-10 pb-10 borderBottomLight'>
                            <div className='flex flex-row justify-between'>
                                <p className='fs-12 p-0 m-0 color-light'>Notes</p>
                                <p className='fs-12 p-0 m-0 color-primary cursor-pointer' onClick={() => setAddNote(true)}>Edit</p>
                            </div>
                            <div className='pt-10'>
                                <p className='fs-12 p-0 m-0 color-light-black'>{newNotes}</p>
                            </div>
                        </div>
                    }
                    {/*Refund reasons*/}
                    <div className='pl-20 pr-20 pt-10 pb-20'>
                        <p className='pb-5 m-0 color-light-blue fs-12'>Refund reasons</p>
                        <div className='pt-10 '>
                            <p className='color-light-black p-0 m-0 fs-12'>{'{'}<span className='fw-bold'>Mistake</span>{'} Refund reason goes here.'}</p>
                            <p className='color-light pt-5 m-0 fs-10'>Apr 12, 2020 at 12:45 PM</p>
                        </div>
                        <div className='pt-10 '>
                            <p className='color-light-black p-0 m-0 fs-12'>{'{'}<span className='fw-bold'>Damaged</span>{'} For each refund, there will be a new line which includes reason.'}</p>
                            <p className='color-light pt-5 m-0 fs-10'>Apr 12, 2020 at 12:45 PM</p>
                        </div>
                    </div>
                </div>
                <CSSTransition
                    in={refundProducts}
                    timeout={_transitionDuration}
                    classNames="down-transition"
                    unmountOnExit
                    appear
                >
                    <ReturnProductsEmpty handleCancel={() => setRefundProducts(false)}/>
                </CSSTransition>
                <CSSTransition
                    in={addNote}
                    timeout={_transitionDuration}
                    classNames="down-transition"
                    unmountOnExit
                    appear
                >
                    <PurchaseAddNote
                        data = {newNotes}
                        handleCancel={() => setAddNote(false)}
                        handleConfirm={(data) => handleNotes(data)}
                    />
                </CSSTransition>
            </div>
    )
}

export default PurchaseDetailDialog;
