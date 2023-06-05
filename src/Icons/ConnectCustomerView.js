import * as React from "react";

function SvgConnectCustomerView(props) {
  return (
    <svg width={20} height={15} {...props}>
      <path
        d="M18.17 14.553c.494 0 .915-.181 1.264-.544.348-.363.522-.792.522-1.286L20 1.83c0-.494-.182-.922-.545-1.285A1.758 1.758 0 0018.17 0H1.83C1.336 0 .908.182.545.545A1.758 1.758 0 000 1.83v10.893c0 .494.182.923.545 1.286.363.363.791.544 1.285.544h16.34zm-1.83-1.83H3.66V1.83h12.68v10.893z"
        fill="#7CE7AC"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgConnectCustomerView;
