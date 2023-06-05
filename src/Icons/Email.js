import * as React from "react";

function SvgEmail(props) {
  return (
    <svg width={12} height={10} {...props}>
      <path
        d="M10.588 9.776c.318 0 .589-.117.813-.35.224-.233.335-.509.335-.826v-7c0-.317-.111-.593-.335-.826a1.084 1.084 0 00-.813-.35H1.237c-.318 0-.588.117-.813.35a1.153 1.153 0 00-.336.826v7c0 .317.112.593.337.826.224.233.494.35.811.35h9.352zM5.913 5.674L1.236 2.776V1.6l4.677 2.926L10.588 1.6v1.176L5.913 5.674z"
        fill="#FFF"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgEmail;
