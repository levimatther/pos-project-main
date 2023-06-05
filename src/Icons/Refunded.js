import * as React from "react";

function SvgRefunded(props) {
  return (
    <svg width={10} height={10} {...props}>
      <circle
        cx={65}
        cy={30}
        r={5}
        transform="translate(-60 -25)"
        fill="#FF808B"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgRefunded;
