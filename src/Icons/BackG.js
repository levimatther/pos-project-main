import * as React from "react";

function SvgBackG(props) {
  return (
    <svg width={16} height={11} {...props}>
      <text
        transform="translate(-117 -175)"
        fill="#7CE7AC"
        fillRule="evenodd"
        fontFamily="material"
        fontSize={21}
      >
        <tspan x={114.5} y={183}>
          {"\uE9B5"}
        </tspan>
      </text>
    </svg>
  );
}

export default SvgBackG;
