import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import PopoverBtn from './PopoverBtn';
import PopoverNum from './PopoverNum';
import clsx from "clsx";
import { TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    border: {
        borderRadius: 14,
    },
    root:{
        borderRadius: "6px !important",
        overflow: "unset !important",
        marginTop: 9
    },
    arrow:{
        top: '-8px',
        left: '50%',
        marginLeft: '-8px',
        borderTopWidth: 0,
        borderBottomColor: '#a5a5a5',
        position: 'absolute',
        display: 'block',
        width: 0,
        height: 0,
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '8px',
        '&::before': {
            top: '2px',
            marginLeft: '-8px',
            content: '" "',
            borderTopWidth: 0,
            borderBottomColor: '#fff',
            position: 'absolute',
            display: 'block',
            width: 0,
            height: 0,
            borderColor: 'transparent',
            borderStyle: 'solid',
            borderWidth: '8px',
        }
    },
    greenArrow:{
        top: '-8px',
        left: '50%',
        marginLeft: '-8px',
        borderTopWidth: 0,
        borderBottomColor: '#7ce7ac',
        position: 'absolute',
        display: 'block',
        width: 0,
        height: 0,
        borderColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: '8px'
    }
}));
export default function PopoverComponent(props) {
    const classes = useStyles();
    const refInput = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [value, setValue] = useState(props.value);
    const [isClicked, setIsClicked] = useState(false);
    const [amount, setAmount] = useState(0);
    const [count, setCount] = useState(0);
    const [valueChanged, setValueChanged] = useState(false);

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);
    useEffect(() => {
        if (amount === 0) {
            setIsClicked(false);
        }
        else {
            let fixAmount = amount / 1000;
            setValue(fixAmount);
        }
    }, [amount]);
    function handleConfirm() {
        handleClose();
    }
    const handleClick = (event) => {
        event.currentTarget.focus();
        event.currentTarget.select();
    };
    const handleDoubleClick = (e) =>{
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        if (valueChanged) {
            let fixAmount = amount / 1000;
            setAmount(0);
            props.onChange(fixAmount, props.index);
        }
        setValueChanged(false);
        setAnchorEl(null);
    };
    const miAmount = () => {
        Promise.resolve()
            .then(() => { setValue(prevValue => prevValue - 1); })
            .then(() => props.onChange(value - 1, props.index))
    };
    const plAmount = () => {
        Promise.resolve()
            .then(() => { setValue(prevValue => prevValue + 1); })
            .then(() => props.onChange(value + 1, props.index))

    };
    const numPadClick = (e) => {
        setValueChanged(true);
        if (e === '.') {
            if (isClicked) {
                return;
            } else {
                setIsClicked(true);
                setCount(1);
                setAmount(prevState => {
                    return prevState * 1000
                });
                return;
            }
        } else {
            //after dot is clicked
            if (isClicked) {
                if (count === 1) {
                    setAmount(prevState => {
                        return prevState + e * 100
                    });
                    setCount(prevState => {
                        return prevState + 1;
                    })
                }
                if (count === 2) {
                    setAmount(prevState => {
                        return prevState + e * 10
                    });
                    setCount(prevState => {
                        return prevState + 1;
                    })
                }
                if (count === 3) {
                    setAmount(prevState => {
                        return prevState + e * 1
                    });
                    setCount(prevState => {
                        return prevState + 1;
                    })
                }
                return;
            } else {
                setAmount(prevState => {
                    return prevState + e
                });
            }

        }
    }
    function handleBack() {
        if (isClicked) {
            if (count === 1) {
                setAmount(prevState => {
                    return Math.floor(prevState/10000) * 1000
                });
            }
            if (count === 2) {
                setCount(prevState => {
                    return prevState - 1;
                });
                setAmount(prevState => {
                    return Math.floor(prevState/1000) * 1000
                });

            }
            if (count === 3) {
                setCount(prevState => {
                    return prevState - 1;
                });
                setAmount(prevState => {
                    return Math.floor(prevState/100) * 100
                });

            }
            if (count === 4) {
                setCount(prevState => {
                    return prevState - 1;
                });

                setAmount(prevState => {
                    return Math.floor(prevState/10) * 10
                });

            }
        } else {
            setAmount(prevState => {
                return Math.floor(prevState/10);
            })
        }
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <TextField
                inputRef={refInput}
                aria-describedby={id}
                variant="outlined"
                onDoubleClick = {handleDoubleClick}
                id="filled-number"
                value={value}
                onChange={(e) => props.onChange(e.target.value, props.index)}
                className='customInput'
                inputProps={{
                    onClick: (e) => handleClick(e),
                    style: {
                        padding: 0,
                        textAlign: 'center',
                        fontSize: 12
                    },
                }}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                className={classes.border}
                classes={{
                    paper: classes.root
                }}
            >
                <div className={clsx(props.type === 2?classes.arrow:classes.greenArrow)} ></div>
                {
                    props.type === 2 &&
                    <PopoverNum
                        onClick={numPadClick}
                        handleBack={handleBack}
                        handleConfirm={handleConfirm}
                    />
                }
                {
                    (props.type === 1 || props.type === 3 || props.type === 4) &&
                    <PopoverBtn
                        miAmount={miAmount}
                        plAmount={plAmount}
                    />
                }


            </Popover>
        </div>
    );
}