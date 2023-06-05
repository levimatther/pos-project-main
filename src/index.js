import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import { BrowserRouter as Router } from "react-router-dom";
import './styles/index.scss';
import './fonts/Lato/Lato-Regular.ttf';
ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById("root")
);
