import React from "react";
import {Route, Switch} from 'react-router-dom';
import CashRightSection from "./RightSection";
import {makeStyles} from "@material-ui/core/styles";
import CashReason from "./CashReason";
import CashComplete from "./CashComplete";
import CashDetail from "./CashDetail";

const useStyles = makeStyles(theme => (
    {
        root: {
            height: '100vh',
            overflow: 'hidden',
            width: 'calc(100vw - 269px)',
            position: 'relative',
            color: theme.palette.primary.headerColor
        },
    }
));

function CashRouting() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path='/main/cash' component={CashRightSection} />
                {/*<Route exact path='/main/cash/reason' component={CashReason}/>*/}
                <Route exact path='/main/cash/complete' component={CashComplete}/>
                <Route exact path='/main/cash/detail' component={CashDetail}/>
            </Switch>
        </div>

    )
}

export default CashRouting;
