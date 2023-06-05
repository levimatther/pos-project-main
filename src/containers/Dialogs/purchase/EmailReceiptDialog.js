import Transition from "../Transitions/Transition";
import {Button, Dialog, Snackbar, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import MuiAlert from '@material-ui/lab/Alert';
import {_transitionDuration} from "../../../constants";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
    paperDialog: {
        width: 520,
        position: 'absolute',
        top: 60
    },
    openBtn: {
        color: 'white',
        fontSize: 14,
        textTransform: "capitalize",
        width: 140,
        height: 35,
        backgroundColor: theme.palette.primary.main
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
        height: 40,
        border: `1px solid ${theme.palette.primary.borderColor}`,
        borderRadius: 4
    },
    startIcon: {
        marginRight: 0
    },
    popoverPaper: {
        boxShadow: 'none'
    },
    commentAreaRoot: {
        height: 40,
    },
    cancelBtn: {
        color: 'white',
        fontSize: 14,
        textTransform: "capitalize",
        width: 60,
        height: 35,
        marginRight: 10,
        backgroundColor: theme.palette.primary.lightgray,
    }
}));
function EmailReceiptDialog(props) {
    const classes = useStyles();
    const [mail,setMail] = useState('mail@customer.com');
    const [success, setSuccess] = useState(false);
    const handleClick = () => {
        setSuccess(true);

    };

    function handleClose() {
        setSuccess(false);
        props.handleCancel()
    }
    function validateMail(mail) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (mail.match(mailformat)) {
            return true
        } else {
            return  false
        }
    }
    return(
        <Dialog open={props.open} classes={{paper: classes.paperDialog}} TransitionComponent={Transition}
                transitionDuration={_transitionDuration} onClose={props.handleCancel}>
            <div
                className='pl-5 pr-5 flex flex-row justify-content height-50 align-center borderBottomLight'>
                <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Email receipt</p>
            </div>
            <div className='p-20'>
                <p className='pb-10 m-0 color-light-black fs-14'>Customer email</p>
                <TextField
                    fullWidth
                    value={mail}
                    variant='outlined'
                    onChange={(e) => setMail(e.target.value)}
                    InputProps={{
                        classes: {root: classes.commentAreaRoot, input: classes.commentAreaStyle},
                    }}
                    error={!validateMail(mail)}
                />
            </div>
            <div className='pt-60 pr-20 pb-20 flex flex-row justify-end'>
                <div className='flex flex-row'>
                    <Button variant="contained" className={classes.cancelBtn} classes={{contained: classes.contained}}
                            onClick={props.handleCancel}
                            >Cancel</Button>
                    <Button variant="contained" color='primary' className={classes.openBtn} classes={{contained: classes.contained}} disabled={!validateMail(mail)}
                            onClick={() => handleClick()}
                            >Send receipt</Button>
                </div>
            </div>
            <Snackbar open={success} autoHideDuration={3000} onClose={() => handleClose()}>
                <Alert onClose={handleClose} severity="success">
                    Message has been sent successfully!
                </Alert>
            </Snackbar>
        </Dialog>
    )
}

export default EmailReceiptDialog;
