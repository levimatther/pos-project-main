import React from "react";
import {Dialog, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Transition from "../Transitions/Transition";
import {_numberWithCommas, _transitionDuration} from "../../../constants";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 400,
        position: 'absolute',
        top: 60
    },
    header: {
        color: theme.palette.primary.modalText,
        borderBottom: `1px solid ${theme.palette.primary.borderColor}`
    },
    searchArea: {
        borderBottom: `1px solid ${theme.palette.primary.borderColor}`
    },
    contained: {
        boxShadow: 'none'
    },
    trashBtn: {
        color: theme.palette.danger.main,
        padding: 0,
    },
    mergeBtn: {
        color: theme.palette.primary.main,
        padding: 0,
        marginLeft: 10
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
        border: `1px solid ${theme.palette.primary.borderColor}`,
        height: 40,
        borderRadius: 4
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
    },
    salesArea: {
        paddingLeft: 20,
        paddingRight: 20,
        display: 'block'
    },
    labelDisabled: {
        color: theme.palette.primary.product
    },
    openBtn: {
        fontSize: 14,
        textTransform: "capitalize",
        width: 100,
        height: 35,
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

function SalesMergeDialog(props) {
    const classes = useStyles();
    const sales = props.data;
    return(
        <Dialog open={props.open} classes={{paper: classes.dialogPaper}} TransitionComponent={Transition}
                transitionDuration={_transitionDuration}>
            <div className='p-20'>
                <div className='text-area height-20'>
                    <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Merge sales</p>
                </div>
            </div>
            <div className='pl-20'>
                <div className='text-area height-17'>
                    <p className='p-0 m-0 fs-14 color-light-blue'>Are you sure you want to merge the following sales?</p>
                </div>
            </div>
            <div className={classes.salesArea}>
                {
                    sales.map((item, index) => (
                        <div className='flex flex-row justify-between height-17 mt-10' key={index}>
                            <p className=' p-0 m-0 fs-14 fw-bold color-light-blue'>{`${item.name} (${item.items.length} items)`}</p>
                            <p className='p-0 m-0 fs-14 fw-bold color-light-blue'>{`L£ ${_numberWithCommas(item.price)}`}</p>
                        </div>
                    ))
                }
            </div>
            <div className='pt-40 flex flex-row justify-end pr-20 pb-20'>
                <Button variant="contained" className={classes.cancelBtn} onClick={props.handleCancel}>Cancel</Button>
                <Button variant="contained" color='primary' className={classes.openBtn} onClick={props.handleDelete}>Merge</Button>
            </div>
        </Dialog>
    )
}
export default SalesMergeDialog;
