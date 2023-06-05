import React, {useEffect, useState} from "react";
import { Button, TextField, Radio, FormControlLabel, RadioGroup} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        height: 270,
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

function ReturnProductReason(props) {
    const classes = useStyles();
    const [notes, setNotes] = useState({
        category: "Mistake",
        reason: ""
    });
    const originalNotes = props.data;
    useEffect(() => {
        setNotes({...originalNotes})
    }, [props]);
    function handleChangeCategory(e) {
        setNotes(prevState => {
            return({...prevState, category: e.target.value})
            }
        )
    }

    return (
            <div className='down-body'>
                <div
                    className={clsx('pl-5 pr-5 flex flex-row justify-between height-50 align-center borderBottomLight', classes.header)}>
                    <Button color='primary' className={classes.openBtn} onClick={props.handleCancel}>Cancel</Button>
                    <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Notes</p>
                    <Button color='primary' className={classes.openBtn} disabled={notes.reason.length > 140}
                            onClick={() => props.handleConfirm(notes)}>Save</Button>
                </div>
                <div className='pl-20 pr-20 flex flex-row justify-between pt-10'>
                    <RadioGroup row aria-label="position" name="position" value={notes.category} onChange={(e) => handleChangeCategory(e)}>
                        <FormControlLabel value="Mistake" control={<Radio color="primary"/>} label="Mistake"/>
                        <FormControlLabel value="Damaged" control={<Radio color="primary"/>} label="Damaged"/>
                        <FormControlLabel value="Expired" control={<Radio color="primary"/>} label="Expired"/>
                        <FormControlLabel value="Other" control={<Radio color="primary"/>} label="Other"/>
                    </RadioGroup>
                </div>
                <div className='pl-20 pr-20 pt-10'>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        value={notes.reason}
                        placeholder={'Refund details'}
                        onChange={(e) => {
                            e.persist();
                            setNotes(prevState => {
                                return({...prevState, reason: e.target.value})
                            })
                        }}
                        classes={{root: classes.noteArea}}
                        error={notes.reason.length > 140 ? true : false}
                    />
                    <div className='flex flex-row justify-end'>
                        <p className={clsx('p-0 m-0 fs-10 color-CE', notes.reason.length > 140 ? 'errorText' : '')}>{`${notes.reason.length} / 140`}</p>
                    </div>
                </div>
            </div>
    )
}

export default ReturnProductReason;
