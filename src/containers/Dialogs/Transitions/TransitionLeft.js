import React from "react";
import {Slide} from "@material-ui/core";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default Transition;
