import * as React from "react";

function SvgCustomer(props) {
  return (
    <svg width={15} height={12} {...props}>
      <path
        d="M9 6c.833 0 1.542-.292 2.125-.875A2.893 2.893 0 0012 3c0-.833-.292-1.542-.875-2.125A2.893 2.893 0 009 0c-.833 0-1.542.292-2.125.875A2.893 2.893 0 006 3c0 .833.292 1.542.875 2.125A2.893 2.893 0 009 6zM3 8V6h2V5H3V3H2v2H0v1h2v2h1zm12 4v-1.5c0-.896-.688-1.62-2.063-2.172C11.563 7.776 10.25 7.5 9 7.5s-2.563.281-3.938.844C3.688 8.885 3 9.604 3 10.5V12h12z"
        fill="#7CE7AC"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgCustomer;
