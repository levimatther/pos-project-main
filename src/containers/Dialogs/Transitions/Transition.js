import React from "react";
import {Slide} from "@material-ui/core";
const TransitionLeft = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export default TransitionLeft;
