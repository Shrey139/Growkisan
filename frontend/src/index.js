import React from "react";
import ReactDOM from "react-dom";
import "bootswatch/dist/journal/bootstrap.min.css";
import 'reactjs-popup/dist/index.css';
import "./style.css";
import App from "./components/App";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
