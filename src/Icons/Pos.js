import * as React from "react";

function SvgPos(props) {
  return (
    <svg width={18} height={17} {...props}>
      <text
        transform="translate(-22 -12)"
        fill="#7CE7AC"
        fillRule="evenodd"
        fontFamily="LineAwesome"
        fontSize={22}
        fontWeight={400}
      >
        <tspan x={20} y={28.375}>
          {"\uF1B2"}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgPos;
