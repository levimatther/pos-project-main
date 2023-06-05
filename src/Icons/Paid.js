import * as React from "react";

function SvgPaid(props) {
  return (
    <svg width={10} height={10} {...props}>
      <circle
        cx={65}
        cy={30}
        r={5}
        transform="translate(-60 -25)"
        fill="#7CE7AC"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgPaid;
