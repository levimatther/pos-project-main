import React from "react";
import {InputAdornment, TextField} from "@material-ui/core";
import {_numberWithCommas} from "../../constants";

function LBPInput(props) {

    function setLbpChanges(value) {
        const re = /^[0-9\b]+$/;
        if (value === '' || re.test(value.replace(/,/g, '')))
        {
            props.onChange(value.replace(/,/g, ''));
        }
    }

    function handleFocus(e) {
        e.preventDefault();
        e.target.select()
    }

    return (
        <TextField
            {...props}
            value={_numberWithCommas(props.value)}
            onChange={(e) => setLbpChanges(e.target.value)}
            onFocus={(e) => handleFocus(e)}
            InputProps={{
                ...props.InputProps,
                startAdornment: <InputAdornment position="start" style={{color: 'gray', fontWeight: 'normal'}} disableTypography>L£</InputAdornment>,
            }}
        />
    )
}

export default LBPInput;
