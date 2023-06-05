import React, {useEffect, useState} from "react";
import {Dialog} from "@material-ui/core";
import Transition from "./Transitions/Transition";
import {makeStyles} from "@material-ui/core/styles";
import VolumeKeypad from "./VolumeKeypad";
import {_numberWithCommas, _transitionDuration} from "../../constants";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 320,
        borderRadius: 4,
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
        backgroundColor: theme.palette.primary.maina
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

function VolumeDialog(props) {
    const {open, data, onClose} = props;
    const [singleData, setSingleData] = useState({});
    const [count, setCount] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [amount, setAmount] = useState(0);
    const classes = useStyles();
    useEffect(() => {
        setSingleData(prevState => {
            let flag = {...data};
            return flag;
        });
        return function cleanUp() {
            setIsClicked(false);
            setAmount(0);
            setCount(0);
            setSingleData({})
        }
    }, [data]);

    function handleConfirm() {
        let fixAmount = amount/1000;
        let prod = {...singleData, amount: fixAmount};
        props.onCheckOut(prod);
    }
    useEffect(() => {
        if (amount === 0) {
            setIsClicked(false);
        }
    }, [amount]);
    function handleInput(e) {
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
                        return prevState + e
                    });
                    setCount(prevState => {
                        return prevState + 1;
                    })
                }
                return;
            } else {

                setAmount(prevState => {
                    return prevState * 10 + e
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


    return (
        <Dialog open={open} onClose={onClose} TransitionComponent={Transition}
                transitionDuration={_transitionDuration}
                classes={{paper: classes.dialogPaper}}>
            <div className='flex flex-col height-60 p-10 justify-evenly' style={{borderBottom: '1px solid #979797'}}>
                <p className='fs-16 p-0 m-0'>{singleData.name}</p>
                <div className='flex flex-row justify-between'>
                    <p className='fs-16 pt-10 m-0'>{_numberWithCommas(20000)} <span className='fs-10'>/unit</span></p>
                    <p className='fs-16 pt-10 m-0 fw-bold'>L£ {_numberWithCommas(Math.round(20000 * amount) / 1000)}</p>
                </div>
            </div>
            <div className='flex flex-col height-60 p-10 justify-evenly position-relative'>
                <div className='flex justify-end'>
                    <p className='fs-24 p-0 m-0'>{(amount / 1000).toFixed(3)}</p>
                    <p className='fs-10 p-0 m-0 color-light position-absolute top-5 left-10'>Weight/Volume</p>
                </div>
            </div>
            <VolumeKeypad handleAdd={handleConfirm} text={amount} handleInput={handleInput} handleBack={handleBack}/>
        </Dialog>
    )
}

export default VolumeDialog
