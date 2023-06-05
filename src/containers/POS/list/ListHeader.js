import React from "react";
import { Sticky } from "react-sticky";
import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => (
  {
    list_header: {
      zIndex: 100,
      width: '100% !important',
      background: '#f7f7f7',
      height: 50
    },
    paginationBtn: {
      width: 40,
      height: 40
    },
    startIcon: {
        marginLeft: 12
    },
    tilte: {
      padding: '20px',
      fontSize: 20,
      fontWeight: 600,
      color: '#333',
      margin: '0'
    }
  }
));
function ListHeader(props) {
  const classes = useStyle();
  const { data } = props;

  return (
    <Sticky topOffset={-100}>
      {({ style, isSticky }) => (
        <header
          className={classes.list_header}
          style={{ ...style, marginTop: isSticky ? 50 : 0 }}
        >
          <h3 className={classes.tilte}>{data}</h3>
        </header>
      )}
    </Sticky>
  );
}

export default ListHeader;
