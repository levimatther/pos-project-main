import React, {useEffect, useState} from "react";
import { Dialog, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import clsx from "clsx";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import FormControl from "@material-ui/core/FormControl";
import AddCustomerDialog from "./AddCustomerDialog";
import Transition from "../Transitions/Transition";
import {_transitionDuration} from "../../../constants";
import {CSSTransition} from "react-transition-group";
import SvgClose from "../../../Icons/Close";
import SvgPlus from "../../../Icons/Plus";

const useStyles = makeStyles(theme => ({
    dialogPaper: {
        width: 520,
        height: 580,
        position: 'absolute',
        top: 60
    },
    openBtn: {
        fontSize: 14,
        textTransform: "capitalize",
        height: 35,
    },
    noteArea: {
        height: 120
    },
    primaryBtn: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        border: `1px solid ${theme.palette.primary.main}`,
    },
    disableBtn: {
        color: `${theme.palette.primary.main} !important`,
        backgroundColor: 'white',
        border: `1px solid ${theme.palette.primary.main}`,
    },
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
    },
    searchBar: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: 20,
        height: 40,
        border: `1px solid ${theme.palette.primary.borderColor}`,
        borderRadius: 4
    },
    container: {
        position: 'relative'
    }
}));

function CustomersDialog(props) {
    const classes = useStyles();
    const [searchWord, setSearchWord] = useState('');
    const [addCustomer, showAddCustomer] = useState(false);
    const [customers, setCustomers] = useState([
        {
            id: 182319341,
            shortName: "RL",
            name: "Richard Lopez",
            phone: "03-123445",
            mail: "email@customer.com",
            no: 25462345
        },
        {
            id: 12314325,
            shortName: "VJ",
            name: "Vadim Jitenko",
            phone: "03-123445",
            mail: "email@customer.com",
            no: 6547234
        },
        {
            id: 421234673,
            shortName: "VH",
            name: "Vladimir Horbatovski",
            phone: "03-123445",
            mail: "email@customer.com",
            no: 53426234
        },
        {
            id: 987233425,
            shortName: "LP",
            name: "Lorenzo Piero",
            phone: "03-123445",
            mail: "email@customer.com",
            no: 63546223
        },
        {
            id: 982375245,
            shortName: "S",
            name: "Super",
            phone: "03-123445",
            mail: "email@customer.com",
            no: 64536363
        },
        {
            id: 182319341,
            shortName: "RL",
            name: "Richard Lopez",
            phone: "03-123445",
            mail: "email@customer.com",
            no: 25462345
        },
        {
            id: 12314325,
            shortName: "VJ",
            name: "Vadim Jitenko",
            phone: "03-123445",
            mail: "email@customer.com",
            no: 6547234
        },
        {
            id: 421234673,
            shortName: "VH",
            name: "Vladimir Horbatovski",
            phone: "03-123445",
            mail: "email@customer.com",
            no: 53426234
        },
        {
            id: 987233425,
            shortName: "LP",
            name: "Lorenzo Piero",
            phone: "03-123445",
            mail: "email@customer.com",
            no: 63546223
        },
        {
            id: 982375245,
            shortName: "S",
            name: "Super",
            phone: "03-123445",
            mail: "email@customer.com",
            no: 64536363
        },
    ]);
    useEffect(() => {
        showAddCustomer(false);
    }, [props]);
    function handleCancel() {
        showAddCustomer(false);
    }

    function handleConfirm(data) {
        setCustomers(prevState => {
           return ([...prevState, data])
        });
        showAddCustomer(false);
    }

    function selectCustomer(index) {
        let data = customers[index];
        props.handleConfirm(data);
    }

    return(
        <Dialog open={props.open} className={classes.container} classes={{paper: classes.dialogPaper}} TransitionComponent={Transition}
                transitionDuration={_transitionDuration} onClose={props.handleCancel}>
            <div>
                <div className={clsx('pl-5 pr-5 flex flex-row justify-between height-50 align-center borderBottomLight', classes.header)}>
                    <IconButton color='primary' className={classes.openBtn} onClick={props.handleCancel}>
                        <SvgClose />
                    </IconButton>
                    <p className='p-0 m-0 fs-16 fw-bold color-light-blue'>Select customer</p>
                    <IconButton color='primary' className={classes.openBtn} onClick={() => showAddCustomer(true)}>
                        <SvgPlus />
                    </IconButton>
                </div>
                <div className='pl-20 pr-20 pt-10 pb-10 borderBottomLight flex'>
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
                <div className='overflowYAuto height-450'>
                    {
                        customers.filter((item) => {
                            return item.name.toLowerCase().includes(searchWord.toLowerCase())
                        }).map((item, index) => (
                            <div className='pl-20 flex flex-row align-center borderBottomLight height-60 cursor-pointer' onClick={() => selectCustomer(index)} key={index}>
                                <div className='circleAreaCustomer backcolor-pink'>
                                    <p className='p-0 m-0 fs-14 fw-bold color-pink'>{item.shortName}</p>
                                </div>
                                <div className='nameArea'>
                                    <p className='m-0 fs-14 fw-bold color-light-black'>{item.name}</p>
                                    <p className='pt-5 m-0 fs-10 color-light'>{`${item.phone} | ${item.mail}`}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <CSSTransition
                in={addCustomer}
                timeout={_transitionDuration}
                classNames="list-transition"
                unmountOnExit
                appear
            >
                <AddCustomerDialog handleCancel={handleCancel} handleConfirm={handleConfirm}/>
            </CSSTransition>
        </Dialog>
    )
}

export default CustomersDialog;
