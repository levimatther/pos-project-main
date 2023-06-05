import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Route, Switch} from 'react-router-dom';
import SettingsGeneral from "./General/SettingsGeneral";
import SettingsShift from "./Shifts/SettingsShifts";
import SettingsHardware from "./Hardware/SettingsHardware";
const useStyle = makeStyles(theme => ({
    root: {
        height: '100vh',
        overflow: 'hidden',
        width: 'calc(100vw - 269px)',
        color: theme.palette.primary.headerColor
    }
}));

function SettingsRouting() {
    const classes = useStyle();
    return(
        <div className={classes.root}>
            <Switch>
                <Route exact path='/main/settings' component={SettingsGeneral} />
                <Route exact path='/main/settings/hardware' component={SettingsHardware} />
                <Route exact path='/main/settings/shifts' component={SettingsShift} />
            </Switch>
        </div>
    )
}

export default SettingsRouting;
