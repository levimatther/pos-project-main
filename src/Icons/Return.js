import * as React from "react";

function SvgReturn(props) {
  return (
    <svg width={12} height={10} {...props}>
      <path
        d="M11.75 10c.167 0 .25-.083.25-.25v-7.5c0-.167-.083-.25-.25-.25H4V0L0 3l4 3V4h6v4H2.25c-.167 0-.25.083-.25.25v1.5c0 .167.083.25.25.25h9.5z"
        fill="#7CE7AC"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgReturn;
