import * as React from "react";

function SvgPrintReciept(props) {
  return (
    <svg width={12} height={11} {...props}>
      <path
        d="M9.188 2.688V.5h-7v2.188h7zm0 8.312V8.676h2.187V4.875c0-.474-.173-.884-.52-1.23a1.682 1.682 0 00-1.23-.52H1.75c-.474 0-.884.173-1.23.52C.173 3.99 0 4.4 0 4.875v3.8h2.188V11h7zm-.876-.875h-5.25v-3.5h5.25v3.5z"
        fill="#7CE7AC"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgPrintReciept;
