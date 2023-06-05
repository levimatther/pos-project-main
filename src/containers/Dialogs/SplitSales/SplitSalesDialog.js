import React, {useState} from "react";
import {Dialog, Button, Icon, Checkbox, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TransitionLeft from "../Transitions/TransitionLeft";
import clsx from "clsx";
import HorizontalScroll from "react-scroll-horizontal";
import ConfirmCancelDialog from "./ConfirmCancelDialog";
import SvgBack from "../../../Icons/Back";
import {_numberWithCommas, _transitionDuration} from "../../../constants";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import SvgPlusSmall from "../../../Icons/PlusSmall";

const useStyles = makeStyles(theme => ({
    openBtn: {
        fontSize: 14,
        textTransform: "capitalize",
        height: 35,
    },
    paper: {
        backgroundColor: theme.palette.primary.backgroundColor
    },
    column: {
        // flexBasis: '33%'
        width: '33vw'
    },
    productArea: {
        height: 'calc(100% - 240px)',
        borderBottom: `1px solid ${theme.palette.primary.borderColor}`,
        overflowX: "none",
        overflowY: 'auto'
    },
    checkBox: {
        paddingLeft: 0
    },
    checkBtn: {
        fontSize: 14,
        textTransform: "capitalize",
        height: 40,
        borderRadius: 0
    },
    addContainer: {
        border: `1px solid ${theme.palette.primary.main}`
    }
}));

function SplitSalesDialog(props) {
    const classes = useStyles();
    const sales = [
        {
            products: [
                {
                    name: "Mankoushe Zaatar",
                    variant: "Extra cheese, Vegetables, Hot paste",
                    price: 11000,
                },
                {
                    name: "Pita",
                    variant: "Extra cheese, Vegetables, Hot paste",
                    price: 12000,
                },
                {
                    name: "Apple Juice",
                    variant: "Extra cheese, Vegetables, Hot paste",
                    comment: "Comments will be in italic font style",
                    price: 13000,
                },
                {
                    name: "Dairy Khoury Laban Ayra…",
                    price: 14000,
                },
                {
                    name: "Mankoushe Cheese",
                    variant: "Extra cheese, Vegetables, Hot paste",
                    price: 15000,
                },
                {
                    name: "Mankoushe Zaatar",
                    variant: "Extra cheese, Vegetables, Hot paste",
                    price: 16000,
                }
            ],
        },
        {
            products: [],
        },
    ];
    const [changed, setChanged] = useState(false);
    const [cancelConfirm, setCancelConfirm] = useState(false);
    let checkedSales = sales.map(item => {
        let products = item.products.map((product) => {
            return {...product, checked: false}
        });
        return ({...item, products: products})
    });
    const [salesList, setSalesList] = useState(checkedSales);


    function handleChecked(product, index) {
        setSalesList((prevState => {
            let products = prevState[index].products;
            let productIndex = products.indexOf(product);
            products[productIndex].checked = !prevState[index].products[productIndex].checked;
            let newItem = {products: products};
            return ([...prevState.slice(0, index), newItem ,...prevState.slice(index + 1)])
        }))
    }
    function checkMovable(index) {
        let item = [...salesList.slice(0, index), ...salesList.slice(index+1)];
        let flag = false;
        item.forEach((sale) => {
            sale.products.forEach((product) => {
                flag = flag || product.checked
            })
        });
        return flag;
    }
    function moveSale(saleIndex) {
        setChanged(true);
        setSalesList(prevState => {
            let tmp = prevState;
            let movedItems = [];
            tmp.forEach((item, index) => {
                if (index !== saleIndex) {
                    let checkedItems = item.products.filter(prod => {
                        return prod.checked
                    });
                    item.products.removeIf((product, prodIndex) => {
                        return product.checked
                    });
                    movedItems = [...movedItems, ...checkedItems];
                }
            });
            let formatMovedItems = movedItems.map(item => {
                return ({...item, checked: false});
            });
            tmp[saleIndex].products = [...tmp[saleIndex].products, ...formatMovedItems];
            return [...tmp];
        })
    }

    function addSale() {
        setSalesList(prevState => {
            let newItem = {products: []};
            return([...prevState, newItem])
        })
    }

    function handleCancel() {
        if (!changed) {
            props.handleCancel();
        } else {
            setCancelConfirm(true);
        }
    }

    function handleSave() {
        setChanged(false);
        props.handleConfirm();
    }

    function cancelSave() {
        setCancelConfirm(false);
    }

    function confirmSave() {
        setCancelConfirm(false);
        setChanged(false);
        setSalesList([...checkedSales]);
        props.handleCancel();
    }

    return (
        <Dialog open={props.open} fullScreen TransitionComponent={TransitionLeft}
                transitionDuration={_transitionDuration} classes={{paper: classes.paper}}>
            <ConfirmCancelDialog open={cancelConfirm} handleCancel={cancelSave} handleConfirm={confirmSave} />
            <div
                className='height-50 flex flex-row justify-between align-center pl-20 pr-20 borderBottomLight backgroundWhite'>
                <Button
                    color='primary'
                    startIcon={
                        <ArrowLeftIcon/>
                    }
                    className={classes.openBtn} onClick={() => handleCancel()}>Back</Button>
                <p className='p-0 m-0 fs-14 fw-bold'>Split sale</p>
                <Button color='primary' className={classes.openBtn} onClick={() => handleSave()} disabled={!changed}>Save</Button>
            </div>
            <div className='fullHeight p-20'>
                <div className={clsx('fullHeight', salesList.length<3 ? 'width60vw': 'fullWidth')}>
                    <HorizontalScroll
                        reverseScroll={true}
                    >
                        {
                            salesList.map((item, index) => (
                                <div className={clsx('backgroundWhite boxShadow mr-10 position-relative', classes.column)} key={index}>
                                    <div className='height-50 borderBottomLight flex pl-10 align-center'>
                                        <p className='p-0 m-0 fs-14 fw-bold'>Sale {String(index + 1)}</p>
                                    </div>
                                    <div className={classes.productArea}>
                                        {
                                            item.products.map((product, prodIndex) => (
                                                <div className={clsx('borderBottomLight align-center flex flex-row justify-between mr-10 ml-10', product.variant && product.comment ? 'height-65' : 'height-50')} key={prodIndex}>
                                                    <div className='flex flex-row align-center'>
                                                        <Checkbox
                                                            checked={product.checked}
                                                            onChange={() => {
                                                                handleChecked(product, index)
                                                            }}
                                                            name="checkedB"
                                                            color="primary"
                                                            className={classes.checkBox}
                                                        />
                                                        <div className='nameArea'>
                                                            <p className={clsx('m-0 fs-14 fw-bold color-light-black', product.checked ? 'color-light-black' : 'color-light')}>{product.name}</p>
                                                            {product.variant &&
                                                            <p className='pt-3 m-0 fs-10 color-light'>{product.variant}</p>}
                                                            {product.comment &&
                                                            <p className='pt-3 m-0 fs-10 color-light f-italic'>{product.comment}</p>}
                                                        </div>
                                                    </div>

                                                    <div className='checkPrice'>
                                                        <p className='p-0 m-0 fs-12 fw-bold color-light-black'>L£ {_numberWithCommas(product.price)}</p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    {
                                        item.products.length > 0 &&  <div className='position-absolute height-107 bottom-70 fullWidth'>
                                            <div className='height-35 borderBottomLight pl-10 pr-10 flex flex-row justify-between align-center'>
                                                <p className='fs-10 color-light-black p-0 m-0'>VAT (11% included)</p>
                                                <p className='fs-12 fw-bold color-light-black p-0 m-0'>L£ 20,000</p>
                                            </div>
                                            <div className='height-40 borderBottomLight pl-10 pr-10 flex flex-row justify-between align-center'>
                                                <p className='fs-12 fw-bold color-light-black p-0 m-0'>Total (LBP)</p>
                                                <p className='fs-16 fw-bold color-light-black p-0 m-0'>L£ 20,000</p>
                                            </div>
                                            <div className='height-40 pl-10 pr-10 flex flex-row justify-between align-center'>
                                                <p className='fs-12 fw-bold color-light-black p-0 m-0'>Total (USD)</p>
                                                <p className='fs-16 fw-bold color-light-black p-0 m-0'>$ 10.37</p>
                                            </div>
                                        </div>
                                    }
                                    <div className='position-absolute height-60 bottom-10 fullWidth'>
                                        <div className='pt-20 pl-10 pr-10'>
                                            <Button variant='contained' color='primary' fullWidth className={classes.checkBtn} disabled={!checkMovable(index)} onClick={() => moveSale(index)}>Move here</Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className='flex justify-content mr-5 align-center'>
                            <IconButton aria-label="delete" color='primary' onClick={() => addSale()} className={classes.addContainer}>
                                <SvgPlusSmall/>
                            </IconButton>
                        </div>
                    </HorizontalScroll>
                </div>
            </div>

        </Dialog>
    )
}

export default SplitSalesDialog;

Array.prototype.removeIf = function(callback) {
    var i = 0;
    while (i < this.length) {
        if (callback(this[i], i)) {
            this.splice(i, 1);
        }
        else {
            ++i;
        }
    }
};
