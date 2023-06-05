import * as React from "react";

function SvgCalendar(props) {
  return (
    <svg width={13} height={14} {...props}>
      <path
        d="M12 14c.547 0 1-.453 1-1V3c0-.547-.453-1-1-1h-1v-.75C11 .562 10.438 0 9.75 0h-.5C8.563 0 8 .562 8 1.25V2H5v-.75C5 .562 4.438 0 3.75 0h-.5C2.563 0 2 .562 2 1.25V2H1c-.547 0-1 .453-1 1v10c0 .547.453 1 1 1h11zM3.75 3.75h-.5c-.14 0-.25-.11-.25-.25V1.25c0-.14.11-.25.25-.25h.5c.14 0 .25.11.25.25V3.5c0 .14-.11.25-.25.25zm6 0h-.5c-.14 0-.25-.11-.25-.25V1.25c0-.14.11-.25.25-.25h.5c.14 0 .25.11.25.25V3.5c0 .14-.11.25-.25.25zM12 13H1V5h11v8z"
        fill="#98A9BC"
        fillRule="nonzero"
      />
    </svg>
  );
}

export default SvgCalendar;
