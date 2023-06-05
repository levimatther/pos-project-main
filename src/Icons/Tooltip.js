import * as React from "react";

function SvgTooltip(props) {
  return (
    <svg width={16} height={7} {...props}>
      <path d="M8 7L0 0h16z" fill="#414141" fillRule="evenodd" />
    </svg>
  );
}

export default SvgTooltip;
