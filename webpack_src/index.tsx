import * as ReactDOM from "react-dom";
import React from "react";
import MainRouter from "./MainRouter";
import ModalLogin from "./component/ModalLogin";

ReactDOM.render(<ModalLogin/>, document.getElementById('modallogindiv'));
ReactDOM.render(<MainRouter/>, document.getElementById('react'));