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
import {Sticky, StickyContainer} from "react-sticky";


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
    purchaseArea: {
        height: 'calc(100vh - 125px)',
        overflowY: 'auto',
        backgroundColor: theme.palette.primary.background
    }
}));

function PurchaseLeftSection(props) {
    const {data} = props;
    const classes = useStyles();
    const [searchWord, setSearchWord] = useState('');
    const dispatch = useDispatch();

    function openSidebar() {
        dispatch(Actions.openNab())
    }

    function handleClick(index, transactionIndex) {
        props.handleClick(index, transactionIndex)
    }

    return (
        <div className={classes.root}>
            <div className='height-50 borderBottomLight flex justify-between align-center'>
                <ToggleButton value={'justify'} className={classes.toggleBtn} onClick={openSidebar}>
                    <DehazeIcon fontSize="small"/>
                </ToggleButton>
                <p className='p-0 m-0 fs-14 fw-bold'>Purchase history</p>
                <div className={classes.toggleBtn}/>
            </div>
            <div className='height-60 borderBottomLight flex justify-content align-center pl-10 pr-10'>
                <FormControl className={classes.searchBar} fullWidth={true}>
                    <Input
                        classes={{underline: classes.underline}}
                        id="input-with-icon-adornment"
                        placeholder='Search purchases'
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
            <StickyContainer className={classes.purchaseArea}>
                    {
                        data.map((item, index) => (
                            <div key={index}>
                                <Sticky relative={true}>
                                    {({style}) => (
                                        <div style={{...style, width: 243}}
                                             className='height-28 backcolor-border pl-10 flex align-center'>
                                            <p className='p-0 m-0 fs-12 color-light'>{item.date}</p>
                                        </div>
                                    )}
                                </Sticky>
                                {
                                    item.transactions.filter((matchward) => {
                                        return matchward.id.toLowerCase().includes(searchWord.toLowerCase()) > 0
                                    })
                                        .map((transaction, transactionIndex) => (
                                            <div key={transactionIndex}
                                                 className={clsx(!transaction.checked ? 'backgroundWhite' : 'backgroundGray', 'cursor-pointer height-50 borderBottomLight pl-10 pr-10 flex flex-col justify-between')}
                                                 onClick={() => handleClick(index, transactionIndex)}>
                                                <div className='flex flex-row justify-between pt-10'>
                                                    <p className={clsx('p-0 m-0 fs-12 fw-bold', transaction.checked ? 'color-primary' : 'color-light-black')}>
                                                        {transaction.id}
                                                    </p>
                                                    <p className={clsx('p-0 m-0 fs-12 fw-bold', transaction.checked ? 'color-primary' : 'color-light-black')}>
                                                        {transaction.amount}
                                                    </p>
                                                </div>
                                                <p className='pb-10 fs-10 m-0 color-light'>{transaction.time}</p>
                                            </div>
                                        ))
                                }
                            </div>
                        ))
                    }
            </StickyContainer>
        </div>
    )
}

export default PurchaseLeftSection;
