import * as React from "react";

function SvgConnectTag(props) {
  return (
    <svg width={20} height={23} {...props}>
      <path
        d="M20 22.187V0l-1.653 1.653L16.667 0l-1.654 1.653L13.333 0 11.68 1.653 10 0 8.347 1.653 6.667 0 5.013 1.653 3.333 0 1.68 1.653 0 0v22.187l1.68-1.654 1.653 1.654 1.68-1.654 1.654 1.654 1.68-1.654L10 22.187l1.68-1.654 1.653 1.654 1.68-1.654 1.654 1.654 1.68-1.654L20 22.187zM16.667 7.76H3.333V5.52h13.334v2.24zm0 4.427H3.333V10h13.334v2.187zm0 4.48H3.333v-2.24h13.334v2.24z"
        fill="#7CE7AC"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgConnectTag;
