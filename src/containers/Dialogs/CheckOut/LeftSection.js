import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {Icon} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {Swipeable} from 'react-swipeable'
import SplitSalesDialog from "../SplitSales/SplitSalesDialog";
import {Customer, TrashW} from "../../../Icons";
import CustomersDialog from "../Customer/CustomersDialog";
import {_numberWithCommas} from "../../../constants";
import SvgCustomerInfo from "../../../Icons/CustomerInfo";

const useStyle = makeStyles(theme => (
    {
        root: {
            width: theme.width.takeAway,
            backgroundColor: theme.palette.primary.backWhite,
            height: '100VH',
            borderLeft: `1px solid ${theme.palette.primary.borderColor}`,
            position: 'relative',
            overflowX: 'hidden',
            color: theme.palette.primary.headerColor
        },
        trashBtn: {
            color: theme.palette.danger.main,
            padding: 0,
        },
        moreBtn: {
            color: theme.palette.primary.main,
            padding: 0
        },
        headerTitle: {
            color: theme.palette.primary.headerColor
        },
        addCustomer: {
            color: theme.palette.primary.main,
            paddingLeft: 10
        },
        mainPopoverRoot: {
            width: 160,
            height: 150,
            borderRadius: 5,
            background: '#ffffff',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
        },
        oneProduct: {
            height: 50,
            borderBottom: `1px solid ${theme.palette.primary.borderColor}`,
            overflow: 'hidden'
        },
        productsArea: {
            paddingLeft: 10,
            paddingRight: 10,
            height: 'calc(100vh - 300px)',
            overflow: 'overlay',
        },
        removeBtn: {
            backgroundColor: theme.palette.primary.danger,
            color: 'white',
            height: 50,
            width: 50
        },
        customerRemoveBtn: {
            backgroundColor: theme.palette.primary.danger,
            color: 'white',
            height: 40,
            width: 40
        },
        button: {
            color: 'white',
            fontSize: 14,
            textTransform: "capitalize",
            borderRadius: 0,
        },
        width124: {
            width: 124
        },
        width50: {
            width: 50,
            minWidth: 50,
            height: 50
        },
        widthFull: {
            height: 50
        },
        width165: {
            width: 165,
            minWidth: 165,
            height: 50
        },
        removeBtnRoot: {
            borderRadius: 0
        },
        contained: {
            boxShadow: 'none',
        },
        startIcon: {
            position: 'absolute',
            top: 10,
            margin: 0
        },
        label: {
            paddingTop: 14
        },
        primaryBtn: {
            backgroundColor: theme.palette.primary.main
        },
        disabledBtn: {
            backgroundColor: theme.palette.primary.disabled
        },
        customInput: {
            padding: 0
        }
    }
));

