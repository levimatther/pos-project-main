import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import PurchaseLeftSection from "./LeftSection";
import PurchaseRightSection from "./RightSection";

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.headerColor,
        backgroundColor: theme.palette.primary.background,
        display: 'flex',
        flexDirection: 'row'
    }
}));

function Purchase() {
    const classes = useStyles();
    const [transactionHistory, setTransactionHistory] = useState(
        [
        {
            date: "Friday, June 26",
            transactions: [
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: true
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                }
            ]
        },
        {
            date: "Friday, June 25",
            transactions: [
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                }
            ]
        },
        {
            date: "Friday, June 24",
            transactions: [
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                }
            ]
        },
        {
            date: "Friday, June 23",
            transactions: [
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                }
            ]
        },
        {
            date: "Friday, June 22",
            transactions: [
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                }
            ]
        },
        {
            date: "Friday, June 21",
            transactions: [
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                },
                {
                    id: "#SW-1-20973",
                    time: "12:45 PM",
                    amount: "L£ 52,500",
                    checked: false
                }
            ]
        }
    ]);

    function handleClick(index, transactionIndex) {
        setTransactionHistory(prevState => {
            let newTransaction = prevState.map((item, iex) => {
                let newSubtransactions = item.transactions.map((i, t) => {
                    return ({...i, checked: (iex === index && t === transactionIndex)})
                });
                return ({...item, transactions: newSubtransactions})
            });
            return ([...newTransaction])
        })
    }

    return (
        <div className={classes.root}>
            <PurchaseLeftSection data={transactionHistory} handleClick={handleClick}/>
            <PurchaseRightSection />
        </div>
    )
}

export default Purchase;
