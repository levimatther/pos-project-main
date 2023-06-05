import * as React from "react";

function SvgCashManagementG(props) {
  return (
    <svg width={18} height={15} {...props}>
      <text
        transform="translate(-2 -6)"
        fill="#778CA2"
        fillRule="evenodd"
        fontFamily="LineAwesome"
        fontSize={22}
        fontWeight={400}
      >
        <tspan x={0} y={21.375}>
          {"\uF33B"}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgCashManagementG;
