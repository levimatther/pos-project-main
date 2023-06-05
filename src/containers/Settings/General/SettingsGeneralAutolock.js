import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Switch} from "@material-ui/core";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import SvgCompleteSale from "../../../Icons/CompleteSale";
import SvgSelected from "../../../Icons/Selected";

const useStyle = makeStyles(theme => ({
    mainArea: {
        height: 'calc(100vh - 51px)',
        overflowY: 'auto'
    }
}));

function SettingsGeneralAutolock(props) {
    const classes = useStyle();
    const [alwaysPrint, setAlwaysPrint] = useState(true);
    const {data} = props;
    const timesList = [
        {
            label: 'Never',
            value: 0
        },
        {
            label: 'After 2 minutes',
            value: 2
        },
        {
            label: 'After 5 minutes',
            value: 5
        },
        {
            label: 'After 10 minutes',
            value: 10
        },
        {
            label: 'After 20 minutes',
            value: 20
        },
        {
            label: 'After 30 minutes',
            value: 30
        },
    ];
    return(
        <div className='checkoutBody'>
            <div className='height-50 borderBottomLight backgroundWhite flex flex-row justify-between align-center'>
                <Button
                    color='primary'
                    startIcon={
                        <ArrowLeftIcon/>
                    }
                    onClick={props.handleCancel}
                >General</Button>
                <p className='p-0 m-0 color-41 fs-14'>
                    Auto-lock screen
                </p>
                <Button
                    color='primary'
                    disabled
                />
            </div>
            <div className={classes.mainArea}>
                <div className='m-20 backgroundWhite borderRadius'>
                    {
                        timesList.map((item, index) => (
                            <div key={index} className='flex flex-row height-40 borderBottomLight justify-between align-center pl-20 pr-20 cursor-pointer'
                                 onClick={() => props.handleClick(item.label)}>
                                <p className='p-0 m-0 fs-14'>{item.label}</p>
                                {
                                    data === item.label && <SvgSelected/>
                                }
                            </div>
                        ))
                    }
                </div>
                <div className='ml-20 mr-20 backgroundWhite borderRadius'>
                    <div className='height-80 flex flex-row pl-20 pr-10 justify-between align-center'>
                        <div className='flex flex-col'>
                            <p className='pb-5 m-0 fs-14 fw-bold'>Auto-lock after sale</p>
                            <p className='p-0 m-0 fs-12 color-light'>Sceen will be locked after orders are completed</p>
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
        </div>
    )
}
export default SettingsGeneralAutolock;
