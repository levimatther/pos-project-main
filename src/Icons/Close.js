import * as React from "react";

function SvgClose(props) {
  return (
    <svg width={14} height={15} {...props}>
      <path
        d="M12.568 14.584l1.416-1.416L8.416 7.6l5.568-5.568L12.568.616 7 6.184 1.432.616.016 2.032 5.584 7.6.016 13.168l1.416 1.416L7 9.016z"
        fill="#7CE7AC"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgClose;
