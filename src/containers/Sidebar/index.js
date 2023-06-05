import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from "react-redux";
import * as Actions from '../../store/actions'
import { Fab} from "@material-ui/core";
import { NavLink, useHistory} from "react-router-dom";
import SvgLock from "../../Icons/Lock";

const useStyles = makeStyles((theme) => (
    {
        list: {
            width: 230,
            position: 'relative',
            height: '100vh'
        },
        fullList: {
            width: 'auto',
        },
        navLinkItemArea: {
            display: 'flex',
            flexDirection: 'row',
            textDecoration: 'none',
            height: '100%',
            width: '100%'
        },
        footer: {
            position: 'absolute',
            bottom: 90,
            paddingLeft: 10,
            paddingRight: 10,
            width: 210
        },
        version: {
            position: 'absolute',
            bottom: 20,
            left: 92
        },
        disabledBtn: {
            backgroundColor: theme.palette.primary.disabled
        },
        primaryBtn: {
            backgroundColor: theme.palette.primary.main
        },
        alignIcon: {
            alignItems: 'center',
            width: 25,
            minWidth: 25
        }

    }
));


function Sidebar(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = history.location;
    const isOpen = useSelector(state => state.app.navOpen);
    const isEnglish = useSelector(state => state.app.language) === 'en';
    const classes = useStyles();

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        //will use dispatch here
        dispatch(Actions.closeNav())
    };

    function setLanguage(data) {
        dispatch(Actions.language(data))
    }

    function logout() {
        dispatch(Actions.logout());
        history.push('/');
        localStorage.removeItem('token')
    }

    function openShift() {
        dispatch(Actions.openShiftDialog())
    }

    const list = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
        >
            <div className='p-10 flex-row flex'>
                <div className='userArea'>
                    {/*<div className='text-area height-18'>*/}
                        <p className='fs-16 fw-bold color-black pt-10 m-0'>Anthony Tambourtinous</p>
                    {/*</div>*/}
                    {/*<div className='text-area height-12'>*/}
                        <p className='fs-14  color-light pt-5 m-0'>POS 1</p>
                    {/*</div>*/}
                    {/*<div className='text-area height-12'>*/}
                        <p className='fs-14  color-light pt-5 m-0'>West Side Location</p>
                    {/*</div>*/}
                </div>
                <div className='lockArea pt-10'>
                    <Fab aria-label="like" color='primary' style={{width: 35, height: 35}} onClick={logout}>
                        <SvgLock style={{fontSize: 12}}/>
                    </Fab>
                </div>
            </div>
            <div className='pl-10 pt-30 pr-10 pb-40 flex flex-row'>
                <div style={{width: '50%'}}>
                    <Button fullWidth className={clsx('non-border', isEnglish ? classes.primaryBtn : classes.disabledBtn)} variant='contained' color='primary'
                            onClick={() => setLanguage('en')}>English</Button>
                </div>
                <div style={{width: '50%'}}>
                    <Button fullWidth className={clsx('non-border', !isEnglish ? classes.primaryBtn : classes.disabledBtn)} variant='contained' color='primary'
                            onClick={() => setLanguage('ar')}>عربى</Button>
                </div>
            </div>
            <List>
                {
                    props.routes.map((item, index) => {
                        if (item.redirect) {
                            return null
                        }
                        return (
                            <ListItem button key={item.name} selected={item.path === location.pathname}>
                                <NavLink to={item.path} className={classes.navLinkItemArea}>
                                    <ListItemIcon className={classes.alignIcon}>
                                        {item.path === location.pathname ? item.icon : item.icon1}
                                    </ListItemIcon>
                                    <ListItemText
                                        className={clsx(item.path === location.pathname ? 'color-primary' : 'color-light', 'fs-16')}
                                        primary={item.name}/>
                                </NavLink>
                            </ListItem>
                        )
                    })
                }
            </List>
            <div className={classes.footer}>
                <Button
                    fullWidth
                    className='non-border'
                    variant='contained'
                    color='primary'
                    onClick={openShift}
                >Close shift</Button>
            </div>
            <div className={classes.version}>
                <p className='fs-10 p-0 m-0'>V 1.01.1</p>
            </div>
        </div>
    );
    return (
        <div>
            <SwipeableDrawer
                anchor={"left"}
                open={isOpen}
                onOpen={() => {}}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </SwipeableDrawer>
        </div>
    )
}

export default Sidebar;
