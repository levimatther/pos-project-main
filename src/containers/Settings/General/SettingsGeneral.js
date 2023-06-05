import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Switch} from "@material-ui/core";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import {ArrowRightIcon} from "@material-ui/pickers/_shared/icons/ArrowRightIcon";
import {CSSTransition} from "react-transition-group";
import {_transitionDuration} from "../../../constants";
import SplitPayment from "../../Dialogs/CheckOut/SplitPayment/SplitPayment";
import SettingsGeneralAutolock from "./SettingsGeneralAutolock";

const useStyle = makeStyles(theme => ({
    mainArea: {
        height: 'calc(100vh - 51px)',
        overflowY: 'auto'
    }
}));

function SettingsGeneral() {
    const classes = useStyle();
    const [alwaysPrint, setAlwaysPrint] = useState(true);
    const [autoLock, setAutoLock] = useState(false);
    const [autoLockTime, setAutoLockTime] = useState('After 2 minutes');
    return(
        <div className='position-relative'>
            <div className='height-50 borderBottomLight backgroundWhite flex flex-row justify-between align-center'>
                <Button
                    color='primary'
                    disabled
                    className={classes.openBtn} />
                <p className='p-0 m-0 color-41 fs-14'>
                    General
                </p>
                <Button
                    color='primary'
                    disabled
                    className={classes.openBtn}/>
            </div>
            <div className={classes.mainArea}>
                <div className='m-20 backgroundWhite height-140 borderRadius flex flex-col'>
                    <div className='height-60 borderBottomLight flex flex-row justify-between cursor-pointer align-center pl-20 pr-20' onClick={() => setAutoLock(true)}>
                        <p className='p-0 m-0 fs-14 fw-bold'>Auto-lock screen</p>
                        <div className='flex flex-row align-center'>
                            <p className='pb-2 pr-5 m-0 fs-12 color-light'>{autoLockTime}</p>
                            <ArrowRightIcon style={{fontSize: 14}} color='disabled'/>
                        </div>
                    </div>
                    <div className='height-80 flex flex-row pl-20 pr-10 justify-between align-center'>
                        <div className='flex flex-col'>
                            <p className='pb-5 m-0 fs-14 fw-bold'>Always print receipts</p>
                            <p className='p-0 m-0 fs-12 color-light'>Activate automatic receipt printing on POS orders</p>
                        </div>
                        <Switch
                            checked={alwaysPrint}
                            onChange={() => setAlwaysPrint(prevState => {
                                return !prevState
                            })}
                            color='primary'
                            size='medium'
                            name="checkedB"
                            inputProps={{'aria-label': 'primary checkbox'}}
                        />
                    </div>
                </div>
            </div>
            <CSSTransition
                in={autoLock}
                classNames="checkOutSlideSection"
                timeout={_transitionDuration}
            >
                <SettingsGeneralAutolock handleCancel={() => setAutoLock(false)} data={autoLockTime} handleClick={(data) => setAutoLockTime(data)}/>
            </CSSTransition>
        </div>
    )
}
export default SettingsGeneral;
