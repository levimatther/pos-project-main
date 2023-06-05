import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import SettingsLeftSection from "./LeftSection";
import SettingsRouting from "./routing";

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.headerColor,
        backgroundColor: theme.palette.primary.background,
        display: 'flex',
        flexDirection: 'row'
    }
}));
function Settings() {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <SettingsLeftSection/>
            <SettingsRouting/>
        </div>
    )
}

export default Settings;
