import React from "react";
import {Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        height: 310,
        position: 'absolute',
        top: 60
    },
    openBtn: {
        fontSize: 14,
        textTransform: "capitalize",
        height: 35,
    },
    noteArea: {
        height: 120
    },
    refundBtn: {
        fontSize: 14,
        height: 40,
    },
}));
function ReturnProductsComplete(props) {
    const classes = useStyles();
    return(
            <div className='right-body'>
                <div className='height-50 flex align-center justify-content borderBottomLight'>
                    <p className='color-light-blue fs-16 fw-bold p-0 m-0'>Cash (LBP)</p>
                </div>
                <div className='pt-20 flex justify-content align-center height-20'>
                    <p className='p-0 m-0 fs-12 color-light-black'>Amount to refund</p>
                </div>
                <div className='pt-5 flex justify-content align-center height-40'>
                    <p className='p-0 m-0 fs-36 color-light-black fw-bold'>L£ 20,000</p>
                </div>
                <div className='pt-20 pb-10 flex justify-content align-center'>
                    <img src={'/assets/images/svg/Cash.svg'} alt={"logo"}/>
                </div>
                <div className='pt-5 flex justify-content align-center height-20'>
                    <p className='p-0 m-0 fs-12 color-light-black'>Give  <span className='fw-bold'>Cash (LBP)</span> to customer</p>
                </div>
                <div className='pt-40 pl-20 pr-20'>
                    <Button className={classes.refundBtn} fullWidth color='primary' variant='contained'
                            onClick={props.handleConfirm}>Complete refund</Button>
                </div>
            </div>
    )
}

export default ReturnProductsComplete;
