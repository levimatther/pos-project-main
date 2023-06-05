import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import Fab from '@material-ui/core/Fab';
import {Back, Clock, Keybtn} from "../../Icons";
import {useHistory} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: 220,
        paddingTop: 29
    },
    button: {
        backgroundColor: theme.palette.primary.lightgray,
        borderWidth: 0,
        borderRadius: '50%',
        width: 60,
        height: 60,
        fontSize: 32,
        outline: 0,
        minWidth: 60,
        boxShadow: 'none',
        fontFamily: "Lato",
        color: 'white',
        fontWeight: 'normal'
    },
    navigatoinButton: {
        backgroundColor: theme.palette.primary.main,
        borderWidth: 0,
        borderRadius: '50%',
        width: 60,
        height: 60,
        fontSize: 32,
        minWidth: 60,
        boxShadow: 'none'
    },
    disabledButton: {
        backgroundColor: theme.palette.primary.disabled
    }
}));

function KeyPadComponent(props) {
    const classes = useStyles();
    const history = useHistory();
    const {location} = history;
    const isLogin = location.pathname.split('/')[1] === 'login';
    return (
        <div className={classes.root}>
            <Grid container direction={"column"}>
                <Grid container direction={"row"} className="pb-14">
                    <Grid item xs={4} className="flex justify-content">
                        <Button className={classes.button} id="1" onClick={(e) => props.onClick(e.target.innerText)}>1</Button>
                    </Grid>
                    <Grid item xs={4} className="flex justify-content">
                        <Button className={classes.button} name="2" onClick={(e) => props.onClick(e.target.innerText)}>2</Button>
                    </Grid>
                    <Grid item xs={4} className="flex justify-content">
                        <Button className={classes.button} name="3" onClick={(e) => props.onClick(e.target.innerText)}>3</Button>
                    </Grid>
                </Grid>
                <Grid container direction={"row"} className="pb-14">
                    <Grid item xs={4} className="flex justify-content">
                        <Button className={classes.button} name="4" onClick={(e) => props.onClick(e.target.innerText)}>4</Button>
                    </Grid>
                    <Grid item xs={4} className="flex justify-content">
                        <Button className={classes.button} name="5" onClick={(e) => props.onClick(e.target.innerText)}>5</Button>
                    </Grid>
                    <Grid item xs={4} className="flex justify-content">
                        <Button className={classes.button} name="6" onClick={(e) => props.onClick(e.target.innerText)}>6</Button>
                    </Grid>
                </Grid>
                <Grid container direction={"row"} className="pb-14">
                    <Grid item xs={4} className="flex justify-content">
                        <Button className={classes.button} name="7" onClick={(e) => props.onClick(e.target.innerText)}>7</Button>
                    </Grid>
                    <Grid item xs={4} className="flex justify-content">
                        <Button className={classes.button} name="8" onClick={(e )=> props.onClick(e.target.innerText)}>8</Button>
                    </Grid>
                    <Grid item xs={4} className="flex justify-content">
                        <Button className={classes.button} name="9" onClick={(e) => props.onClick(e.target.innerText)}>9</Button>
                    </Grid>
                </Grid>

                <Grid container dir={"row"}>
                    <Grid item xs={4} className="flex justify-content">
                        <Fab className={classes.navigatoinButton} aria-label="add" onClick={() => props.onClick('.')} color='primary'>
                            {
                                isLogin ? <Clock /> : <Keybtn/>
                            }
                        </Fab>
                    </Grid>
                    <Grid item xs={4} className="flex justify-content">
                        <Button className={classes.button} name="0" onClick={(e) => props.onClick(e.target.innerText)}>0</Button>
                    </Grid>
                    <Grid item xs={4} className="flex justify-content">
                        <Fab classes={{disabled: classes.disabledButton}} className={classes.button} disabled={props.backDisable} aria-label="delete" onClick={() => props.onClick('=')}>
                            <Back fill={'white'}/>
                        </Fab>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default KeyPadComponent;
