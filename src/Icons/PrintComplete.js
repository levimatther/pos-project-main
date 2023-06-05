import * as React from "react";

function SvgPrintComplete(props) {
  return (
    <svg width={14} height={13} {...props}>
      <path
        d="M11 3.056V.4H3v2.656h8zm0 9.344V9.744h2.656v-4c0-.352-.09-.683-.272-.992a2.029 2.029 0 00-1.728-1.008H2.344c-.352 0-.683.09-.992.272A2.029 2.029 0 00.344 5.744v4H3V12.4h8zm.656-6A.646.646 0 0111 5.744c0-.192.061-.355.184-.488s.28-.2.472-.2c.192 0 .355.07.488.208.133.139.2.299.2.48a.62.62 0 01-.2.464.678.678 0 01-.488.192zm-2 4.656H4.344V7.744h5.312v3.312z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgPrintComplete;
