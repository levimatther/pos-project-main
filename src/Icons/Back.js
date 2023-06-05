import * as React from "react";

function SvgBack(props) {
  return (
    <svg width={20} height={14} {...props}>
      <path
        d="M6.75 13.4l1.534-1.534-3.874-3.9h15.34V5.834H4.41l3.874-3.9L6.75.4.25 6.9z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgBack;
