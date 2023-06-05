import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root:{
        
    },
    popbtngroup:{
        
    },
    popbtn: {
        lineHeight:1,
        fontSize: 30,
    },
    label: {
        fontFamily: "MS Gothic !important" ,
    }
}));

export default function PopoverBtn(props) {
  const classes = useStyles();

  const plClick = () => {
    props.plAmount();
  };
  const miClick = () => {
    props.miAmount();
  };

  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.popbtngroup} size="large" disableElevation variant="contained">
        <Button className={classes.popbtn} onClick={miClick}><label className={classes.label}>-</label></Button>
        <Button color="primary" onClick={plClick} className={classes.popbtn}><label className={classes.label}>+</label></Button>
      </ButtonGroup>
    </div>
  );
}