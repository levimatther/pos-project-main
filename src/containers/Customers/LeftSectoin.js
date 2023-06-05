import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import ToggleButton from "@material-ui/lab/ToggleButton";
import DehazeIcon from "@material-ui/icons/Dehaze";
import * as Actions from "../../store/actions";
import {useDispatch} from "react-redux";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import clsx from "clsx";
import {IconButton} from "@material-ui/core";
import SvgPlus from "../../Icons/Plus";
import AddCustomerDialog from "../Dialogs/Customer/AddCustomerDialog";
import {CSSTransition} from "react-transition-group";
import AddCustomerModalDialog from "../Dialogs/Customer/AddCustomerModalDialog";

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.headerColor,
        backgroundColor: 'white',
        width: 268,
        height: '100vh',
        overflow: 'hidden',
        borderRight: `1px solid ${theme.palette.primary.borderColor}`
    },
    toggleBtn: {
        height: 50,
        width: 60,
        minWidth: 60,
        backgroundColor: "white",
        color: 'black',
        border: 0,
        borderRadius: 0
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
        border: `1px solid ${theme.palette.primary.borderColor}`,
        height: 40,
        borderRadius: 4
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
    },
    customerArea: {
        height: 'calc(100vh - 155px)',
        overflowY: 'auto',
        backgroundColor: theme.palette.primary.background
    },
    moreBtn: {
        width: 50,
        height: 50
    },
}));

function CustomerLeftSection(props) {
    const {data} = props;
    const classes = useStyles();
    const [searchWord, setSearchWord] = useState('');
    const [addCustomer, setAddCustomer] = useState(false);
    const dispatch = useDispatch();

    function openSidebar() {
        dispatch(Actions.openNab())
    }


    return (
        <div className={classes.root}>
            <AddCustomerModalDialog open={addCustomer} handleCancel={() => setAddCustomer(false)} handleConfirm={() => setAddCustomer(false)}/>
            <div className='height-50 borderBottomLight flex justify-between align-center'>
                <ToggleButton value={'justify'} className={classes.toggleBtn} onClick={openSidebar}>
                    <DehazeIcon fontSize="small"/>
                </ToggleButton>
                <p className='p-0 m-0 fs-14 fw-bold'>Customers</p>
                <IconButton className={classes.moreBtn} onClick={() => setAddCustomer(true)}>
                    <SvgPlus/>
                </IconButton>
            </div>
            <div className='height-60 borderBottomLight flex justify-content align-center pl-10 pr-10'>
                <FormControl className={classes.searchBar} fullWidth={true}>
                    <Input
                        classes={{underline: classes.underline}}
                        id="input-with-icon-adornment"
                        placeholder='Search customers'
                        value={searchWord}
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon color={'primary'}/>
                            </InputAdornment>
                        }
                        onChange={(e) => setSearchWord(e.target.value)}
                    />
                </FormControl>
            </div>
            <div className='height-28 borderBottomLight flex align-center pl-10'>
                <p className='p-0 m-0 fs-12 color-light'>Recent customers</p>
            </div>
            <div className={classes.customerArea}>
                {
                    data.filter((item, index) => {
                        return item.name.toLowerCase().includes(searchWord.toLowerCase())
                    })
                        .map((item, index) => (
                            <div key={index}
                                 className={clsx('height-50 pl-10 pr-10 flex flex-row align-center borderBottomLight cursor-pointer', item.checked ? 'background-F0' : 'backgroundWhite')}
                                 onClick={() => props.handleClick(index)}
                            >
                                <div className='circleArea backcolor-pink'>
                                    <p className='p-0 m-0 fs-12 fw-bold color-pink'>{item.shortName}</p>
                                </div>
                                <div className='flex flex-col fullWidth'>
                                    <div className='flex flex-row justify-between pb-10'>
                                        <p className={clsx(item.checked ? 'color-primary' : 'color-light-black', 'p-0 m-0 fs-12 fw-bold')}>{item.name}</p>
                                        <p className={clsx(item.checked ? 'color-primary' : 'color-light-black', 'p-0 m-0 fs-12 fw-bold')}>{item.amount}</p>
                                    </div>
                                    <p className='p-0 m-0 fs-10 color-light'>{item.phone}</p>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default CustomerLeftSection;
