import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CustomerLeftSection from "./LeftSectoin";
import CustomerRightSection from "./RightSection";

const useStyles = makeStyles(theme => ({
    root: {
        color: theme.palette.primary.headerColor,
        backgroundColor: theme.palette.primary.background,
        display: 'flex',
        flexDirection: 'row'
    }
}));

function Customers() {
    const classes = useStyles();
    const [customers, setCustomers] = useState([
        {
            shortName: "RF",
            name: "Rechard Franko",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: true
        },
        {
            shortName: "V",
            name: "Vladimir",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "VJ",
            name: "Vladimir Horbatovski",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "S",
            name: "Super",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "RF",
            name: "Rechard Franko",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "V",
            name: "Vladimir",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "VJ",
            name: "Vladimir Horbatovski",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "S",
            name: "Super",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "RF",
            name: "Rechard Franko",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "V",
            name: "Vladimir",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "VJ",
            name: "Vladimir Horbatovski",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "S",
            name: "Super",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "RF",
            name: "Rechard Franko",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "V",
            name: "Vladimir",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "VJ",
            name: "Vladimir Horbatovski",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "S",
            name: "Super",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "RF",
            name: "Rechard Franko",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "V",
            name: "Vladimir",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "VJ",
            name: "Vladimir Horbatovski",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        },
        {
            shortName: "S",
            name: "Super",
            phone: "03 823121",
            amount: "L£ 52,500",
            checked: false
        }
    ]);

    function handleClick(index) {
        setCustomers(prevState => {
            let newCustomers = prevState.map((item, cusIndex) => {
                return ({...item, checked : index === cusIndex})
            });
            return ([...newCustomers])
        })
    }

    function getCustomer() {
        return customers.filter((item) => {
            return item.checked;
        })[0]
    }

    return (
        <div className={classes.root}>
            <CustomerLeftSection data={customers} handleClick={handleClick}/>
            <CustomerRightSection data={getCustomer()}/>
        </div>
    )
}

export default Customers;

