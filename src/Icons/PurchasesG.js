import * as React from "react";

function SvgPurchasesG(props) {
  return (
    <svg width={18} height={16} {...props}>
      <text
        transform="translate(-2 -6)"
        fill="#778CA2"
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

export default SvgPurchasesG;
