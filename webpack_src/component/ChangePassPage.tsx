import React from "react";
import ChangePass from "./ChangePass";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {getHttpParam} from "../util";

class ChangePassPage extends React.Component<RouteComponentProps> {
    onOk = () => {
        this.props.history.goBack()
    }

    render() {
        return <ChangePass onOk={this.onOk} userId={getHttpParam(this, 'id')}/>
    }
}
export default withRouter(ChangePassPage)