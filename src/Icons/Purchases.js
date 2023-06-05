import * as React from "react";

function SvgPurchases(props) {
  return (
    <svg width={18} height={16} {...props}>
      <text
        transform="translate(-2 -6)"
        fill="#7CE7AC"
        fillRule="evenodd"
        fontFamily="LineAwesome"
        fontSize={22}
        fontWeight={400}
      >
        <tspan x={0} y={21.375}>
          {"\uF26D"}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgPurchases;
