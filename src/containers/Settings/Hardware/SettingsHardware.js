import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import {ArrowRightIcon} from "@material-ui/pickers/_shared/icons/ArrowRightIcon";
import {CSSTransition} from "react-transition-group";
import {_transitionDuration} from "../../../constants";
import SettingsShiftReport from "../Shifts/SettingsShiftReport";
import ReceiptPrinter from "./ReceiptPrinter";
import TagPrinter from "./TagPrinter";
import SvgConnectPrinter from "../../../Icons/ConnectPrinter";
import SvgConnectTag from "../../../Icons/ConnectTag";
import SvgConnectCustomerView from "../../../Icons/ConnectCustomerView";

const useStyle = makeStyles(theme => ({
    mainArea: {
        height: 'calc(100vh - 51px)',
        overflowY: 'auto'
    }
}));

function SettingsHardware() {
    const classes = useStyle();
    const [receiptPrinter, setReceiptPrinter] = useState(false);
    const [tagPrinter, setTagPrinter] = useState(false);
    const [rPrinters, setRPrinters] = useState([
    ]);
    const [tPrinters, setTPrinters] = useState([]);

    function addNewPrinter(data) {
        setRPrinters(prevState => {
            return [...prevState, data]
        })
    }
    function addNewTagPrinter(data) {
        setTPrinters(prevState => {
            return [...prevState, data]
        })
    }

    function editPrinter(data, index) {
        setRPrinters(prevState => {
            return [...prevState.slice(0, index),data, ...prevState.slice(index+1)]
        })
    }
    function editTagPrinter(data, index) {
        setTPrinters(prevState => {
            return [...prevState.slice(0, index),data, ...prevState.slice(index+1)]
        })
    }

    return(
        <div className='position-relative'>
            <div className='height-50 borderBottomLight backgroundWhite flex flex-row justify-between align-center'>
                <Button
                    color='primary'
                    disabled
                    />
                <p className='p-0 m-0 color-41 fs-14'>
                    Hardware
                </p>
                <Button
                    color='primary'
                    disabled
                    />
            </div>
            <div className={classes.mainArea}>
                <div className='m-20 backgroundWhite borderRadius height-180'>
                    <div className='height-60 borderBottomLight flex flex-row justify-between pl-20 pr-20 cursor-pointer'
                         onClick={() => setReceiptPrinter(true)}
                    >
                        <div className='flex flex-row align-center'>
                            {/*<img className='width-10 height-10' src='/assets/images/svg/Connect-Printer.svg' alt='logo'/>*/}
                            <SvgConnectPrinter/>
                            <p className='pl-10 pb-2 m-0 fs-14'>Connect to receipt printer</p>
                        </div>
                        <div className='flex flex-row align-center'>
                            <p className='pr-10 pb-2 m-0 fs-14 color-light'>1 Connected</p>
                            <ArrowRightIcon style={{fontSize: 14}} color='inherit'/>
                        </div>
                    </div>
                    <div className='height-60 borderBottomLight flex flex-row justify-between pl-20 pr-20 cursor-pointer'
                         onClick={() => setTagPrinter(true)}
                    >
                        <div className='flex flex-row align-center'>
                            {/*<img className='width-10 height-10' src='/assets/images/svg/Connect-Tag.svg' alt='logo'/>*/}
                            <SvgConnectTag />
                            <p className='pl-10 pb-2 m-0 fs-14'>Connect to tag printer</p>
                        </div>
                        <div className='flex flex-row align-center'>
                            <p className='pr-10 pb-2 m-0 fs-14 color-light'>3 Connected</p>
                            <ArrowRightIcon style={{fontSize: 14}} color='inherit'/>
                        </div>
                    </div>
                    <div className='height-60 borderBottomLight flex flex-row justify-between pl-20 pr-20 cursor-pointer'
                    >
                        <div className='flex flex-row align-center'>
                            {/*<img className='width-10 height-10' src='/assets/images/svg/Connect-CustomerView.svg' alt='logo'/>*/}
                            <SvgConnectCustomerView />
                            <p className='pl-10 pb-2 m-0 fs-14'>Connect Customer View</p>
                        </div>
                        <div className='flex flex-row align-center'>
                            <p className='pr-10 pb-2 m-0 fs-14 color-light'>1 Connected</p>
                            <ArrowRightIcon style={{fontSize: 14}} color='inherit'/>
                        </div>
                    </div>
                </div>
            </div>
            <CSSTransition
                in={receiptPrinter}
                classNames="checkOutSlideSection"
                timeout={_transitionDuration}
            >
                <ReceiptPrinter data={rPrinters} handleCancel={() => setReceiptPrinter(false)} addNewprinter={addNewPrinter} editPrinter={editPrinter}/>
            </CSSTransition>
            <CSSTransition
                in={tagPrinter}
                classNames="checkOutSlideSection"
                timeout={_transitionDuration}
            >
                <TagPrinter data={tPrinters} handleCancel={() => setTagPrinter(false)} addNewprinter={addNewTagPrinter} editPrinter={editTagPrinter}/>
            </CSSTransition>
        </div>
    )
}
export default SettingsHardware;
