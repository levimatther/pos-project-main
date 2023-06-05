import React from "react";
import {IconButton,TextField} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    amountBtn: {
        backgroundColor: 'white',
        color: 'black',
        height: 30,
        width: 30
    },
    amountBtnRoot: {
        border: `1px solid ${theme.palette.primary.headerColor}`
    },
    minusBtn: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 0
    },
    plusBtn: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 4
    },
    inputAreaRoot: {
        height: 30,
        width: 60,
        borderTop: `1px solid ${theme.palette.primary.headerColor}`,
        borderBottom: `1px solid ${theme.palette.primary.headerColor}`,
        textAlign: 'center',
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
    }
}));
function AmountController(props) {
    const classes = useStyles();

    function handleChange(e) {
        const value=e.target.value;
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value.replace(/,/g, '')))
        {
           if (Number(value) <= props.maxValue) {
               props.handleChange(Number(value))
           }
        }
    }

    return(
        <div className='flex flex-row'>
            <IconButton className={clsx(classes.amountBtn, classes.minusBtn)} classes={{root: classes.amountBtnRoot}} disabled={props.value === 0} onClick={props.handleMinus}>
                <Icon className="fa fa-minus" style={{fontSize: 14}}/>
            </IconButton>
            {/*<div className='width-60 height-28 borderTopBlack borderBottomBlack text-area justify-content'>*/}
            {/*    <p className='p-0 m-0 fs-14'>{props.value}</p>*/}
            {/*</div>*/}
            <TextField
                InputProps={{
                    classes: {root: classes.inputAreaRoot, underline: classes.underline},
                }}
                inputProps={{style: {textAlign: 'center'}}}
                value={props.value}
                onFocus={(e) => e.currentTarget.select()}
                onChange={(e) => handleChange(e)}
            >

            </TextField>
            <IconButton className={clsx(classes.amountBtn, classes.plusBtn)} classes={{root: classes.amountBtnRoot}} disabled={props.value === props.maxValue} onClick={props.handlePlus}>
                <Icon className="fa fa-plus" style={{fontSize: 14}}/>
            </IconButton>
        </div>
    )
}

export default AmountController;
