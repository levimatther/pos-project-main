import React from "react";
import {Dialog} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Transition from "./Transitions/Transition";
import {_transitionDuration} from "../../constants";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 460,
        position: 'absolute',
        top: 60,
        color: theme.palette.primary.modalText
    },
    openBtn: {
        fontSize: 14,
        textTransform: "capitalize",
        width: 100,
        height: 35,
        backgroundColor: theme.palette.primary.main
    },
    cancelBtn: {
        fontSize: 14,
        color: 'white',
        textTransform: "capitalize",
        width: 80,
        height: 35,
        marginRight: 10,
        backgroundColor: theme.palette.primary.lightgray,
    },
}));
function StockDialog(props) {
    const classes = useStyles();
    const {open, handleConfirm, handleCancel, data} = props;
    return(
        <Dialog open={open} classes={{paper: classes.dialogPaper}} className={classes.root} TransitionComponent={Transition}
                transitionDuration={_transitionDuration}>
            <div className='p-20'>
                <div className='text-area height-20'>
                    <p className='p-0 m-0 fs-16 fw-bold'>Negative stock alert</p>
                </div>
            </div>
            <div className='pt-5 pl-20'>
                <p className='p-0 m-0 fs-14'>{data.length > 1 ? 'The following products are out of stock:' : 'The following product is out of stock:'}</p>
            </div>
            {
                data.map((item, index) => (
                    <div className='text-area height-17 pt-10 pl-20' key={index}>
                        <p className='p-0 m-0 fs-16 fw-bold'>{item.name}</p>
                    </div>
                ))
            }
            <div className='text-area height-17 pt-30 pl-20'>
                <p className='p-0 m-0 fs-14'>Are you sure you want to continue?</p>
            </div>

            <div className='pt-40 pr-20 pb-20 flex flex-row justify-end'>
                <Button variant="contained" className={classes.cancelBtn}
                        onClick={handleCancel}>Cancel</Button>
                <Button variant="contained" color={"primary"} className={classes.openBtn}
                        onClick={handleConfirm}>Continue</Button>
            </div>
        </Dialog>
    )
}

export default StockDialog;
