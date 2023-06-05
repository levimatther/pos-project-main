import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {IconButton, Button, Icon} from "@material-ui/core";
import clsx from "clsx";
import {_transitionDuration} from "../../constants";
import SplitPayment from "../Dialogs/CheckOut/SplitPayment/SplitPayment";
import {CSSTransition} from "react-transition-group";
import PurchaseDetailModalDialog from "../Dialogs/purchase/PurchaseDetailModalDialog";
import PurchaseHistoryModalDialog from "../Dialogs/purchase/PurchaseHistoryModalDialog";
import AddCustomerModalDialog from "../Dialogs/Customer/AddCustomerModalDialog";
import CustomerEditDialog from "../Dialogs/Customer/CustomerEditDialog";
import CustomerEditModalDialog from "../Dialogs/Customer/CustomerEditModalDialog";
import SvgPaid from "../../Icons/Paid";

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
        overflow: 'hidden',
        width: 'calc(100vw - 269px)',
        position: 'relative'
    },
    mainArea: {
        height: 'calc(100vh - 51px)',
        overflowY: 'auto'
    }
}));
function CustomerRightSection(props) {
    const classes = useStyles();
    const [showDetail, setShowDetail] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const {data} = props;
    function editCustomer() {
        setIsEdit(true);
    }
    return(
        <div className={classes.root}>
            <PurchaseHistoryModalDialog open={showMore} handleCancel={() => setShowMore(false)}/>
            <CustomerEditModalDialog open={isEdit} handleCancel={() => setIsEdit(false)}
                                    handleEdit={() => setIsEdit(false)}/>
            <div>
                <div className='height-50 borderBottomLight backgroundWhite flex flex-row justify-between align-center'>
                    <IconButton disabled/>
                    <p className='p-0 m-0 color-41 fs-14'>
                        {data && data.name}&nbsp;|&nbsp;{data && data.phone}
                    </p>
                    <Button color='primary' onClick={editCustomer}>
                        Edit
                    </Button>
                </div>
                <div className={classes.mainArea}>
                    <div className=' m-20 height-150 backgroundWhite borderRadius'>
                        <div className='pl-20 pr-20 height-30 borderBottomLight'>
                            <div className='fullWidth fullHeight flex flex-row justify-between align-center'>
                                <p className='p-0 m-0 fs-10 color-light'>Customer no:  29837443</p>
                                <p className='p-0 m-0 fs-10 color-light'>Customer ID: 29837443</p>
                            </div>
                        </div>
                        <div className='p-20 height-80'>
                            <div className='flex flex-row justify-between fullHeight align-center'>
                                <div className='flex flex-col'>
                                    <div className='text-area height-40'>
                                        <p className='p-0 m-0 fs-32 fw-bold color-light-black'>{data && data.name}</p>
                                    </div>
                                    <div className='text-area height-20 pt-5'>
                                        <p className='p-0 m-0 fs-10 color-light-black'>Customer since Mar 12, 2020</p>
                                    </div>
                                    <div className='text-area height-20 pt-5'>
                                        <p className='p-0 m-0 fs-10 color-light-black'>Male&nbsp;&nbsp;|&nbsp;&nbsp;Apr 12, 1988</p>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <p className='p-0 m-0 fs-10 color-light-black text-right'>{data && data.phone}</p>
                                    <p className='pt-10 m-0 fs-10 color-light-black text-right'>email@customer.com</p>
                                    <p className='pt-10 m-0 fs-10 color-light width-120 text-right'>Jounieh, Haret Sakher st.,
                                        1022 Bldg.,
                                        3rd floor</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='m-20 height-100 backgroundWhite borderRadius'>
                        <div className='p-20 height-60 flex'>
                            <div className='flex-25 flex flex-col justify-content align-center'>
                                <p className='p-0 m-0 fs-10 color-light-black'>
                                    Total purchases
                                </p>
                                <p className='pt-15 m-0 fs-18 fw-bold color-light-black'>
                                    154
                                </p>
                            </div>
                            <div className='flex-25 flex flex-col justify-content align-center'>
                                <p className='p-0 m-0 fs-10 color-light-black'>
                                    Total spend
                                </p>
                                <p className='pt-15 m-0 fs-18 fw-bold color-light-black'>
                                    L£ 9,000,000
                                </p>
                            </div>
                            <div className='flex-25 flex flex-col justify-content align-center'>
                                <p className='p-0 m-0 fs-10 color-light-black'>
                                    Average purchase value
                                </p>
                                <p className='pt-15 m-0 fs-18 fw-bold color-light-black'>
                                    L£ 12,000
                                </p>
                            </div>
                            <div className='flex-25 flex flex-col justify-content align-center'>
                                <p className='p-0 m-0 fs-10 color-light-black'>
                                    Total points
                                </p>
                                <p className='pt-15 m-0 fs-18 fw-bold color-light-black'>
                                    0
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='m-20 backgroundWhite borderRadius height-280'>
                        <div className='pt-10 pb-10 pl-20 pr-20 height-80 borderBottomLight flex flex-col' >
                            <p className='p-0 m-0 color-light fs-12'>
                                Recent purchases
                            </p>
                            <div className='pt-20 flex flex-row justify-between cursor-pointer' onClick={() => setShowDetail(true)}>
                                <div className='flex flex-col height-40 justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                    <div className='flex flex-row'>
                                        <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                        <SvgPaid/>
                                        <p className='pl-5 m-0 fs-10 color-primary'>Paid</p>
                                    </div>
                                </div>
                                <div className='flex flex-row height-40'>
                                    <div className='flex flex-col justify-between'>
                                        <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                        <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                    </div>
                                    <div className='pl-20 m-auto'>
                                        <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setShowDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <img className='width-10 height-10' src={"/assets/images/svg/Partial-refund.svg"} alt="logo"/>
                                    <p className='pl-5 m-0 fs-10 color-pink'>Partially refunded</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}}/>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer' onClick={() => setShowDetail(true)}>
                            <div className='flex flex-col height-40 justify-between'>
                                <p className='p-0 m-0 fs-10 color-light'>Apr 12, 2020</p>
                                <div className='flex flex-row'>
                                    <p className='p-0 m-0 fs-12 color-light-black width-60 fw-bold'>#12003</p>
                                    <img className='width-10 height-10' src={"/assets/images/svg/circle-r.svg"} alt="logo"/>
                                    <p className='pl-5 m-0 fs-10 color-pink'>Refunded</p>
                                </div>
                            </div>
                            <div className='flex flex-row height-40'>
                                <div className='flex flex-col justify-between'>
                                    <p className='p-0 m-0 fs-10 color-light text-right'>6:26 AM</p>
                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black text-right'>L£ 20,000</p>
                                </div>
                                <div className='pl-20 m-auto'>
                                    <Icon className='fa fa-angle-right' color='disabled' style={{fontSize: 16}}/>
                                </div>
                            </div>
                        </div>
                        <div className='height-40 borderBottomLight flex justify-content align-center cursor-pointer' onClick={() => setShowMore(true)}>
                            <p className='p-0 m-0 fs-14 color-primary'>View more purchases</p>
                        </div>
                    </div>

                </div>
            </div>
            <CSSTransition
                in={showDetail}
                classNames="checkOutSlideSection"
                timeout={_transitionDuration}
            >
                <PurchaseDetailModalDialog handleCancel={() => setShowDetail(false)}/>
            </CSSTransition>
        </div>
    )
}
export default CustomerRightSection;
