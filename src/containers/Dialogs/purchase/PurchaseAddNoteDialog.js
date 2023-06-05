import React, {useEffect, useState} from "react";
import {Button, Dialog, TextField,} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import {_transitionDuration} from "../../../constants";
import Transition from "../Transitions/Transition";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        height: 230,
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
    }
}));

function PurchaseAddNoteDialog(props) {
    const classes = useStyles();
    const originalNotes = props.data;
    const [notes, setNotes] = useState('');
    useEffect(() => {
        setNotes(originalNotes);
    }, [props]);

    function checkIfChanged() {
        if (originalNotes === notes) {
            return true
        } else {
            return false
        }
    }

    return (
        <Dialog open={props.open} classes={{paper: classes.dialogPaper}} 
            transitionDuration={_transitionDuration} TransitionComponent={Transition}
            onClose={props.handleCancel}
            >
            <div
                className={clsx('pl-5 pr-5 flex flex-row justify-between height-50 align-center borderBottomLight', classes.header)}>
                <Button color='primary' className={classes.openBtn} onClick={props.handleCancel}>Cancel</Button>
                <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Notes</p>
                <Button color='primary' className={classes.openBtn} disabled={notes.length > 100 || checkIfChanged()}
                        onClick={() => props.handleConfirm(notes)}>Save</Button>
            </div>
            <div className='p-20'>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    classes={{root: classes.noteArea}}
                    error={notes.length > 100}
                />
                <div className='flex flex-row justify-end'>
                    <p className={clsx('p-0 m-0 fs-10 color-CE', notes.length > 100 ? 'errorText' : '')}>{`${notes.length} / 100`}</p>
                </div>
            </div>
        </Dialog>

    )
}

export default PurchaseAddNoteDialog;
