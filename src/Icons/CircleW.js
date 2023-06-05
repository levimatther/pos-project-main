import * as React from "react";

function SvgCircleW(props) {
  return (
    <svg width={20} height={20} {...props}>
      <circle
        cx={572}
        cy={247}
        r={10}
        transform="translate(-562 -237)"
        fill="#FFF"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgCircleW;
