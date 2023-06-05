import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, Dialog, Grid } from "@material-ui/core";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Transition from "./Transitions/Transition";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { TextField } from "@material-ui/core";
import { _numberWithCommas, _transitionDuration } from "../../constants";
import SwipeableViews from 'react-swipeable-views';
import CheckboxRounded from "../../Icons/CheckboxRounded";
import SvgCircleActive from "../../Icons/CircleActive";
import SvgCircleDisable from "../../Icons/CircleDisable";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        height: 450,
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
    },
    swipeArea: {
        position: 'relative'
    },
    swipeSide: {
        width: '100%'
    },
    circleDiv: {
        position: 'absolute',
        left: 'calc(50% - 20px)',
        display: 'flex',
        zIndex:1000
    }
}));


function ModifierDialog(props) {
    const { open, data } = props;
    const [singleData, setSingleData] = useState({});
    const [swipeindex, setSwipeIndex] = useState(0);

    const variantList = [
        {
            name: 'Extra Cheese',
            price: 1000,
        },
        {
            name: 'Veggies',
            price: 2000,
        },
        {
            name: 'Extra Zaatar',
            price: 3000,
        },
        {
            name: 'Extra Cheese',
            price: 4000,
        },
        {
            name: 'Hot Paste',
            price: 2000,
        },
        {
            name: 'Veggy Bowl',
            price: 1000,
        },
        {
            name: 'Hot Paste1',
            price: 1000,
        },
        {
            name: 'Hot Paste2',
            price: 1000,
        },
    ];
    const [variant, setVariant] = useState(variantList.map(item => {
        return ({ ...item, checked: false })
    }));

    const ingredientList = [
        {
            name: 'Turkey'
        },
        {
            name: 'Iceberg lettuce'
        },
        {
            name: 'Ham'
        },
        {
            name: 'Corn'
        },
        {
            name: 'Salami'
        },
        {
            name: 'House sauce'
        },
        {
            name: 'Cheese'
        },
    ];
    const [ingredient, setIngredient] = useState(ingredientList.map(item => {
        return ({ ...item, checked: true })
    }));

    useEffect(() => {
        setSingleData(prevState => {
            let flag = { ...data };
            return flag;
        });
    }, [data]);
    const classes = useStyles();
    const isDisabled = singleData.amount === 1;

    //swipe
    const handleChangeIndex = index => {
        setSwipeIndex(index);
      };
    const clickFirst = () => {
        console.log("fffffffffff");
        setSwipeIndex(0);
    };
    const clickSecond = () => {
        setSwipeIndex(1);
    };
    //

    function handleMinus() {
        setSingleData(prevState => {
            let amount = prevState.amount - 1;
            let flag = { ...prevState, amount: amount };
            return flag
        });
    }

    function handlePlus() {
        setSingleData(prevState => {
            let amount = prevState.amount + 1;
            let flag = { ...prevState, amount: amount };
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

                return { ...prevState, amount: amount };
            })
        }
    }


    function handleClick(index) {
        setVariant(prevState => {
            let item = prevState;
            item[index].checked = !prevState[index].checked;
            return [...item]
        })
    }

    function handleCheckChange(index) {
        setIngredient(prevState => {
            let item = prevState;
            item[index].checked = !prevState[index].checked;
            return [...item]
        })
    }

    function getModifierName() {
        let items = variant.filter((item) => {
            return item.checked;
        });
        let string = '';
        items.forEach((item) => {
            string += item.name + ', ';
        });
        return string.slice(0, -2);
    }
    function getIngredientName() {
        let items = ingredient.filter((item) => {
            return !item.checked;
        });
        let string = '';
        items.forEach((item) => {
            string += 'No ' + item.name + ', ';
        });
        return string.slice(0, -2);
    }
    function getModifierPrice() {
        let items = variant.filter((item) => {
            return item.checked;
        });
        let price = 0;
        items.forEach((item) => {
            price += item.price;
        });
        return price * singleData.amount;
    }
    function handleCheckOut() {
        let prod = { ...singleData, modifiers: getModifierName(), ingredients: getIngredientName() };
        props.onCheckOut(prod);
    }
    function handleFocus(e) {
        e.target.select();
    }
    return (

        <Dialog open={open} classes={{ paper: classes.dialogPaper }} TransitionComponent={Transition}
            transitionDuration={_transitionDuration} onClose={props.onClose}>
            <div className='flex flex-col justify-content pl-20 pr-20 height-60'
                style={{ borderBottom: '1px solid #E8ECEF' }}>
                <div className='flex flex-row justify-between'>
                    <div className='text-area height-30'>
                        <p className={clsx('p-0 m-0 fs-16 fw-bold', classes.header)}>
                            {singleData && singleData.name}
                        </p>
                    </div>
                    <div className='text-area height-30'>
                        <p className={clsx('p-0 m-0 fs-16 fw-bold', classes.header)}>
                            {
                                getModifierPrice() === 0 ? singleData && singleData.price : "L£ " + _numberWithCommas(getModifierPrice() + 200000)
                            }

                        </p>
                    </div>
                </div>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <p className='p-0 m-0 fs-10 color-light-blue'>
                            {getModifierName()} &nbsp;
                        </p>
                    </Grid>
                    <Grid item xs={6}>
                        <p className='p-0 m-0 fs-10 color-light-blue text-right'>
                            {getIngredientName()} &nbsp;
                        </p>
                    </Grid>
                </Grid>

            </div>
            <div className='pt-10 pl-20 pr-20 pb-10 flex-row flex justify-between'
                style={{ borderBottom: '1px solid #E8ECEF' }}>
                <IconButton className={classes.amountBtn} classes={{ root: classes.amountBtnRoot }} disabled={isDisabled}
                    onClick={handleMinus}>
                    <Icon className="fa fa-minus" style={{ fontSize: 18 }} />
                </IconButton>
                <TextField
                    variant="outlined"
                    InputProps={{
                        classes: { root: classes.inputAreaRoot, input: classes.inputAreaStyle },
                    }}
                    value={singleData.amount}
                    onChange={handleAmount}
                    onFocus={handleFocus}
                />
                <IconButton className={classes.amountBtn} classes={{ root: classes.amountBtnRoot }} onClick={handlePlus}>
                    <Icon className="fa fa-plus" style={{ fontSize: 18 }} />
                </IconButton>
            </div>
            <div className={clsx(classes.swipeArea, 'overflowHidden')}>
                <div className={classes.circleDiv}>
                    <div className='p-5' onClick={clickFirst}>
                    {
                        swipeindex==0 ? <SvgCircleActive /> : <SvgCircleDisable />
                    }
                    </div>
                    <div className='p-5' onClick={clickSecond}>
                    {
                        swipeindex==1 ? <SvgCircleActive /> : <SvgCircleDisable />
                    }
                    </div>                    
                </div>
                <SwipeableViews enableMouseEvents={true} index={swipeindex} onChangeIndex={handleChangeIndex}>
                    <div className={classes.swipeSide}>
                        <Grid container>
                            <Grid item xs={5}><p className='pl-20 pt-10 m-0 fs-12 color-light-blue'>Manakish Extras</p></Grid>
                        </Grid>
                        <div className='pt-20 pl-10 pr-10 height-200 '>
                            <div className='variantArea'>
                                {
                                    variant && variant.map((item, index) => (
                                        <div
                                            className={clsx('oneVariant', item.checked ? 'active' : '')}
                                            key={index}
                                            onClick={() => handleClick(index)}
                                        >
                                            <p className='p-0 m-0 fs-12'>{item.name}</p>
                                            <div className='flex flex-col align-end'>
                                                <p className='p-0 m-0 fs-12 fw-bold'>{"L£ " + _numberWithCommas(item.price)}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={classes.swipeSide}>
                        <Grid container>
                            <Grid item xs={5}><p className='pl-20 pt-10 m-0 fs-12 color-light-blue'>Ingredients</p></Grid>
                        </Grid>
                        <div className='pt-20 pl-10 pr-10 height-200 '>
                            <div className='ingredientArea'>
                                {
                                    ingredient && ingredient.map((item, index) => (
                                        <div
                                            className={clsx('oneIngredient', item.checked ? 'active' : 'disable')}
                                            key={index}
                                            onClick={() => handleCheckChange(index)}
                                        >
                                            <Checkbox
                                                checked={item.checked}
                                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                                color="primary"
                                                icon={<CheckboxRounded />}
                                            />
                                            <p className='p-0 m-0 fs-14'>{item.checked ? item.name : 'No ' + item.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </SwipeableViews>
            </div>
            <div className='p-20'>
                <div className='fullWidth'>
                    <Button fullWidth variant="contained" color='primary' className='height-40'
                        onClick={() => handleCheckOut()}>Add to cart</Button>
                </div>
            </div>
        </Dialog>
    )
}

export default ModifierDialog;
