import React, {useEffect, useState} from "react";
import {Dialog, Icon, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import CustomerEditDialog from "./CustomerEditDialog";
import Transition from "../Transitions/Transition";
import PurchaseHistoryDialog from "../purchase/PurchaseHistory";
import PurchaseDetailDialog from "../purchase/PurchaseDetail";
import {_transitionDuration} from "../../../constants";
import {CSSTransition} from "react-transition-group";
import SvgPaid from "../../../Icons/Paid";

const useStyles = makeStyles(theme => ({
    paperDialog: {
        position: 'absolute',
        top: 60,
        width: 520,
        height: 580,
        overflow: 'hidden'
    },
    openBtn: {
        fontSize: 14,
        textTransform: "capitalize",
        height: 35,
    },
}));

function CustomerInfoDialog(props) {
    const classes = useStyles();
    const {data} = props;
    const [isEdit, setisEdit] = useState(false);
    const [morePurchases, setMorePurchase] = useState(false);
    const [detailPurchase, setDetailPurchase] = useState(false);
    useEffect(() => {
        setisEdit(false);
        setMorePurchase(false);
        setDetailPurchase(false);
    }, [props]);

    function editCustomer() {
        setisEdit(true);
    }

    function handleEdit() {
        setisEdit(false);
    }

    return (
        <Dialog open={props.open} classes={{paper: classes.paperDialog}} TransitionComponent={Transition}
                transitionDuration={_transitionDuration} onClose={props.handleCancel}>
            <div>
                <div
                    className={clsx('pl-5 flex flex-row justify-between height-50 align-center borderBottomLight', classes.header)}>
                    <Button color='primary' className={classes.openBtn} onClick={props.handleCancel}>
                        Close
                    </Button>
                    <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Customer details</p>
                    <Button color='primary' className={classes.openBtn} onClick={editCustomer}>
                        Edit
                    </Button>
                </div>
                <div className='pl-20 pr-20 height-30 borderBottomLight'>
                    <div className='fullWidth fullHeight flex flex-row justify-between align-center'>
                        <p className='p-0 m-0 fs-10 color-light'>Customer no: {data && data.no}</p>
                        <p className='p-0 m-0 fs-10 color-light'>Customer ID: {data && data.id}</p>
                    </div>
                </div>
                <div className='p-20 borderBottomLight background-F0 height-80'>
                    <div className='flex flex-row justify-between fullHeight align-center'>
                        <div className='flex flex-col'>
                            <div className='text-area height-40'>
                                <p className='p-0 m-0 fs-32 fw-bold color-light-black'>{data && data.name}</p>
                            </div>
                            <div className='text-area height-20 pt-5'>
                                <p className='p-0 m-0 fs-10 color-light-black'>Customer since Mar 12, 2020</p>
                            </div>
                            <div className='text-area height-20 pt-5'>
                                <p className='p-0 m-0 fs-10 color-light-black'>Male | Apr 12, 1988</p>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <p className='p-0 m-0 fs-10 color-light-black text-right'>71 234223</p>
                            <p className='pt-10 m-0 fs-10 color-light-black text-right'>{data && data.mail}</p>
                            <p className='pt-10 m-0 fs-10 color-light width-120 text-right'>Jounieh, Haret Sakher st.,
                                1022 Bldg.,
                                3rd floor</p>
                        </div>
                    </div>
                </div>
                <div className='p-20 borderBottomLight height-60 flex'>
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
                <div className='pt-10 pb-10 pl-20 pr-20 height-80 borderBottomLight flex flex-col'>
                    <p className='p-0 m-0 color-light fs-12'>
                        Recent purchases
                    </p>
                    <div className='pt-20 flex flex-row justify-between cursor-pointer'
                         onClick={() => setDetailPurchase(true)}>
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
                <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer'
                     onClick={() => setDetailPurchase(true)}>
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
                <div className='flex flex-row justify-between pt-10 pb-10 pl-20 pr-20 borderBottomLight cursor-pointer'
                     onClick={() => setDetailPurchase(true)}>
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
                <div className='height-40 borderBottomLight flex justify-content align-center cursor-pointer'
                     onClick={() => setMorePurchase(true)}>
                    <p className='p-0 m-0 fs-14 color-primary'>View more purchases</p>
                </div>
            </div>
            <CSSTransition
                in={morePurchases}
                timeout={_transitionDuration}
                classNames="down-transition"
                unmountOnExit
                appear
            >
                <PurchaseHistoryDialog handleCancel={() => setMorePurchase(false)}/>
            </CSSTransition>
            <CSSTransition
                in={detailPurchase}
                timeout={_transitionDuration}
                classNames="right-transition"
                unmountOnExit
                appear
            >
                <PurchaseDetailDialog handleCancel={() => setDetailPurchase(false)}/>
            </CSSTransition>
            <CSSTransition
                in={isEdit}
                timeout={_transitionDuration}
                classNames="list-transition"
                unmountOnExit
                appear
            >
                <CustomerEditDialog
                    handleCancel={() => setisEdit(false)}
                    handleEdit={handleEdit}/>
            </CSSTransition>
        </Dialog>
    )
}

export default CustomerInfoDialog;
