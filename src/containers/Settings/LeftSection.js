import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import DehazeIcon from "@material-ui/icons/Dehaze";
import * as Actions from "../../store/actions";
import {useDispatch} from "react-redux";
import {ArrowRightIcon} from "@material-ui/pickers/_shared/icons/ArrowRightIcon";
import {useHistory} from 'react-router-dom'
import clsx from "clsx";
const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.headerColor,
        backgroundColor: 'white',
        width: 268,
        height: '100vh',
        overflow: 'hidden',
        borderRight: `1px solid ${theme.palette.primary.borderColor}`
    },
    toggleBtn: {
        height: 50,
        width: 60,
        minWidth: 60,
        backgroundColor: "white",
        color: 'black',
        border: 0,
        borderRadius: 0
    },
}));
function SettingsLeftSection() {
    const classes = useStyles();
    const dispatch = useDispatch();
    function openSidebar() {
        dispatch(Actions.openNab())
    }
    const history = useHistory();
    const isGeneral = history.location.pathname === '/main/settings';
    const isShifts = history.location.pathname === '/main/settings/shifts';
    const isHardware = history.location.pathname === '/main/settings/hardware';
    return(
        <div className={classes.root}>
            <div className='height-50 borderBottomLight flex justify-between align-center'>
                <ToggleButton value={'justify'} className={classes.toggleBtn} onClick={openSidebar}>
                    <DehazeIcon fontSize="small"/>
                </ToggleButton>
                <p className='p-0 m-0 fs-14 fw-bold'>Settings</p>
                <div className={classes.toggleBtn} disabled />
            </div>
            <div
                className={clsx(isGeneral ? 'background-F0' : 'backgroundWhite', 'flex flex-row align-center justify-between pl-10 pr-10 height-50 borderBottomLight cursor-pointer')}
                onClick={() => history.push('/main/settings')}
            >
                <p className= {clsx(isGeneral? 'color-primary' : 'color-light-black', 'p-0 m-0 fs-12')}>
                    General
                </p>
                <ArrowRightIcon style={{fontSize: 12}} color={isGeneral ? 'primary' : 'inherit'}/>
            </div>
            <div
                className={clsx(isShifts ? 'background-F0' : 'backgroundWhite', 'flex flex-row align-center justify-between pl-10 pr-10 height-50 borderBottomLight cursor-pointer')}
                onClick={() => history.push('/main/settings/shifts')}
            >
                <p className= {clsx(isShifts? 'color-primary' : 'color-light-black', 'p-0 m-0 fs-12')}>
                    Shifts
                </p>
                <ArrowRightIcon style={{fontSize: 12}} color={isShifts ? 'primary' : 'inherit'}/>
            </div>
            <div
                className={clsx(isHardware ? 'background-F0' : 'backgroundWhite', 'flex flex-row align-center justify-between pl-10 pr-10 height-50 borderBottomLight cursor-pointer')}
                onClick={() => history.push('/main/settings/hardware')}
            >
                <p className= {clsx(isHardware? 'color-primary' : 'color-light-black', 'p-0 m-0 fs-12')}>
                    Hardware
                </p>
                <ArrowRightIcon style={{fontSize: 12}} color={isHardware ? 'primary' : 'inherit'}/>
            </div>
        </div>
    )
}
export default SettingsLeftSection;
