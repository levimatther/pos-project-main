import * as React from "react";

function SvgPrinter(props) {
  return (
    <svg width={12} height={11} {...props}>
      <path
        d="M9.413 2.688V.5h-7v2.188h7zm0 8.312V8.676H11.6V4.875c0-.474-.173-.884-.52-1.23a1.682 1.682 0 00-1.23-.52H1.975c-.474 0-.884.173-1.23.52-.347.346-.52.756-.52 1.23v3.8h2.188V11h7zm-.875-.875h-5.25v-3.5h5.25v3.5z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgPrinter;
