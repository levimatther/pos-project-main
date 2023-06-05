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
import {useHistory} from "react-router-dom";
import SvgPaid from "../../Icons/Paid";
import SvgRefunded from "../../Icons/Refunded";

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
    purchaseArea: {
        height: 'calc(100vh - 125px)',
        overflowY: 'auto',
        backgroundColor: theme.palette.primary.background
    }
}));

function CashLeftSection(props) {
    const {data} = props;
    const classes = useStyles();
    const [searchWord, setSearchWord] = useState('');
    const dispatch = useDispatch();
    function openSidebar() {
        dispatch(Actions.openNab())
    }


    return (
        <div className={classes.root}>
            <div className='height-50 borderBottomLight flex justify-between align-center'>
                <ToggleButton value={'justify'} className={classes.toggleBtn} onClick={openSidebar}>
                    <DehazeIcon fontSize="small"/>
                </ToggleButton>
                <p className='p-0 m-0 fs-14 fw-bold'>Cash management</p>
                <IconButton className={classes.moreBtn} disabled>
                </IconButton>
            </div>
            <div className='height-60 borderBottomLight flex justify-content align-center pl-10 pr-10'>
                <FormControl className={classes.searchBar} fullWidth={true}>
                    <Input
                        classes={{underline: classes.underline}}
                        id="input-with-icon-adornment"
                        placeholder='Search payments'
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
            <div className={classes.purchaseArea}>
                {
                    data.map((item, index) => (
                        <div key={index}>
                            <div className='height-28 backcolor-border pl-10 flex align-center'>
                                <p className='p-0 m-0 fs-12 color-light'>{item.date}</p>
                            </div>
                            {
                                item.transactions.map((transaction, transactionIndex) => (
                                    <div
                                        key={transactionIndex}
                                        className={clsx(transaction.checked ? 'background-F0' : 'backgroundWhite', 'cursor-pointer height-55 borderBottomLight pl-10 pr-10 flex flex-col justify-between')}
                                        onClick={(e) => props.handleClick( index, transactionIndex)}
                                    >
                                        <div
                                            className={clsx(transaction.type === 'payout' ? 'color-pink' : 'color-primary', 'pt-10 flex flex-row justify-between')}>
                                            <div className='flex flex-row align-center'>
                                                {
                                                    transaction.type === 'payout' ?
                                                        <SvgRefunded /> :
                                                        <SvgPaid />
                                                }
                                                <p className='pl-5 m-0 fs-12'>{transaction.type === 'payout' ? 'Pay out' : 'Pay in'}</p>
                                            </div>
                                            <p className='p-0 m-0 fs-12 fw-bold'>{transaction.amount}</p>
                                        </div>
                                        <div className='pb-10 flex flex-row justify-between color-light'>
                                            <p className='p-0 m-0 fs-10'>{transaction.time}</p>
                                            {
                                                transaction.type === 'payout' ?
                                                    <p className='p-0 m-0 fs-10'>{transaction.companyName}</p> :
                                                    <p className='p-0 m-0 fs-10 f-italic max-140'>{transaction.reason}</p>
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default CashLeftSection;
