import React, {useEffect, useState, useRef} from "react";
import clsx from "clsx";
import Animate from "../../components/animate";
import LoginForm from "../../components/LoginForm";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import * as Actions from '../../store/actions'
import SvgClockIconR from "../../Icons/ClockIconR";
import SvgClockIconG from "../../Icons/ClockIconG";
import SvgClockIcon from "../../Icons/ClockIcon";

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.lightgray
    },
    clockinBtn: {
        backgroundColor: theme.palette.primary.btnColor,
        color: 'white',
        width: 220,
        borderRadius: 4,
        fontSize: 21,
        fontWeight: 'normal',
        textTransform: 'capitalize',
        paddingTop: 12,
        paddingBottom: 12
    },
    clockoutBtn: {
        backgroundColor: theme.palette.primary.danger,
        color: 'white',
        width: 220,
        borderRadius: 4,
        fontSize: 21,
        fontWeight: 'normal',
        textTransform: 'capitalize',
        paddingTop: 12,
        paddingBottom: 12
    }
}));

function Clock() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const isClockedIn = localStorage.getItem("clockIn");
    const isClockIn = useSelector((state) => state.user.clockIn);
    const [curTime, setCurTime] = useState(new Date());
    const [record, setRecord] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });
    useEffect(() => {
        dispatch(Actions.clockOut())
    }, []);
    const cDate = curTime.getDate();
    const cMonth = curTime.getMonth();
    const cYear = curTime.getFullYear();
    const cHour = curTime.getHours();
    const cMin = curTime.getMinutes();
    const ampm = cHour >= 12 ? 'PM' : 'AM';
    const tempHour = cHour % 12;
    const disHour = tempHour === 0 ? 12 : tempHour;
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    function tick() {
        setCurTime(new Date())
    }

    function handleClockIn() {
        localStorage.setItem("clockIn", "1111");
        localStorage.setItem("token", "1111");
        localStorage.setItem("clockTime", cHour + ':' + cMin + ' ' + ampm);
        setRecord(true);
        dispatch(Actions.clockOut())
    }

    function handleClockOut() {
        localStorage.removeItem("clockIn");
        localStorage.removeItem("token");
        localStorage.setItem("clockTime", cHour + ':' + cMin + ' ' + ampm);
        setRecord(true);
        dispatch(Actions.clockOut())
    }

    function handleRecord() {
        if (isClockedIn) {
            history.push('/main/pos')
        } else {
            history.push('/login')
        }
    }
    // function getTime() {
    //     let data = new Date();
    //     let cHour = data.getHours();
    //     let cMin = data.getMinutes();
    //     let ampm = cHour >= 12 ? 'PM' : 'AM';
    //     let disHour = cHour % 12;
    //     return [disHour, cMin, ampm]
    // }

    function handleKeyDown() {
        containerRef.current.focus();
    }
    return (
        <div className={clsx(classes.root, 'flex flex-col justify-content page')} onClick={handleKeyDown}>
            {
                !record ? (
                    <div>
                        <div className={'flex justify-content pt-42'}>
                            <Animate animation="transition.expandIn">
                                <div className='mb-32'>
                                    {
                                        isClockIn ? isClockedIn ? <SvgClockIconR/> : <SvgClockIconG/> : <SvgClockIcon/>
                                    }
                                </div>
                            </Animate>
                        </div>
                        <div className={'flex justify-content pt-10'}>
                            <Animate animation="transition.expandIn">
                                <p className={'m-0 p-0 fs-18 color-black'}>{monthList[cMonth] + ' ' + cDate + ', ' + cYear + ' | ' + disHour}<span
                                    className={'blink'}> : </span>{cMin + ' ' + ampm}</p>
                            </Animate>
                        </div>
                        <div className={'flex justify-content pt-36 pb-30'}>
                            <Animate animation="transition.expandIn">
                                <p className={'m-0 p-0 fs-16 f-ls-19'}>Enter your PIN</p>
                            </Animate>
                        </div>
                        <div className={'flex justify-content pb-40'}>
                            <LoginForm containerRef={containerRef}/>
                        </div>
                        {
                            isClockIn && !isClockedIn ?
                                <div className={'flex justify-content pb-40'}>
                                    <Animate animation="transition.expandIn">
                                        <Button title={"Clock-in"} className={classes.clockinBtn}
                                                onClick={handleClockIn}>Clock-in</Button>
                                    </Animate>
                                </div> : <></>
                        }
                        {
                            isClockIn && isClockedIn ?
                                <div className={'flex justify-content pb-40'}>
                                    <Animate animation="transition.expandIn">
                                        <Button title={"Clock-in"} className={classes.clockoutBtn}
                                                onClick={handleClockOut}>Clock-out</Button>
                                    </Animate>
                                </div> : <></>
                        }
                    </div>
                ) : (
                    <div>
                        <div className={'flex justify-content pt-187 pb-45'}>
                            <Animate animation="transition.expandIn">
                                <img className=""
                                     src={isClockedIn ? "/assets/images/svg/clock-icon-g.svg" : "/assets/images/svg/clock-icon-r.svg"}
                                     alt="logo"/>
                            </Animate>
                        </div>
                        <div className={'flex justify-content pb-10'}>
                            <Animate animation="transition.expandIn">
                                <p className={'m-0 p-0 fs-16 f-ls-19'}>
                                    <span className={'fw-bold'}>Jackson Smith</span>
                                    {
                                        !isClockedIn ? ' clocked out at' : ' clocked in at'
                                    }
                                </p>
                            </Animate>
                        </div>
                        <div className={'flex justify-content'}>
                            <Animate animation="transition.expandIn">
                                <p className={'m-0 p-0 fw-bold fs-32 f-ls-19 color-2d'}>
                                    {localStorage.getItem("clockTime")}
                                </p>
                            </Animate>
                        </div>
                        <div className={'flex justify-content pt-40'}>
                            <Animate animation="transition.expandIn">
                                <Button title={"Clock-in"} className={classes.clockinBtn}
                                        onClick={handleRecord}>{isClockedIn ? 'Go to POS' : 'Done'}</Button>
                            </Animate>
                        </div>
                        {
                            isClockedIn ? (
                                <div className={'flex justify-content pt-40'}>
                                    <img className="pr-5"
                                         src={"/assets/images/svg/return.svg"}
                                         alt="logo"/>
                                    <a className={'m-0 p-0 fs-16'} style={{color: '#7CE7AC', cursor: 'pointer'}} onClick={() => history.push('/login')}>Back to login page</a>
                                </div>
                            ) : ('')
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Clock;
