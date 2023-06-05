import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import SimpleDialog from "../Dialogs/SimpleDialog";
import PosPage from "./PosPage";
import TakeAwayPage from "./TakeAwayPage";
import {useDispatch, useSelector} from "react-redux";
import * as Actions from '../../store/actions'

const useStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: theme.palette.primary.background
    },
    pos: {
       width: `calc(100vw - 268px)`

    },
    takeAway: {
        width: theme.width.takeAway,
        backgroundColor: theme.palette.primary.backWhite,
        height: '100VH',
        borderLeft: `1px solid ${theme.palette.primary.borderColor}`,
        position: 'fixed',
        right: 0,
        zIndex: 151,
        overflowX: 'hidden'
    }

}));


function POS() {
    const dispatch = useDispatch();
    const open = useSelector(state => state.app.shiftOpen);
    const [initialAmount, setInitialAmount] = useState('');
    const [checkOutProducts, setCheckOutProducts] = useState([]);
    const handleClose = () => {
        dispatch(Actions.closeShift())
    };
    function handleProduct(e) {
        let prod;
        if (!e.amount) {
            prod = {...e, amount: 1};
        } else {
            prod=e
        }
        let id = prod.id;
        var commentIndex = checkOutProducts.findIndex((c) => {
            return c.id === id;
        });
        if (commentIndex < 0) {
            setCheckOutProducts(prevState => {
                let flag = [...prevState, prod];
                return flag;
            })
        } else {
            setCheckOutProducts(prevState => {
                let medium = prevState[commentIndex];
                medium.amount =Math.floor((medium.amount +  prod.amount) * 1000) / 1000 ;
                let flag = [...prevState.slice(0, commentIndex), medium, ...prevState.slice(commentIndex+1)];
                return flag
            })
        }

    }
    const classes = useStyle();

    function handleAmount(e, value) {
        setInitialAmount(value);
    }

    function deleteProducts() {
        setCheckOutProducts([]);
    }

    function updateProducts(data, index) {
        setCheckOutProducts(prevState => {
            return [...prevState.slice(0, index), data, ...prevState.slice(index+1)]
        })
    }
    function updateAllProducts(data) {
        setCheckOutProducts(() => {
            return [...data]
        })
    }

    function deleteProduct(index) {
        setCheckOutProducts(prevState => {
            return [...prevState.slice(0, index), ...prevState.slice(index + 1)]
        })
    }

    function changeAmount(amount, index) {
        let item = checkOutProducts[index];
        item.amount = amount;
        setCheckOutProducts(prevState => {
            return [...prevState.slice(0, index),item, ...prevState.slice(index + 1)]
        })
    }

    return(
        <div className={classes.root}>
            <PosPage
                productClick={handleProduct}
                classes={classes.pos}
            />
            <TakeAwayPage
                checkout={checkOutProducts}
                classes={classes.takeAway}
                deleteProducts={deleteProducts}
                updateProducts={updateProducts}
                deleteProduct={deleteProduct}
                changeAmount={changeAmount}
                updateAllProducts={updateAllProducts}
            />
            <SimpleDialog
                open={open}
                amount={initialAmount}
                handleChange={handleAmount}
                onClose={handleClose}
            />
        </div>
    )
}

export default POS;
