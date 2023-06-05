import * as React from "react";

function SvgSettingsG(props) {
  return (
    <svg width={17} height={19} {...props}>
      <text
        transform="translate(-2 -4)"
        fill="#778CA2"
        fillRule="evenodd"
        fontFamily="LineAwesome"
        fontSize={22}
        fontWeight={400}
      >
        <tspan x={0} y={21.375}>
          {"\uF2C8"}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgSettingsG;
