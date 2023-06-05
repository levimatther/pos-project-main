import * as React from "react";

function SvgPartialRefund(props) {
  return (
    <svg width={10} height={10} {...props}>
      <g fillRule="nonzero" fill="none">
        <circle fill="#FF808B" cx={5} cy={5} r={5} />
        <path d="M9 5a4 4 0 10-8 0h8z" fill="#F5F5FA" />
      </g>
    </svg>
  );
}

export default SvgPartialRefund;
