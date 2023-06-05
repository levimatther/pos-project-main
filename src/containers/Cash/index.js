import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CashLeftSection from "./LeftSection";
import CashRouting from "./CashRouting";
import {useDispatch, useSelector} from "react-redux";
import * as Actions from '../../store/actions'
import {useHistory} from "react-router-dom";
import CashRightSection from "./RightSection";
const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.headerColor,
        backgroundColor: theme.palette.primary.background,
        display: 'flex',
        flexDirection: 'row'
    }
}));

function Cash() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const cashHistory = useSelector(state => state.cashHistory.data);
    const [detail, setDetail] = useState(false);
    function handleClick(index, transactionIndex) {
        const item = cashHistory[index].transactions[transactionIndex];
        dispatch(Actions.setCash(item));
        dispatch(Actions.updateCashHistory(index, transactionIndex));
        setDetail(true);
    }
    return(
        <div className={classes.root}>
            <CashLeftSection data={cashHistory} handleClick={handleClick}/>
            <CashRightSection showDetail={detail} handleCancel={() => setDetail(false)}/>
        </div>
    )
}

export default Cash;
