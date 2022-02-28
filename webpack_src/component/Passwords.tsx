import React from "react";
import {fetchGJ} from "../util";
import {Link} from "react-router-dom";
import {User} from "../data/User";

interface PropsPass {

}
interface StatePass {
    users: User[]
}
export default class Passwords extends React.Component<PropsPass, StatePass> {
    state: StatePass = {
        users: []
    }

    componentDidMount() {
        fetchGJ('/api/users').then( resp => this.setState({ users: resp._embedded.users }))
    }

    render() {
        const tmp = this.state.users.map( user => <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.login}</td>
            <td><Link className='btn btn-primary' to={ '/api/passwords/'+user.id }>New</Link></td>
        </tr>)

        return <table className='table table-hover'>
            <thead><tr>
                <th>ФИО</th>
                <th>login</th>
                <th>set new pass</th>
            </tr></thead>
            <tbody>{tmp}</tbody>
        </table>
    }
}