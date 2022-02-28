import React from "react";
import {fetchX, formToJson, getById} from "../util";
import {User} from "../data/User";

interface PropsChPass {
    onOk: Function,
    userId: string
}
interface StateChPass {
    user?: User
}
export default class ChangePass extends React.Component<PropsChPass, StateChPass> {
    state: StateChPass = { }

    componentDidMount() {
        fetch('/api/users/' + this.props.userId).then( t => t.json()).then( resp => {
            // resp.id = this.props.userId
            this.setState({user: resp})
        })
    }

    onSetClick = () => {
        fetchX('/api/passwords/' + this.state.user.id, {
            method: 'PATCH',
            body: formToJson(getById('form1')),
        }).then(res => {
            if (res.ok === true) this.props.onOk()
            else if (res.catched !== true) res.text().then( txt => {
                alert(txt)
            })
        })
    }

    render() {
        if (this.state.user === undefined) return <label>loading</label>
        return <form id="form1">
            <label>{'ФИО: ' + this.state.user.name}</label><br/>
            <label>{'login: ' + this.state.user.login}</label><br/>
            <label>Роли: {this.state.user.role}</label><br/>
            <label>Новаый пароль
                <input type="password" name="password" defaultValue=''/>
            </label>
            <input type='button' className='btn btn-primary' onClick={this.onSetClick} value='Set'/>
        </form>
    }
}