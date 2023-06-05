import React, {Suspense} from "react";
import {Switch, Redirect, Route, withRouter} from "react-router-dom";
import routesParam from "../routes";
import {makeStyles} from "@material-ui/core/styles";
import Sidebar from "../containers/Sidebar";
import '../containers/pageTransition/slieTransition.scss'
import CloseShiftDialog from "../containers/Settings/Shifts/CloseShiftDialog";
import {useDispatch, useSelector} from "react-redux";
import * as Actions from '../store/actions'
const SwitchRoutes = withRouter(({location}) => (
    <Suspense fallback={ <div>Loading...</div>}>
        <Switch location={location}>
            {
                routesParam.map((item, index) => {
                    if (item.redirect) {
                        return (
                            <Redirect from={item.path} to={item.pathTo} key={index}/>
                        )
                    }
                    return (
                        <Route
                            path={item.path}
                            component={item.component}
                            key={index}
                        />
                    )
                })
            }
        </Switch>
    </Suspense>
));

const useStyle = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.lightgray
    }
}));

function Layout() {
    const classes = useStyle();
    const dispatch = useDispatch();
    const shiftOpen=useSelector(state => state.app.shiftDialog);

    function handleClose() {
        dispatch(Actions.closeShiftDialog())
    }

    return (
        <div className={classes.root}>
            <CloseShiftDialog open={shiftOpen} onClose={() => handleClose()} handleConfirm={handleClose}/>
            <Sidebar routes={routesParam}/>
            <SwitchRoutes/>
        </div>
    )
}

export default Layout;
