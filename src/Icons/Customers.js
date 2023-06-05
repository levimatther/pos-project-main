import * as React from "react";

function SvgCustomers(props) {
  return (
    <svg width={18} height={17} {...props}>
      <text
        transform="translate(-2 -5)"
        fill="#7CE7AC"
        fillRule="evenodd"
        fontFamily="LineAwesome"
        fontSize={22}
        fontWeight={400}
      >
        <tspan x={0} y={21.375}>
          {"\uF1DD"}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgCustomers;
