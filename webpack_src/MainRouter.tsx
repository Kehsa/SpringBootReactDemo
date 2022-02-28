import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import GoodsPage from "./component/GoodsPage";
import Test from "./component/Test";
import Nav from "./component/Nav";
import Passwords from "./component/Passwords";
import ChangePassPage from "./component/ChangePassPage";
import AutoEditor from "./component/AutoEditor";

export default class MainRouter extends React.Component {
    render() {
        return <BrowserRouter>
            <Switch>
                <Route exact path='/' component={ ()=> <Nav/>}/>
                <Route exact path='/test' component={ ()=> <Test/>}/>
                <Route exact path='/editor' component={ ()=> <AutoEditor/>}/>
                <Route exact path='/goods' component={ ()=> <GoodsPage/>}/>
                <Route exact path='/api/passwords' component={ ()=> <Passwords/>}/>
                <Route exact path='/api/passwords/:id' component={ ()=> <ChangePassPage/>}/>
            </Switch>
        </BrowserRouter>
    }
}