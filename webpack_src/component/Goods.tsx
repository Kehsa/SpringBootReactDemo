import React from "react";
import {fetchGJ} from "../util";
import {Good} from "../data/Good";
import Observer from "../Observer";


interface PropsGoods {
    observer: Observer
}
interface StateGoods {
    goods: Good[],
    bootstrap: {
        tbl: string
    }
}
class Goods extends React.Component<PropsGoods, StateGoods> {
    state: StateGoods = { goods: [],
        bootstrap: {
            tbl: 'table table-bordered table-striped table-hover table-responsive'
        }
    }
    constructor(props: PropsGoods) {
        super(props);
        if (props.observer !== undefined) props.observer.register(this.reloadGoods)
    }

    reloadGoods = (href: string) => {
        fetchGJ(href).then(res => this.setState({ goods: res._embedded.goods }))
    }

    render() {
        const bs = this.state.bootstrap
        const tmp = this.state.goods.map( g =>
            <tr key={g.id}>
                <td>{g.id}</td>
                <td>{g.name}</td>
            </tr>
        )
        return <div className='card'>
            <div className='card-header btn-group'>
                <button type='button' className='btn btn-primary' data-bs-toggle="tooltip" data-bs-placement="bottom"
                        title='Добавить'>Add</button>
                <button type='button' className='btn btn-primary'>Edit</button>
                <button type='button' className='btn btn-primary'>Delete</button>
            </div>
            <div className='card-body p-0'>
                <table className={bs.tbl}>
                    <thead><tr>
                        <th>Код</th>
                        <th>Наименование</th>
                    </tr></thead>
                    <tbody>{tmp}</tbody>
                </table>
            </div>
        </div>
    }
}
export default Goods