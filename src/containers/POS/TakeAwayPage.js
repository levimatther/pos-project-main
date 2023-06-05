import React, {useEffect, useRef, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import {TextField} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import {Swipeable} from 'react-swipeable'
import DeleteDialog from "../Dialogs/DeleteDialog";
import CommentDialog from "../Dialogs/CommentDialog";
import StockDialog from "../Dialogs/StockDialog";
import PendingSalesDialog from "../Dialogs/Sales/PendingSalesDialog";
import MergeWidhDialog from "../Dialogs/MergeWithDialog";
import DeliveryOwnedDialog from "../Dialogs/DeliveryOwnedDialog";
import SplitSalesDialog from "../Dialogs/SplitSales/SplitSalesDialog";
import AddNoteDialog from "../Dialogs/AddNoteDialog";
import AddDiscount from "../Dialogs/AddDiscountDialog";
import {Customer, TrashE, TrashR, TrashW} from "../../Icons";
import SvgMore from "../../Icons/More";
import SvgAdd from "../../Icons/Add";
import SvgSave from "../../Icons/Save";
import CustomersDialog from "../Dialogs/Customer/CustomersDialog";
import CustomerInfoDialog from "../Dialogs/Customer/CustomerInfoDialog";
import CheckoutDialog from "../Dialogs/CheckOut";
import SvgCustomerInfo from "../../Icons/CustomerInfo";
import {_numberWithCommas} from "../../constants";
import SvgPendingSales from "../../Icons/PendingSales";
import SvgSplitSale from "../../Icons/SplitSale";
import SvgMergeSaleG from "../../Icons/MergeSaleG";
import SvgAddNote from "../../Icons/AddNote";
import SvgDeliveriesOwed from "../../Icons/DeliveriesOwed";
import PopoverComponent from "../../components/PopoverComponent";

const useStyle = makeStyles(theme => (
    {
        trashBtn: {
            color: theme.palette.danger.main,
            padding: 0,
        },
        moreBtn: {
            color: theme.palette.primary.main,
            padding: 0,
            width: 40,
            height: 40
        },
        swipeArea: {
            display: 'flex',
            flexDirection: 'row',
            width: 'calc(100% + 50px)',
            userSelect: 'none'
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
            overflow: 'auto',
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
            borderRadius: 0,
            "&:hover": {
                backgroundColor: theme.palette.primary.dangerHover
            }
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
        },
        padding0: {
            padding: 0
        },
        noneWhiteSpace: {
            whiteSpace: 'unset !important'
        }
    }
));

function TakeAwayPage(props) {
    const classes = useStyle();
    const products = props.checkout;
    const stockProducts = products.filter(item => {
        return item.type === 3;
    });
    const isCheckout = products.length > 0;
    const [isTakeAway, setIsTakeAway] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElSingle, setAnchorElSingle] = useState(null);
    const [anchorElVol, setAnchorElVol] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [commentOpen, setCommentOpen] = useState(false);
    const [isLeft, setIsLeft] = useState([]);
    const [isRight, setIsRight] = useState([]);
    const [isStock, setIsStock] = useState(false);
    const [salesOpen, setSalesOpen] = useState(false);
    const [mergeWithOpen, setMergeWith] = useState(false);
    const [splitSale, setSplitSale] = useState(false);
    const [deliveryOwned, setDeliveryOwned] = useState(false);
    const [showNote, setShowNote] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);
    const [showCustomers, setShowCustomers] = useState(false);
    const [customerDetail, setCustomeDetail] = useState(null);
    const [customerInfoModal, setCustomerInfoModal] = useState(false);
    const [removeCustomer, setRemoveCustomer] = useState(false);
    const [chargeItems, setChargeItems] = useState(false);
    const [pendingSales, setPendingSales] = useState({});
    const inputRef = useRef();
    // state for save button status
    const isZero = products.length === 0;
    useEffect(() => {
        let initialValue = products.map(item => {
            return false;
        });
        setIsLeft(prevState => {
            return [...initialValue]
        });
        setIsRight(prevState => {
            return [...initialValue]
        });
    }, [products]);
    const [commentIndex, setCommentIndex] = useState(0);

    function addCustomer() {
        setShowCustomers(true);
    }

    function viewCustomer() {
        setCustomerInfoModal(true);
    }

    function showModal(e) {
        setAnchorEl(e.currentTarget)
    }

    function deleteProducts() {
        setDeleteOpen(true);
    }

    const id = anchorEl ? 'simple-popover' : undefined;
    const idSingle = anchorElSingle ? 'simple-popover-single' : undefined;
    const idVol = anchorElVol ? 'simple-popover-vol' : undefined;
    const open = Boolean(anchorEl);
    const singleProductAmount = Boolean(anchorElSingle);
    const volumeProductAmount = Boolean(anchorElVol);

    function handleClose() {
        setAnchorEl(null)
    }

    function handleCloseSingle() {
        setAnchorElSingle(null)
    }

    function handleCloseVol() {
        setAnchorElVol(null)
    }

    function handleCancel() {
        setDeleteOpen(false);
    }

    function handleConfirm() {
        setDeleteOpen(false);
        setPendingSales({});
        props.deleteProducts();
        setIsRight([]);
    }


    function showCommentModal(index) {
        setCommentIndex(index);
        setCommentOpen(true)
    }

    function handleCommentCancel() {
        setCommentOpen(false)
    }

    function handleUpdate(data) {
        props.updateProducts(data, commentIndex);
        setCommentOpen(false)
    }

    function deleteProduct(index) {
        props.deleteProduct(index)
    }

    function handleLeft(index) {
        setIsLeft(prevState => {
            return [...prevState.slice(0, index), true, ...prevState.slice(index + 1)]
        });
    }

    function handleRight(index) {
        setIsLeft(prevState => {
            return [...prevState.slice(0, index), false, ...prevState.slice(index + 1)]
        });
    }

    function handleCharge() {
        if (stockProducts.length > 0) {
            setIsStock(true);
            return
        }
        setChargeItems(true);

    }

    function handleStockCancel() {
        setIsStock(false);
    }

    function handleStockConfirm() {
        setIsStock(false);
        setChargeItems(true);
    }

    function saveSales() {
        props.deleteProducts();
    }

    function handleChangeAmount(amount, index) {
        const re = /^(?:\d*\.\d{0,3}|\d+)$/;
        if (amount === '' || re.test(amount)) {
            if (products[index].type !== 2) {
                if (amount === '' || amount === '.') {
                    amount = ''
                } else {
                    amount = parseInt(amount)
                }
            }
            props.changeAmount(amount, index)
        }
    }

    // function handleFocus(e) {
    //     e.target.select();

    // }

    // function handlePopover(e, index) {
    //     inputRef.current.select()
    //     if (products[index].type !== 2) {
    //         setAnchorElSingle(e.currentTarget)
    //         inputRef.current.select()
    //     } else {
    //         setAnchorElVol(e.currentTarget)
    //         inputRef.current.select()
    //     }
    // }

    function selectCustomer(data) {
        setCustomeDetail(data);
        setShowCustomers(false);
    }

    function editCustomer(data) {
    }

    function handlePendingSales(data) {
        const newProducts = [
            {
                amount: 1,
                id: 1,
                name: "Pita",
                price: "L£ 200,000",
                type: 1
            },
            {
                amount: 0.189,
                id: 16,
                name: "apple juice",
                price: "L£ 200,000",
                stock: "7",
                type: 2
            },
            {
                amount: 1,
                id: 19,
                name: "candy",
                price: "L£ 200,000",
                stock: "7",
                type: 4
            },
            {
                amount: 1,
                id: 4,
                modifiers: "Hot Paste, Veggy Bowl",
                name: "bread",
                price: "L£ 200,000",
                stock: "7",
                type: 4
            }
        ];
        props.updateAllProducts(newProducts);
        setPendingSales({...data});
        setAnchorEl(null);
        setSalesOpen(false)
    }

    function handleConfirmCheckout() {
        setChargeItems(false);
        setCustomeDetail(null);
        setIsTakeAway(true);
        props.deleteProducts();
    }

    function getTotalPrice() {
        let totalAmount = 0;
        products.map((item) => {
            totalAmount += item.amount;
        });
        return Math.round(totalAmount * 20000);
    }

    function getTotalQuantity() {
        return products.length;
    }

    return (
        <div className={props.classes}>
            <DeleteDialog open={deleteOpen} handleCancel={handleCancel} handleConfirm={handleConfirm}/>
            <StockDialog open={isStock} handleCancel={handleStockCancel} handleConfirm={handleStockConfirm}
                         data={stockProducts}/>
            <CommentDialog open={commentOpen} handleCancel={handleCommentCancel} handleConfirm={handleUpdate}
                           data={products[commentIndex]}/>
            <PendingSalesDialog
                open={salesOpen}
                handleCancel={() => {
                    setSalesOpen(false);
                    setAnchorEl(null)
                }}
                handleConfirm={handlePendingSales}
            />
            <MergeWidhDialog
                open={mergeWithOpen}
                handleCancel={() => setMergeWith(false)}
                handleConfirm={() => setMergeWith(false)}
            />
            <DeliveryOwnedDialog
                open={deliveryOwned}
                handleCancel={() => setDeliveryOwned(false)}
                handleConfirm={() => setDeliveryOwned(false)}
            />
            <SplitSalesDialog
                open={splitSale}
                handleCancel={() => setSplitSale(false)}
                handleConfirm={() => setSplitSale(false)}
            />
            <AddNoteDialog
                open={showNote}
                handleCancel={() => setShowNote(false)}
                handleConfirm={() => setShowNote(false)}
            />
            <AddDiscount
                open={showDiscount}
                handleCancel={() => setShowDiscount(false)}
                handleConfirm={() => setShowDiscount(false)}
            />
            <CustomersDialog
                open={showCustomers}
                handleCancel={() => setShowCustomers(false)}
                handleConfirm={selectCustomer}
            />
            <CustomerInfoDialog
                open={customerInfoModal}
                data={customerDetail}
                handleCancel={() => setCustomerInfoModal(false)}
                handleEdit={editCustomer}
            />
            <CheckoutDialog
                open={chargeItems}
                handleCancel={() => setChargeItems(false)}
                handleConfirm={() => handleConfirmCheckout()}
                data={products}
                customerDetail={customerDetail}
                isTakeAway={isTakeAway}
            />
            <div className='takeAwayHeader'>
                <IconButton aria-label="delete" disabled={!isCheckout} className={classes.trashBtn}
                            onClick={deleteProducts}>
                    {
                        isCheckout && <TrashR style={{fontSize: 18}}></TrashR>
                    }
                    {
                        !isCheckout && <TrashE style={{fontSize: 18}}></TrashE>
                    }

                </IconButton>
                <p className={clsx('p-0 m-0 fs-14 fw-bold', classes.headerTitle)}>{isTakeAway ? 'Takeaway' : 'Delivery'} {pendingSales.name ? (' - ' + pendingSales.name) : ''}</p>
                <IconButton aria-describedby={id} aria-label="delete" disabled={false} className={classes.moreBtn}
                            onClick={showModal}>
                    <SvgMore style={{fontSize: 18}}/>
                </IconButton>
                <Popover
                    open={open}
                    id={id}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    classes={{paper: classes.mainPopoverRoot}}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <div className='mainPopover'>
                        <div className='mainPopOneRow' onClick={() => setSalesOpen(true)}>
                            <div className={'firstSection'}>
                                {/*<img className='pb-2' src={"/assets/images/svg/PendingSales.svg"} alt="logo"/>*/}
                                <SvgPendingSales/>
                                <p className='pl-10 m-0 fs-14 height-20'>Pending sales</p>
                            </div>
                            <div className={'badgeArea'}>
                                <p className={'p-0 m-0 fs-10'}>{1}</p>
                            </div>
                        </div>
                        <div className={'mainPopOneRow'} onClick={() => setSplitSale(true)}>
                            <div className={'firstSection'}>
                                {/*<img className='pb-2' src={"/assets/images/svg/SplitSale.svg"} alt="logo"/>*/}
                                <SvgSplitSale/>
                                <p className='pl-10 m-0 fs-14 height-20'>Split sale</p>
                            </div>
                        </div>
                        <div className={'mainPopOneRow disabled'} onClick={() => setMergeWith(true)}>
                            <div className={'firstSection'}>
                                {/*<img className='pb-2' src={"/assets/images/svg/MergeSale-g.svg"} alt="logo"/>*/}
                                <SvgMergeSaleG/>
                                <p className={'pl-12 m-0 fs-14 height-20'}>Merge sales</p>
                            </div>
                        </div>
                        <div className={'mainPopOneRow'} onClick={() => setShowNote(true)}>
                            <div className={'firstSection'}>
                                {/*<img className='pb-2' src={"/assets/images/svg/AddNote.svg"} alt="logo"/>*/}
                                <SvgAddNote/>
                                <p className={'pl-8 m-0 fs-14 height-20'}>Add note</p>
                            </div>
                        </div>
                        <div className='mainPopOneRow bt' onClick={() => setDeliveryOwned(true)}>
                            <div className={'firstSection'}>
                                {/*<img src={"/assets/images/svg/DeliveriesOwed.svg"} alt="logo"/>*/}
                                <SvgDeliveriesOwed/>
                                <p className={'pl-8 m-0 fs-14'}>Deliveries owed</p>
                            </div>
                            <div className={'badgeArea'}>
                                <p className={'p-0 m-0 fs-10 '}>{4}</p>
                            </div>
                        </div>
                    </div>
                </Popover>
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
                        onSwipedLeft={() => {
                            setRemoveCustomer(true)
                        }}
                        onSwipedRight={() => setRemoveCustomer(false)}
                        trackMouse={true}
                        preventDefaultTouchmoveEvent={true}
                    >
                        <div className='customerHeader justify-between' onClick={viewCustomer}>
                            <div className='flex flex-row'>
                                <div className='circleArea backcolor-pink'>
                                    <p className='p-0 m-0 fs-12 fw-bold color-pink'>{customerDetail.shortName}</p>
                                </div>
                                <div className='nameArea'>
                                    <p className='m-0 fs-10 fw-bold color-light-black'>{customerDetail.name}</p>
                                    <p className='pt-5 m-0 fs-8 color-light'>{`${customerDetail.phone} | ${customerDetail.mail}`}</p>
                                </div>
                            </div>
                            {/*<Icon className='fa fa-info-circle' color='primary' style={{fontSize: 12}}/>*/}
                            <SvgCustomerInfo/>
                        </div>
                    </Swipeable>
                    <div className='removeArea'>
                        <IconButton aria-label="delete" className={classes.customerRemoveBtn}
                                    onClick={() => {
                                        setCustomeDetail(null);
                                        setRemoveCustomer(false)
                                    }}
                                    classes={{root: classes.removeBtnRoot}}
                        >
                            <TrashW style={{fontSize: 18}}/>
                        </IconButton>
                    </div>
                </div>
            }

            <div className={classes.productsArea}>
                {
                    products.map((item, index) => {
                        if (item && item.name) {
                            return (
                                    <div key={index} className='borderBottomLight overflowHidden'>
                                        <Swipeable
                                            onSwipedLeft={() => {
                                                handleLeft(index)
                                            }}
                                            onSwipedRight={() => handleRight(index)}
                                            trackMouse={true}
                                            preventDefaultTouchmoveEvent={true}
                                            className={clsx(classes.swipeArea, isLeft[index] ?'left-side' : 'right-side' )}
                                        >
                                            <div className='productArea'>
                                                <div className='rectangleArea'>
                                                    {/* <TextField
                                                        id="filled-number"
                                                        value={item.amount}
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        // autoComplete='off'
                                                        inputRef={inputRef}
                                                        // onFocus={(e) => handleFocus(e)}
                                                        onChange={(e) => handleChangeAmount(e, index)}
                                                        inputProps={{
                                                            style: {
                                                                padding: 0,
                                                                textAlign: 'center',
                                                                fontSize: 12
                                                            },
                                                        }}
                                                        variant="outlined"
                                                        className='customInput'
                                                    /> */}
                                                    {
                                                        <PopoverComponent 
                                                            value={item.amount} 
                                                            type = {item.type}
                                                            index={index}
                                                            onChange={handleChangeAmount}
                                                        />
                                                    }
                                                </div>
                                                <div className='nameArea' onClick={() => showCommentModal(index)}>
                                                    <p className='m-0 fs-10 fw-bold color-light-black max-140'>{item['name']}</p>
                                                    {
                                                        item.type === 4 && (item['name'] !== 'bread') && item['variant'] &&
                                                        <p className={clsx(classes.noneWhiteSpace,'pt-5 m-0 fs-8 color-light max-140')}>{item['variant']['name']}</p>
                                                    }
                                                    {
                                                        item.modifiers &&
                                                        <p className={clsx(classes.noneWhiteSpace,'pt-5 m-0 fs-8 color-light max-140')}>{item.modifiers}</p>
                                                    }
                                                    {
                                                        item.ingredients &&
                                                        <p className={clsx(classes.noneWhiteSpace,'pt-5 m-0 fs-8 color-light max-140')}>{item.ingredients}</p>
                                                    }
                                                    {
                                                        item.comment &&
                                                        <p className={clsx(classes.noneWhiteSpace,'pt-5 m-0 fs-8 color-light f-italic max-140')}>{item.comment}</p>
                                                    }
                                                </div>
                                                <div className='checkPrice'>
                                                    <p className='p-0 m-0 fs-12 fw-bold color-light-black'>L£ {_numberWithCommas(Math.round(20000 * Number(item.amount)))}</p>
                                                </div>
                                            </div>
                                            <div className='removeArea'>
                                                <IconButton aria-label="delete"
                                                            className={classes.removeBtn}
                                                            onClick={() => deleteProduct(index)}
                                                            classes={{root: classes.removeBtnRoot}}
                                                >
                                                    <TrashW style={{fontSize: 18}}/>
                                                </IconButton>
                                            </div>
                                        </Swipeable>
                                    </div>
                            )
                        }

                    })
                }
            </div>
            {
                !isZero && <div className='discountSection'>
                    <div className='p-10 flex flex-row justify-between align-center'
                         style={{borderBottom: '1px solid #E8ECEF'}}>
                        <div className='flex-row flex align-center cursor-pointer'
                             onClick={() => setShowDiscount(true)}>
                            <SvgAdd style={{fontSize: 12,}}/>
                            <p className='pl-5 m-0 fs-12 color-primary'>Add discount</p>
                        </div>
                        <div>
                            <p className='p-0 m-0 fs-12 fw-bold color-light-black'>L£ 0</p>
                        </div>
                    </div>
                    <div className='flex-row flex justify-between p-10'>
                        <p className='p-0 m-0 fs-12 color-light-black'>VAT (11% included)</p>
                        <p className='p-0 m-0 fs-12 fw-bold color-light-black'>L£ 20,000</p>
                    </div>
                </div>
            }
            {
                !isZero && <div className='typeSection'>
                    <div className='p-10 flex flex-row'>
                        <div>
                            <Button fullWidth
                                    onClick={() => setIsTakeAway(true)} variant='contained' color='primary'
                                    className={clsx(classes.button, classes.width124, isTakeAway ? classes.primaryBtn : classes.disabledBtn)}
                                    classes={{contained: classes.contained}}>Takeaway</Button>
                        </div>
                        <div>
                            <Button fullWidth onClick={() => setIsTakeAway(false)} variant='contained' color='primary'
                                    className={clsx(classes.button, classes.width124, !isTakeAway ? classes.primaryBtn : classes.disabledBtn)}
                                    classes={{contained: classes.contained}}>Delivery</Button>
                        </div>
                    </div>
                </div>
            }
            <div className='checkout'>
                <div className='p-10 flex flex-row'>
                    {
                        !isZero && <div className='pr-2'>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => saveSales()}
                                startIcon={<SvgSave style={{fontSize: 12}}/>}
                                className={clsx(classes.button, classes.width50)}
                                classes={{
                                    contained: classes.contained,
                                    startIcon: classes.startIcon,
                                    label: classes.label
                                }}>Save</Button>
                        </div>
                    }
                    <Button
                        disabled={isZero}
                        variant='contained'
                        color='primary'
                        fullWidth={true}
                        className={clsx(classes.button, classes.padding0, !isZero ? classes.width165 : classes.widthFull)}
                        classes={{contained: classes.contained}}
                        onClick={handleCharge}
                    >Charge &nbsp;{!isZero &&
                    <span className='fw-bold fs-16'>{'L£ ' + _numberWithCommas(getTotalPrice())}</span>} </Button>
                    {
                        !isZero && <div className={clsx('quantityArea', 'backPrimary')}>
                            <p className='p-0 m-0'>{getTotalQuantity()}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default TakeAwayPage;
