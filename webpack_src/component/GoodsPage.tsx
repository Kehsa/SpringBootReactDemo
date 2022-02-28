import React from "react";
import Groups from "./Groups";
import Goods from "./Goods";
import Observer from "../Observer";

class GoodsPage extends React.Component {

    obs = new Observer()

    render() {
        return (
            <div className='row'>
                <div className='col-3 pe-0'><Groups onPicked={this.obs.emit} /></div>
                <div className='col-9 ps-0'><Goods observer={this.obs} /></div>
            </div>
        );
    }
}
export default GoodsPage