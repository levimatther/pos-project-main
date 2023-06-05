import * as React from "react";

function SvgOutOfStock(props) {
  return (
    <svg width={12} height={11} {...props}>
      <path
        d="M11.508 10.3L6 .808.492 10.3h11.016zM6.492 6.808h-.984V4.792h.984v2.016zm0 1.992h-.984V7.792h.984V8.8z"
        fill="#FF808B"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgOutOfStock;
