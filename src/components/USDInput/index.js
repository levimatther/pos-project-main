import React, { useState, useEffect } from "react";
import { InputAdornment, TextField } from "@material-ui/core";
import { _numberWithCommas } from "../../constants";

function USDInput(props) {
    const [inputValue, setInputValue] = useState(props.value);
    function handleChanges(value) {
        const re = /^(?:\d*\.\d{0,2}|\d+)$/;
        if (value === '' || re.test(value.replace(/,/g, ''))) {
            let val = parseFloat(value.replace(/,/g, '')).toFixed(2);
            // let val = parseFloat(value.replace(/,/g, ''));
            // setInputValue(parseFloat(value.replace(/,/g, '')).toString());
            props.onChange(val);
        }
    }

    function handleFocus(e) {
        e.preventDefault();
        e.target.select()
    }

    function handleKeyDown(e) {
        if (e.key) {
            const key = e.key;
            if (e.key === 'Backspace') {
                setInputValue(prevState => {
                    let str = prevState;
                    return str.slice(0, -1)
                })
            }
            else if ((e.key >= 0 && e.key <= 9) || e.key == '.') {
                if (!inputValue.includes(".")) {
                    setInputValue(prevState => {
                        let str = prevState;
                        str += key;
                        return str;
                    })
                }
                else {
                    if (e.key != '.' && !inputValue.slice(0, inputValue.length - 2).endsWith(".")) {
                        setInputValue(prevState => {
                            let str = prevState;
                            str += key;
                            return str;
                        })
                    }
                }
            }
        }
    }
    return (
        <TextField
            {...props}
            value={_numberWithCommas(isNaN(parseFloat(inputValue)) ? '' : parseFloat(inputValue).toFixed(2))}
            onChange={(e) => handleChanges(e.target.value)}
            onFocus={(e) => handleFocus(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            InputProps={{
                ...props.InputProps,
                startAdornment: <InputAdornment style={{ color: 'gray', fontWeight: 'normal' }} position="start" disableTypography>$</InputAdornment>,
            }}
        />
    )
}

export default USDInput;
