import React from "react";
import {Link} from "react-router-dom";

export default class Nav extends React.Component {
    render() {
        return <div className='btn-group'>
            <Link className='btn btn-primary' to='/goods'>Goods</Link>
            <Link className='btn btn-primary' to='/test'>Test</Link>
            <a className='btn btn-primary' href="/api">REST api browser</a>
            <Link className='btn btn-primary' to="/api/passwords">Пароли</Link>
            <a className='btn btn-primary' href="/logout">Выход</a>
        </div>
    }
}