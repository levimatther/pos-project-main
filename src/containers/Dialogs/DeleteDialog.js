import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Dialog} from "@material-ui/core";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Transition from "./Transitions/Transition";
import {_transitionDuration} from "../../constants";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 360,
        height: 160,
        padding: 20,
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
        backgroundColor: theme.palette.primary.danger
    },
    cancelBtn: {
        color: 'white',
        fontSize: 14,
        textTransform: "capitalize",
        width: 60,
        height: 35,
        marginRight: 10,
        backgroundColor: theme.palette.primary.lightgray,
    }
}));
function DeleteDialog(props) {
    const {open, handleCancel, handleConfirm} = props;
    const classes = useStyles();
    return(
        <Dialog open={open} classes={{paper: classes.dialogPaper}}  TransitionComponent={Transition}
                transitionDuration={_transitionDuration}>
            <p className={clsx('p-0 m-0 fs-16 fw-bold', classes.header)}>
                Delete products
            </p>
            <div className='pt-25' />
            <p className={clsx('p-0 m-0 fs-14', classes.header)}>Are you sure you want to delete products in checkout?</p>
            <div className='pt-60 flex flex-row justify-end'>
                <Button variant="contained" className={classes.cancelBtn} classes={{contained: classes.contained}} onClick={handleCancel}>Cancel</Button>
                <Button variant="contained" className={classes.openBtn} classes={{contained: classes.contained}} onClick={handleConfirm}>Delete</Button>
            </div>
        </Dialog>
    )
}
export default DeleteDialog;
