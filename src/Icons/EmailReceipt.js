import * as React from "react";

function SvgEmailReceipt(props) {
  return (
    <svg width={12} height={10} {...props}>
      <path
        d="M10.676 9.776c.317 0 .588-.117.812-.35.224-.233.336-.509.336-.826v-7c0-.317-.112-.593-.336-.826a1.084 1.084 0 00-.812-.35H1.324c-.317 0-.588.117-.812.35a1.153 1.153 0 00-.336.826v7c0 .317.112.593.336.826.224.233.495.35.812.35h9.352zM6 5.674L1.324 2.776V1.6L6 4.526 10.676 1.6v1.176L6 5.674z"
        fill="#7CE7AC"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgEmailReceipt;
