import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Dialog} from "@material-ui/core";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Transition from "./Transitions/Transition";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import {TextField} from "@material-ui/core";
import {_transitionDuration} from "../../constants";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        height: 560,
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
    commentAreaStyle: {},
    commentAreaRoot: {
        height: 40,
    }
}));

function VariantDialog(props) {
    const {open, data} = props;
    const [singleData, setSingleData] = useState({});
    const [variant, setVariant] = useState(0);
    const variantList = [
        {
            name: 'White / Large ',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'Pineapple',
            price: 'L£ 22,000',
            available: 12
        },
        {
            name: 'White',
            price: 'L£ 2,000',
            available: 12
        },
        {
            name: 'Large / Pineapple',
            price: 'L£ 1,000',
            available: 12
        },
        {
            name: 'White',
            price: 'L£ 13,000',
            available: 12
        },
        {
            name: 'Pineapple',
            price: 'L£ 14,000',
            available: 12
        },
        {
            name: 'Large / Pineapple',
            price: 'L£ 15,000',
            available: 12
        },
        {
            name: 'White / Large / Pineapple',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'White ',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'Pineapple',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'White / Large / Pineapple',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'White / Large / Pineapple',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'White / Large / Pineapple',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'White / Large / Pineapple',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'Pineapple',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'White / Large / Pineapple',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'White / Large / Pineapple',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'White / Large / Pineapple',
            price: 'L£ 12,000',
            available: 12
        },
        {
            name: 'White / Large / Pineapple',
            price: 'L£ 12,000',
            available: 12
        },
    ];
    const variantText=variantList[variant].name;
    const variantPrice=variantList[variant].price;
    useEffect(() => {
        setSingleData(prevState => {
            let flag = {...data};
            return flag;
        });
    }, [data]);
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

    function handleCheckOut() {
        let prod = {...singleData, variant: variantList[variant] };
        props.onCheckOut(prod);
    }
    function handleFocus(e) {
        e.target.select();
    }
    return (

        <Dialog open={open} classes={{paper: classes.dialogPaper}} TransitionComponent={Transition}
                transitionDuration={_transitionDuration} onClose={props.onClose}>
            <div className='flex flex-row justify-between pb-15 pt-15 pl-20 pr-20'
                 style={{borderBottom: '1px solid #E8ECEF'}}>
                <div className='text-area height-30'>
                    <p className={clsx('p-0 m-0 fs-16 fw-bold', classes.header)}>
                        {singleData && singleData.name + ' - ' + variantText}
                    </p>
                </div>
                <div className='text-area height-30'>
                    <p className={clsx('p-0 m-0 fs-16 fw-bold', classes.header)}>
                        {variantPrice}
                    </p>
                </div>

            </div>
            <div className='pt-10 pl-20 pr-20 pb-10 flex-row flex justify-between'
                 style={{borderBottom: '1px solid #E8ECEF'}}>
                <IconButton className={classes.amountBtn} classes={{root: classes.amountBtnRoot}} disabled={isDisabled}
                            onClick={handleMinus}>
                    <Icon className="fa fa-minus" style={{fontSize: 18}}/>
                </IconButton>
                <TextField
                    variant="outlined"
                    InputProps={{
                        classes: {root: classes.inputAreaRoot, input: classes.inputAreaStyle},
                    }}
                    value={singleData.amount}
                    onChange={handleAmount}
                    onFocus={handleFocus}
                />
                <IconButton className={classes.amountBtn} classes={{root: classes.amountBtnRoot}} onClick={handlePlus}>
                    <Icon className="fa fa-plus" style={{fontSize: 18}}/>
                </IconButton>
            </div>
            <div className='pt-5 pl-10 pr-10 height-360 overflowYAuto'>
                <div className='variantArea'>
                    {
                        variantList.map((item, index) => (
                            <div
                                className={clsx('oneVariant', variant===index ? 'active' : '')}
                                key={index}
                                onClick={() => setVariant(index)}
                            >
                                <p className='p-0 m-0 fs-12'>{item.name}</p>
                                <div className='flex flex-col align-end'>
                                    <p className='p-0 m-0 fs-12 fw-bold'>{item.price}</p>
                                    <p className={clsx('pt-5 m-0 fs-8',variant===index ? '' : 'color-light-blue')}>{item.available} available</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='pl-20 pr-20 pt-15'>
                <div className='fullWidth'>
                    <Button fullWidth variant="contained" color='primary' className='height-40'
                            onClick={() => handleCheckOut()}>Add to cart</Button>
                </div>
            </div>
        </Dialog>
    )
}

export default VariantDialog;
