import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import {useSelector} from "react-redux";
import clsx from "clsx";
import {useHistory} from "react-router-dom";
import SvgPaid from "../../Icons/Paid";
import SvgRefunded from "../../Icons/Refunded";
const useStyles = makeStyles(theme => ({
    mainArea: {
        height: 'calc(100vh - 51px)',
        overflowY: 'auto'
    },
}));

function CashDetail(props) {
    const classes = useStyles();
    const data = useSelector(state => state.cash.data);
    const isPayIn = data.type === 'payin';
    console.log(data);
    function handleBack() {
        props.handleCancel();
    }

    return (
        <div className='checkoutBody'>
            <div className='height-50 borderBottomLight backgroundWhite flex flex-row justify-between align-center'>
                <Button
                    color='primary'
                    startIcon={
                        <ArrowLeftIcon/>
                    }
                    onClick={handleBack}
                    className={classes.openBtn}>Back</Button>
                <p className='p-0 m-0 color-41 fs-14'>
                    {isPayIn ? 'Pay-in' : 'Pay-out'}
                </p>
                <Button
                    color='primary'
                    disabled
                    className={classes.openBtn}/>
            </div>
            <div className='m-20 backgroundWhite borderRadius'>
                <div className='height-60 p-20 flex flex-row justify-between borderBottomLight'>
                    <div className='flex flex-col justify-content'>
                        <p className={clsx('p-0 m-0 fs-36 fw-bold', isPayIn ? 'color-primary' : 'color-pink')}>{data.amount}</p>
                        <p className='pt-5 m-0 fs-10'>June 26, 2020 at 12:45 AM</p>
                    </div>
                    <div className='flex flex-col align-end justify-content'>
                        <div className='flex flex-row align-center'>
                            {
                                isPayIn ? <SvgPaid/> : <SvgRefunded/>
                            }

                            <p className={clsx(isPayIn ? 'color-primary' : 'color-pink', 'pl-5 m-0 fs-10')}>{isPayIn ? 'Pay-in' : 'Pay-out'}</p>
                        </div>
                        <p className='pt-5 m-0 fs-10 color-light'>{isPayIn? 'Pay-in' : 'Pay-out'} by James Franko</p>
                        <p className='pt-5 m-0 fs-10 color-light'>West Side Location &nbsp;&nbsp;|&nbsp;&nbsp; POS 2</p>
                    </div>
                </div>
                {
                    isPayIn ?
                        <div className='height-60 p-20 flex'>
                            <div className='flex flex-col'>
                                <p className='color-light pb-10 m-0 fs-12'>Reason</p>
                                <p className='pt-5 m-0 fs-12 f-italic'>Note will be written in italic font and it will
                                    be written in this section.</p>
                            </div>
                        </div> :
                        <div className='height-60 p-20 flex flex-row justify-between'>
                            {
                                !data.noSupplier &&   <div className='flex flex-col justify-content'>
                                    <p className='color-light pb-10 m-0 fs-12'>Supplier</p>
                                    <div className='flex flex-row align-center'>
                                        <div className='circleArea backcolor-pink'>
                                            <p className='p-0 m-0 fs-12 fw-bold color-pink'>RL</p>
                                        </div>
                                        <div className='flex flex-col'>
                                            <p className='pb-5 m-0 fs-14 fw-bold'>Lebanese Food Company SARL</p>
                                            <p className='p-0 m-0 fs-10 color-light'>Richard Lopez &nbsp;&nbsp;|&nbsp;&nbsp; 03-123987</p>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className={clsx('flex flex-col', !data.noSupplier ? 'align-end' : '')}>
                                <p className='color-light pb-10 m-0 fs-12'>Reason</p>
                                <p className='pt-5 m-0 fs-12 f-italic'>Note will be written in italic font and it will
                                    be written in this section.</p>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default CashDetail;