function LeftSection(props) {
    const classes = useStyle();
    const products = props.checkout;
    const isTakeAway = props.isTakeAway;
    const [splitSale, setSplitSale] = useState(false);
    const [showCustomers, setShowCustomers] = useState(false);
    const [customerDetail, setCustomeDetail] = useState(null);
    const [removeCustomer, setRemoveCustomer] = useState(false);
    useEffect(() => {
        setCustomeDetail(props.customerDetail)
    }, [props]);
    function addCustomer() {
        setShowCustomers(true);
    }
    function selectCustomer(data) {
        setCustomeDetail(data);
        setShowCustomers(false);
    }

    return (
        <div className={classes.root}>
            <SplitSalesDialog
                open={splitSale}
                handleCancel={() => setSplitSale(false)}
                handleConfirm={() => setSplitSale(false)}
            />
            <CustomersDialog
                open={showCustomers}
                handleCancel={() => setShowCustomers(false)}
                handleConfirm={selectCustomer}
            />
            <div className='height-50 borderBottomLight flex justify-content align-center'>
                <p className={clsx('p-0 m-0 fs-14 fw-bold', classes.headerTitle)}>{isTakeAway ? 'Takeaway' : 'Delivery'}</p>
            </div>
            {
                !customerDetail &&
                <div className={'customerHeader'} onClick={addCustomer}>
                    <IconButton aria-label="delete" disabled={false} className={classes.moreBtn}>
                        <Customer style={{fontSize: 14}}></Customer>
                    </IconButton>
                    <p className={clsx('p-0 m-0 fs-14 ', classes.addCustomer)}>Add customer</p>
                </div>
            }
            {
                customerDetail &&
                <div className={clsx(removeCustomer ? 'customer-left-side' : 'customer-right-side', 'transitionArea')}>
                    <Swipeable
                        onSwipedLeft={() => {setRemoveCustomer(true)}}
                        onSwipedRight={() => setRemoveCustomer(false)}
                        trackMouse={true}
                        preventDefaultTouchmoveEvent={true}
                    >
                        <div className='customerHeader justify-between'>
                            <div className='flex flex-row'>
                                <div className='circleArea backcolor-pink'>
                                    <p className='p-0 m-0 fs-12 fw-bold color-pink'>{customerDetail.shortName}</p>
                                </div>
                                <div className='nameArea'>
                                    <p className='m-0 fs-10 fw-bold color-light-black'>{customerDetail.name}</p>
                                    <p className='pt-5 m-0 fs-8 color-light'>{`${customerDetail.phone} | ${customerDetail.mail}`}</p>
                                </div>
                            </div>
                            <SvgCustomerInfo/>
                        </div>
                    </Swipeable>
                    <div className='removeArea'>
                        <IconButton aria-label="delete" className={classes.customerRemoveBtn}
                                    onClick={() => {setCustomeDetail(null); setRemoveCustomer(false)}}
                                    classes={{root: classes.removeBtnRoot}}
                        >
                            <TrashW style={{fontSize: 18}}/>
                        </IconButton>
                    </div>
                </div>
            }
            <div className={classes.productsArea}>
                {
                    products.map((item, index) => (
                        <div id={index} name={item.name} className={clsx(classes.oneProduct, ((item['variant'] && item.comment) || (item.modifiers && item.comment)) ? 'height-65' : 'height-50')} key={index}>
                            <div className={clsx('transitionArea')} 
                            >
                                <div className='productArea'>
                                    <div className='circleArea normal'>
                                        <p className='p-0 m-0 fs-12 fw-bold color-light-black'>{item.amount}</p>
                                    </div>
                                    <div className='nameArea'>
                                        <p className='m-0 fs-10 fw-bold color-light-black max-140'>{item.name}</p>
                                        {
                                            item.type === 4 && item.name !== 'bread' &&
                                            <p className='pt-5 m-0 fs-8 color-light max-140'>{item.variant.name}</p>
                                        }
                                        {
                                            item.modifiers &&
                                            <p className='pt-5 m-0 fs-8 color-light max-140'>{item.modifiers}</p>
                                        }
                                        {
                                            item.comment &&
                                            <p className='pt-5 m-0 fs-8 color-light f-italic max-140'>{item.comment}</p>
                                        }
                                    </div>
                                    <div className='checkPrice'>
                                        <p className='p-0 m-0 fs-12 fw-bold color-light-black'>L£ {_numberWithCommas(20000 * item.amount)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='bottomSection borderTopLight fullWidth'>
                <div className='pl-10 pr-10'>
                    <div className='borderBottomLight flex flex-row justify-between height-35 align-center'>
                        <p className='p-0 m-0 fs-10'>Roundup</p>
                        <p className='p-0 m-0 fs-12 fw-bold'>L£ 110</p>
                    </div>
                    <div className='borderBottomLight flex flex-row justify-between height-35 align-center'>
                        <p className='p-0 m-0 fs-10'>VAT (11% included)</p>
                        <p className='p-0 m-0 fs-12 fw-bold'>L£ 2,000</p>
                    </div>
                    <div className='borderBottomLight flex flex-row justify-between height-40 align-center'>
                        <p className='p-0 m-0 fs-12 fw-bold'>Total (LBP)</p>
                        <p className='p-0 m-0 fs-16 fw-bold'>L£ 3,500</p>
                    </div>
                    <div className='flex flex-row justify-between height-40 align-center'>
                        <p className='p-0 m-0 fs-12 fw-bold'>Total (USD)</p>
                        <p className='p-0 m-0 fs-16 fw-bold'>$ 20.45</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSection;
