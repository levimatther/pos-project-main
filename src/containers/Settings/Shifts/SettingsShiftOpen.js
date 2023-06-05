import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Switch} from "@material-ui/core";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import SvgCompleteSale from "../../../Icons/CompleteSale";
import CloseShiftDialog from "./CloseShiftDialog";

const useStyle = makeStyles(theme => ({
    mainArea: {
        height: 'calc(100vh - 51px)',
        overflowY: 'auto'
    },
    openBtn: {
        padding: 0,
        height: 20,
        fontSize: 14
    },
    closeBtn: {
        fontSize: 16,
        height: 50
    }
}));

function SettingsShiftOpen(props) {
    const classes = useStyle();
    const [closeShift, setCloseShift] = useState(false);
    const {data} = props;

    function handleClose() {
        setCloseShift(false);
        props.handleCloseShift()
    }

    return(
        <div className='checkoutBody'>
            <CloseShiftDialog open={closeShift} onClose={() => setCloseShift(false)} handleConfirm={handleClose}/>
            <div className='height-50 borderBottomLight backgroundWhite flex flex-row justify-between align-center pr-20 pl-20'>
                <Button
                    color='primary'
                    onClick={props.handleCancel}
                    startIcon={
                        <ArrowLeftIcon/>
                    }
                    className={classes.openBtn} >Shifts</Button>
                <p className='p-0 m-0 color-41 fs-14'>
                    {!data ? 'June 23, 2020' : 'Shifts'}
                </p>
                <Button
                    color='primary'
                    disabled={!data}
                    onClick={() => setCloseShift(true)}
                    className={classes.openBtn}>{data ? 'Close shift' : ''}</Button>
            </div>
            <div className={classes.mainArea}>
                <div className='m-20 p-20 backgroundWhite borderRadius'>
                    <div className='flex flex-row justify-between align-center'>
                        <p className='p-0 m-0 fs-14 color-light'>
                            Shift opened: <span className='color-light-black'>Joseph Franko</span>
                        </p>
                        <p className='p-0 m-0 fs-14'>
                            June, 23, 2020 at 11:24 AM
                        </p>
                    </div>
                    {
                        !data && <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14 color-light'>
                                Shift closed: <span className='color-light-black'>Joseph Franko</span>
                            </p>
                            <p className='p-0 m-0 fs-14'>
                                June, 23, 2020 at 11:24 AM
                            </p>
                        </div>
                    }
                </div>
                {
                    data ? <div className='m-20 backgroundWhite borderRadius p-20'>
                        <p className='p-0 m-0 fs-12 color-light'>Cash drawer</p>
                        <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14'>Starting cash</p>
                            <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14'>Cash payments (LBP)</p>
                            <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14'>Cash payments (USD)</p>
                            <p className='p-0 m-0 fs-14'>$ 50.00</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14'>Paid-in</p>
                            <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14'>Paid-out</p>
                            <p className='p-0 m-0 fs-14 color-pink'>- L£ 1,000,000</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10 pb-10 borderBottomLight'>
                            <p className='p-0 m-0 fs-14'>Cash refunds</p>
                            <p className='p-0 m-0 fs-14 color-pink'>- L£ 1,000,000</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14 fw-bold'>Expected cash amount</p>
                            <p className='p-0 m-0 fs-18 fw-bold'>L£ 1,000,000</p>
                        </div>
                    </div>
                        : <div className='m-20 backgroundWhite borderRadius p-20'>
                            <p className='p-0 m-0 fs-12 color-light'>Cash drawer</p>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Starting cash</p>
                                <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Cash payments (LBP)</p>
                                <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Cash payments (USD)</p>
                                <p className='p-0 m-0 fs-14'>$ 50.00</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Paid-in</p>
                                <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Paid-out</p>
                                <p className='p-0 m-0 fs-14 color-pink'>- L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Cash refunds</p>
                                <p className='p-0 m-0 fs-14 color-pink'>- L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Expected cash amount</p>
                                <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10 pb-10 borderBottomLight'>
                                <p className='p-0 m-0 fs-14'>Actual cash amount</p>
                                <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14 fw-bold'>Cash difference</p>
                                <p className='p-0 m-0 fs-18 fw-bold color-primary'>+ L£ 1,000,000</p>
                            </div>
                        </div>
                }
                {
                    data?  <div className='m-20 backgroundWhite borderRadius p-20'>
                        <p className='p-0 m-0 fs-12 color-light'>Sales summary</p>
                        <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14'>Cash payments (LBP)</p>
                            <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14'>Cash payments (USD)</p>
                            <p className='p-0 m-0 fs-14'>$ 46.90</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14'>Card payments (LBP)</p>
                            <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10 pb-10 borderBottomLight'>
                            <p className='p-0 m-0 fs-14'>Card payments (USD)</p>
                            <p className='p-0 m-0 fs-14'>$ 109.45</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10 pb-10'>
                            <p className='p-0 m-0 fs-14 fw-bold'>Gross sales </p>
                            <p className='p-0 m-0 fs-18 fw-bold'>L£ 1,000,000</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-20'>
                            <p className='p-0 m-0 fs-14'>Refunds</p>
                            <p className='p-0 m-0 fs-14 color-pink'>- L£ 1,000,000</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14'>Discounts</p>
                            <p className='p-0 m-0 fs-14 color-pink'>- L£ 1,000,000</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10 pb-10 borderBottomLight'>
                            <p className='p-0 m-0 fs-14'>Taxes</p>
                            <p className='p-0 m-0 fs-14 color-pink'>- L£ 1,000,000</p>
                        </div>
                        <div className='flex flex-row justify-between align-center pt-10'>
                            <p className='p-0 m-0 fs-14 fw-bold'>Net sales </p>
                            <p className='p-0 m-0 fs-18 fw-bold'>L£ 1,000,000</p>
                        </div>
                    </div>
                        : <div className='m-20 backgroundWhite borderRadius p-20'>
                            <p className='p-0 m-0 fs-12 color-light'>Sales summary</p>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Cash payments (LBP)</p>
                                <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Cash payments (USD)</p>
                                <p className='p-0 m-0 fs-14'>$ 46.90</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Card payments (LBP)</p>
                                <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Card payments (USD)</p>
                                <p className='p-0 m-0 fs-14'>$ 109.45</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10 pb-10 borderBottomLight'>
                                <p className='p-0 m-0 fs-14'>Other payment types</p>
                                <p className='p-0 m-0 fs-14'>L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10 pb-10'>
                                <p className='p-0 m-0 fs-14 fw-bold'>Gross sales </p>
                                <p className='p-0 m-0 fs-18 fw-bold'>L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-20'>
                                <p className='p-0 m-0 fs-14'>Refunds</p>
                                <p className='p-0 m-0 fs-14 color-pink'>- L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14'>Discounts</p>
                                <p className='p-0 m-0 fs-14 color-pink'>- L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10 pb-10 borderBottomLight'>
                                <p className='p-0 m-0 fs-14'>Taxes</p>
                                <p className='p-0 m-0 fs-14 color-pink'>- L£ 1,000,000</p>
                            </div>
                            <div className='flex flex-row justify-between align-center pt-10'>
                                <p className='p-0 m-0 fs-14 fw-bold'>Net sales </p>
                                <p className='p-0 m-0 fs-18 fw-bold'>L£ 1,000,000</p>
                            </div>
                        </div>
                }
                {
                    data &&  <div className='m-20'>
                        <Button
                            fullWidth
                            color='primary'
                            variant='contained'
                            className={classes.closeBtn}
                            onClick={() => setCloseShift(true)}
                        >Close shift</Button>
                    </div>
                }
            </div>
        </div>
    )
}
export default SettingsShiftOpen;
