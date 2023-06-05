import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    borderRadius: 6,
    borderRight: "1px solid #a5a5a5",
    fontSize: 20
  },
  btnOne: {
    borderTopLeftRadius: 6
  },
  btnThree: {
    borderTopRightRadius: 6
  },
  button: {
    fontSize: 30,
  },
  btnDone:{
    fontSize: 30,
    background: "#7ce7ac",
    width: "100%",
    borderRadius: 0,
    border: "1px solid #a5a5a5",
    borderRight: 'none',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius:6
  },
  btnDoneGrid: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius:6
  },
  item: {
    fontFamily: "MS Gothic !important",
    borderTop: '1px solid #a5a5a5',
    borderLeft: '1px solid #a5a5a5',
  },
  row:{
    // borderTop: '1px solid #333333',
    // borderLeft: '1px solid #333333',
    // '&:nth-child(-n+2)' :{
    //   borderTop: 'none'
    // },
    // '&:nth-child(odd)' :{
    //   borderLeft: 'none'
    // }
  }
}));

export default function PopoverBtn(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
    {/* <div className={classes.arrow}></div> */}

      <Grid container direction={"column"}>
        <Grid container direction={"row"} className={classes.row}>
          <Grid item xs={4} className={classes.item + " " + classes.btnOne + " flex justify-content"}>
            <Button className={classes.button} id="1" onClick={(e) => props.onClick(e.target.innerText)}>1</Button>
          </Grid>
          <Grid item xs={4} className={classes.item+" flex justify-content"}>
            <Button className={classes.button} name="2" onClick={(e) => props.onClick(e.target.innerText)}>2</Button>
          </Grid>
          <Grid item xs={4} className={classes.item + " " + classes.btnThree + " flex justify-content"}>
            <Button className={classes.button} name="3" onClick={(e) => props.onClick(e.target.innerText)}>3</Button>
          </Grid>
        </Grid>
        <Grid container direction={"row"} className={classes.row}>
          <Grid item xs={4} className={classes.item+" flex justify-content"}>
            <Button className={classes.button} name="4" onClick={(e) => props.onClick(e.target.innerText)}>4</Button>
          </Grid>
          <Grid item xs={4} className={classes.item+" flex justify-content"}>
            <Button className={classes.button} name="5" onClick={(e) => props.onClick(e.target.innerText)}>5</Button>
          </Grid>
          <Grid item xs={4} className={classes.item+" flex justify-content"}>
            <Button className={classes.button} name="6" onClick={(e) => props.onClick(e.target.innerText)}>6</Button>
          </Grid>
        </Grid>
        <Grid container direction={"row"} className={classes.row}>
          <Grid item xs={4} className={classes.item+" flex justify-content"}>
            <Button className={classes.button} name="7" onClick={(e) => props.onClick(e.target.innerText)}>7</Button>
          </Grid>
          <Grid item xs={4} className={classes.item+" flex justify-content"}>
            <Button className={classes.button} name="8" onClick={(e) => props.onClick(e.target.innerText)}>8</Button>
          </Grid>
          <Grid item xs={4} className={classes.item+" flex justify-content"}>
            <Button className={classes.button} name="9" onClick={(e) => props.onClick(e.target.innerText)}>9</Button>
          </Grid>
        </Grid>

        <Grid container dir={"row"} className={classes.row}>
          <Grid item xs={4} className={classes.item+" flex justify-content"}>
            <Button className={classes.button} name="." onClick={(e) => props.onClick(e.target.innerText)}>.</Button>
          </Grid>
          <Grid item xs={4} className={classes.item+" flex justify-content"}>
            <Button className={classes.button} name="0" onClick={(e) => props.onClick(e.target.innerText)}>0</Button>
          </Grid>
          <Grid item xs={4} className={classes.item+" flex justify-content"}>
            <Button onClick={props.handleBack}>
              <KeyboardBackspaceIcon color="primary" />
            </Button>
          </Grid>
        </Grid>
        <Grid container dir={"row"} className={classes.btnDoneGrid}>
          <Button color="primary" variant="contained" className={classes.btnDone} name="0" onClick={props.handleConfirm}>DONE</Button>
        </Grid>
      </Grid>
    

    </div>
  );
}
