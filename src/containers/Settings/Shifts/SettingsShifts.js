import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, Dialog} from "@material-ui/core";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import Select from "react-select";
import {ArrowRightIcon} from "@material-ui/pickers/_shared/icons/ArrowRightIcon";
import {CSSTransition} from "react-transition-group";
import {_transitionDuration} from "../../../constants";
import SettingsShiftOpen from "./SettingsShiftOpen";
import SettingsShiftReport from "./SettingsShiftReport";
import CloseShiftDialog from "./CloseShiftDialog";

const useStyle = makeStyles(theme => ({
    mainArea: {
        height: 'calc(100vh - 155px)',
        overflowY: 'auto',
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        borderRadius: 4
    },
    openBtn: {
        padding: 0,
        height: 20,
        fontSize: 14
    }
}));

function SettingsShift() {
    const classes = useStyle();
    const customers = [
        {
            label: 'Super Customer',
            value: 'Super Customer',
        },
        {
            label: 'Good Customer',
            value: 'Good Customer'
        },
        {
            label: 'Excellent Customer',
            value: 'Excellent Customer'
        },
        {
            label: 'Vladimir Horbatovski',
            value: 'Vladimir Horbatovski'
        },
        {
            label: 'Vadim Jitenko',
            value: 'Vadim Jitenko'
        }
    ];
    const pos = [
        {
            label: 'Super POS',
            value: 'Super POS',
        },
        {
            label: 'Good POS',
            value: 'Good POS'
        },
        {
            label: 'Excellent POS',
            value: 'Excellent POS'
        },
        {
            label: 'POS 1',
            value: 'POS 1'
        },
        {
            label: 'POS 2',
            value: 'POS 2'
        }
    ];
    const initialShifts = [
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: true
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
        {
            date: "June 23, 2020",
            from: "12:45 PM",
            to: "12:45 AM",
            amount: "L£ 1,876,250",
            isOpen: false
        },
    ];
    const [shifts, setShifts] = useState(initialShifts);
    const [selectedOptions, setSelectedOptions] = useState(null);
    const [selectedPos, setSelectedPos] = useState(null);
    const [shiftDetail, setShiftDetail] = useState(false);
    const [shiftReport, setShiftReport] = useState(false);
    const [closeShift, setCloseShift] = useState(false);
    const [shiftIndex, setShiftIndex] = useState(0);
    const customStyles = {
        control: (provided) => (
            {
                ...provided,
                height: 45
            }
        )
    };

    function handleClick(index) {
        setShiftIndex(index);
        setShiftDetail(true);
    }

    function handleClose() {
        setCloseShift(false);
        setShifts(prevState => {
            let newItem = prevState.map((item, index) => {
                return {...item, isOpen: false};
            });
            return ([...newItem])
        })
    }

    function checkIfClose() {
        let flag = false;
        shifts.forEach((item) => {
            flag = flag || item.isOpen;
        });
        return flag;
    }

    function handleCloseSingleShift() {
        setShifts(prevState => {
            let item = prevState[shiftIndex];
            item.isOpen = false;
            return ([...prevState.slice(0, shiftIndex), item, ...prevState.slice(shiftIndex + 1)])
        })
    }

    return (
        <div className='position-relative'>
            <CloseShiftDialog open={closeShift} onClose={() => setCloseShift(false)} handleConfirm={handleClose}/>
            <div
                className='height-50 borderBottomLight backgroundWhite flex flex-row justify-between align-center pr-20 pl-20'>
                <Button
                    color='primary'
                    disabled
                    className={classes.openBtn}/>
                <p className='p-0 m-0 color-41 fs-14'>
                    Shifts
                </p>
                <Button
                    color='primary'
                    onClick={() => setCloseShift(true)}
                    disabled={!checkIfClose()}
                    className={classes.openBtn}>{checkIfClose() ? 'Close shift' : ''}</Button>
            </div>
            <div className='m-20 flex flex-row'>
                <div className='mr-20 fullWidth'>
                    <Select
                        placeholder={'Select Employee'}
                        options={customers}
                        styles={customStyles}
                        value={selectedOptions}
                        onChange={(data) => setSelectedOptions(data)}
                        fullWidth
                        isClearable={true}
                        theme={theme => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: '#7CE7AC',
                            }
                        })}
                    />
                </div>
                <div className='fullWidth'>
                    <Select
                        placeholder={'Select POS'}
                        options={pos}
                        styles={customStyles}
                        value={selectedPos}
                        isClearable={true}
                        onChange={(data) => setSelectedPos(data)}
                        fullWidth
                        theme={theme => ({
                            ...theme,
                            colors: {
                                ...theme.colors,
                                primary: '#7CE7AC',
                            }
                        })}
                    />
                </div>
            </div>
            <div className={classes.mainArea}>
                {
                    shifts.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => handleClick(index)}
                            className='height-60 borderBottomLight flex flex-row justify-between pl-20 pr-20 cursor-pointer'>
                            <div className='flex flex-col justify-content'>
                                <p className='pb-5 m-0 fs-14'>
                                    June 23, 2020
                                </p>
                                <div className='flex flex-row align-center'>
                                    <p className='p-0 m-0 fs-12 color-light'>
                                        12:45 PM&nbsp;
                                    </p>
                                    {
                                        !item.isOpen ? <p className='p-0 m-0 fs-12 color-light'>- 12:45 AM</p>
                                            : <div className='felx justify-content align-center background-F2 borderRadius ml-10'>
                                                <p className='pl-20 pr-20 pt-5 pb-5 m-0 fs-12 color-primary'>Open</p>
                                            </div>

                                    }
                                </div>
                            </div>
                            <div className='flex flex-row align-center'>
                                <p className='pr-10 m-0 fs-18 fw-bold'>L£ 1,876,250</p>
                                <ArrowRightIcon style={{fontSize: 14}} color='inherit'/>
                            </div>
                        </div>
                    ))
                }
            </div>
            <CSSTransition
                in={shiftDetail}
                classNames="checkOutSlideSection"
                timeout={_transitionDuration}
            >
                <SettingsShiftOpen handleCancel={() => setShiftDetail(false)} data={shifts[shiftIndex].isOpen}
                                   handleCloseShift={handleCloseSingleShift}/>
            </CSSTransition>
        </div>
    )
}

export default SettingsShift;
