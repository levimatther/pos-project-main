import * as React from "react";

function SvgAddNote(props) {
  return (
    <svg width={12} height={9} {...props}>
      <path
        d="M7.176 1.776V.6h-7v1.176h7zm2.324 7V6.424h2.324V5.276H9.5V2.924H8.324v2.352H6v1.148h2.324v2.352H9.5zM7.176 4.1V2.924h-7V4.1h7zM4.824 6.424V5.276H.176v1.148h4.648z"
        fill="#7CE7AC"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgAddNote;
