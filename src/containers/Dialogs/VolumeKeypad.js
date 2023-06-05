import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => (
    {
        button: {
            borderRadius: 0,
            boxShadow: 'none',
            borderTop: `1px solid ${theme.palette.primary.borderColor2}`,
            borderRight: `1px solid ${theme.palette.primary.borderColor2}`,
            width: 80,
            height: 80,
            fontSize: 24
        },
        button1: {
            borderRadius: 0,
            boxShadow: 'none',
            borderTop: `1px solid ${theme.palette.primary.borderColor2}`,
            borderRight: `1px solid ${theme.palette.primary.borderColor2}`,
            width: 160,
            height: 80,
            fontSize: 24
        },
        button2: {
            borderRadius: 0,
            boxShadow: 'none',
            borderTop: `1px solid ${theme.palette.primary.borderColor2}`,
            width: 80,
            height: 160,
            fontSize: 24
        },
        iconBtn: {
            borderRadius: 0,
            boxShadow: 'none',
            borderTop: `1px solid ${theme.palette.primary.borderColor2}`,
            width: 80,
            height: 160
        }
    }
));

function VolumeKeypad(props) {
    const classes = useStyles();
    const isDisabled = props.text === 0;
    function handleClick(s) {
        props.handleInput(s)
    }

    return(
        <div>
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <Button className={classes.button} onClick={() => handleClick(1)}>1</Button>
                        <Button className={classes.button} onClick={() => handleClick(2)}>2</Button>
                        <Button className={classes.button} onClick={() => handleClick(3)}>3</Button>
                    </div>
                    <div className='flex flex-row'>
                        <Button className={classes.button} onClick={() => handleClick(4)}>4</Button>
                        <Button className={classes.button} onClick={() => handleClick(5)}>5</Button>
                        <Button className={classes.button} onClick={() => handleClick(6 )}>6</Button>
                    </div>
                </div>
                <Button
                    className={classes.iconBtn}
                    onClick={props.handleBack}
                    startIcon={
                        <Icon className='fa fa-arrow-left' style={{ fontSize: 24 , color: 'black'}} />
                    }
                />
            </div>
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                    <div className='flex flex-row'>
                        <Button className={classes.button} onClick={() => handleClick(7)}>7</Button>
                        <Button className={classes.button} onClick={() => handleClick(8)}>8</Button>
                        <Button className={classes.button} onClick={() => handleClick(9)}>9</Button>
                    </div>
                    <div className='flex flex-row'>
                        <Button className={classes.button} onClick={() => handleClick('.')}>.</Button>
                        <Button className={classes.button1} onClick={() => handleClick(0)}>0</Button>
                    </div>
                </div>
                <Button variant='contained' disabled={isDisabled} className={classes.button2} color="primary" onClick={props.handleAdd}>Add</Button>
            </div>
        </div>
    )
}
export default VolumeKeypad
