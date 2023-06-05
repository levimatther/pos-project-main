import React from "react";
import clsx from "clsx";
import SvgCircleG from "../../Icons/CircleG";
import SvgCircleR from "../../Icons/CircleR";
import SvgCircleB from "../../Icons/CircleB";
import SvgCircleW from "../../Icons/CircleW";
function ResultComponent(props) {
    const {result} = props;
    return(
        <div className="flex justify-content">
            <div className={clsx("p-10", props.isWrong ? "wrong" : "")}>
                {
                    result.length===4 && !props.isWrong? <SvgCircleG/> : result.length > 0 ? props.isWrong ? <SvgCircleR /> : <SvgCircleB /> : <SvgCircleW />
                }
            </div>
            <div className={clsx("p-10", props.isWrong ? "wrong" : "")}>
                {
                    result.length===4 && !props.isWrong? <SvgCircleG/> : result.length > 1 ? props.isWrong ? <SvgCircleR /> : <SvgCircleB /> : <SvgCircleW />
                }
            </div>
            <div className={clsx("p-10", props.isWrong ? "wrong" : "")}>
                {
                    result.length===4 && !props.isWrong? <SvgCircleG/> : result.length > 2 ? props.isWrong ? <SvgCircleR /> : <SvgCircleB /> : <SvgCircleW />
                }
            </div>
            <div className={clsx("p-10", props.isWrong ? "wrong" : "")}>
                {
                    result.length > 3 ? props.isWrong ? <SvgCircleR /> : <SvgCircleG/> : <SvgCircleW />
                }
            </div>




        </div>
    )
}
export default ResultComponent
