import React, {useEffect, useState} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Route, Switch, useHistory, withRouter, Redirect} from "react-router-dom";
import Login from "../Login";
import ProtectedRoute from "../../components/protectedRoute";
import Clock from "../Clock";
import './slieTransition.scss'
import Layout from "../../layout";

function TransitionComponent() {
    const history = useHistory();
    const {location} = history;

    const getPathDepth = (location) => {
        let pathArr = location.pathname.split("/");
        return pathArr[1];
    };
    const [prevDepth, setPrevDepth] = useState(getPathDepth(location));
    const currentKey = location.key;
    useEffect(() => {
        return () => {
            setPrevDepth(getPathDepth(location));
        }
    }, [location]);
    return (
        <div
            className={prevDepth === 'clock' ? "right" : prevDepth === 'login' ? "right" : ''}>
            <TransitionGroup>
                <CSSTransition
                    key={currentKey}
                    timeout={400}
                    classNames="slide"
                >

                    <Switch location={location}>
                        <Route path="/login" component={Login}/>
                        <Redirect exact={true} path="/" to="/login"/>
                        <Route path="/clock" component={Clock}/>
                        <ProtectedRoute path="/main" component={Layout}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}

export default withRouter(TransitionComponent)
