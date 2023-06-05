import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Button} from "@material-ui/core";
import {ArrowLeftIcon} from "@material-ui/pickers/_shared/icons/ArrowLeftIcon";
import SvgAdd from "../../../Icons/Add";
import {ArrowRightIcon} from "@material-ui/pickers/_shared/icons/ArrowRightIcon";
import clsx from "clsx";
import AddPrinterDialog from "./Dialog/AddPrinterDialog";
import EditPrinterDialog from "./Dialog/EditPrinterDialog";
import SvgAddPrinterG from "../../../Icons/AddPrinterG";
import SvgAddPrinter from "../../../Icons/AddPrinter";
import SvgSettingsEmpty from "../../../Icons/SettingsEmpty";

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
    addBtn: {
        width: 200,
        height: 50,
        fontSize: 16,
        fontWeight: 'bold'
    }
}));

function TagPrinter(props) {
    const classes = useStyle();
    const [addPrinter, setAddPrinter] = useState(false);
    const [editPrinter, setEditPrinter] = useState(false);
    const [printerIndex, setPrinterIndex] = useState(0);
    const printers = props.data;

    function addNewPrinter(data) {
        props.addNewprinter(data);
        setAddPrinter(false);
    }

    function editPrint(index) {
        setPrinterIndex(index);
        setEditPrinter(true);
    }

    function editNewPrinter(data) {
        props.editPrinter(data, printerIndex);
        setEditPrinter(false);
    }

    return (
        <div className='checkoutBody'>
            <AddPrinterDialog open={addPrinter} onClose={() => setAddPrinter(false)} addPrinter={(data) => addNewPrinter(data)} tag={true}/>
            <EditPrinterDialog open={editPrinter} onClose={() => setEditPrinter(false)} addPrinter={(data) => editNewPrinter(data)} data={printers[printerIndex]} tag={true}/>
            <div
                className='flex flex-row justify-between height-50 borderBottomLight backgroundWhite pl-20 pr-20 align-center'>
                <Button
                    color='primary'
                    onClick={props.handleCancel}
                    startIcon={
                        <ArrowLeftIcon/>
                    }
                    className={classes.openBtn}>Hardware</Button>
                <p className='p-0 m-0 color-41 fs-14'>
                    Tag printers
                </p>
                <Button
                    color='primary'
                    startIcon={printers.length !== 0 ? <SvgAddPrinterG/> : null}
                    disabled={printers.length === 0}
                    onClick={() => setAddPrinter(true)}
                    className={classes.openBtn}>{printers.length !==0 ? 'Add printer' : ''}</Button>
            </div>
            <div className={classes.mainArea}>
                {
                    printers.length === 0 ?
                        <div>
                            <div className='pt-40 pb-40 flex justify-content align-center'>
                                {/*<img style={{width: 612, height: 344}} src='/assets/images/printers.png' alt={'logo'}/>*/}
                                <SvgSettingsEmpty/>
                            </div>
                            <div className='flex flex-col align-center'>
                                <p className='p-0 m-0 fs-32 fw-bold'>No printers connected</p>
                                <p className='pt-15 pb-60 m-0 fs-14 color-light-blue'>View all connected printers in
                                    this
                                    page</p>
                                <Button
                                    className={classes.addBtn}
                                    color='primary'
                                    variant='contained'
                                    startIcon={<SvgAddPrinter/>}
                                    onClick={() => setAddPrinter(true)}
                                >Add printer</Button>
                            </div>
                        </div> :
                        <div className='m-20 backgroundWhite borderRadius'>
                            {
                                printers.map((item, index) => (
                                    <div key={index}
                                         className={clsx('height-60 flex flex-row justify-between align-center pl-20 pr-20 cursor-pointer', index === printers.length - 1 ? '' : 'borderBottomLight')}
                                         onClick={() => editPrint(index)}
                                    >
                                        <div className='flex flex-col'>
                                            <p className='m-0 fs-14 pb-5'>{item.name}</p>
                                            <p className='p-0 m-0 fs-12 color-light'>{item.type}</p>
                                        </div>
                                        <div className='flex flex-row'>
                                            <p className='pb-2 pr-5 m-0 fs-12 color-light'>Computer {index + 1}</p>
                                            <ArrowRightIcon style={{fontSize: 14}} color='inherit'/>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default TagPrinter;
