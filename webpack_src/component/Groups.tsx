import React from "react";
import {fetchGJ, getById, toggleDisplay} from "../util";
import {Group} from "../data/Group";
import {SubGroup} from "../data/SubGroup";

interface PropsGroups {
    onPicked: Function
}
interface ExtendedGroup extends Group { ls: SubGroup[] }
interface StateGroups {
    groups: ExtendedGroup[],
    bootstrap: {
        ls: string,
        li: string
    }
}
class Groups extends React.Component<PropsGroups, StateGroups> {
    lastClicked?: string = undefined
    clicked = false
    subLs: SubGroup[] = []
    state: StateGroups = {
        groups: [
            { name: 'loading', id: 1, ls: [] }
        ],
        bootstrap: {
            ls: 'list-group',
            li: 'list-group-item'
        }
    }

    componentDidMount() {
        fetchGJ('/api/groups').then(resp => {
            this.setState({ groups: resp._embedded.groups })
            /*const grs = resp._embedded.groups;
            const fetches = []
            for (const gr of grs) {
                const  link = gr._links.subGroups.href
                const f = new Promise(run =>
                    fetch(link).then(t => t.json()).then( res => {
                        gr.ls = res._embedded.subGroups
                        run()
                }))
                fetches.push(f)
            }
            Promise.all(fetches).then( _ =>
                this.setState({ groups: grs })
            )*/
        })
    }

    onGroupClick(id: string) {
        if (!this.clicked) {
            toggleDisplay(getById(id))
            this.pickGr(id)
        }
        this.clicked = false
    }

    onSubGroupClick(id: string) {
        this.clicked = true
        this.pickGr(id)
    }

    pickGr(id: string) {
        const lc = this.lastClicked;
        if (lc === id) return;
        if (lc !== undefined) {
            if (lc[0] === 's') getById(lc).classList.remove('active')
            else getById(lc).parentElement.classList.remove('active')
        }
        const element = getById(id)
        if (id[0] === 's') {
            element.classList.add('active')
            this.onSubGrPicked(element.dataset.goods)
        } else {
            const id: number = Number(element.parentElement.dataset.id)
            let group = this.state.groups.find(g => g.id === id);
            if (group.ls === undefined) fetchGJ(group._links.subGroups.href).then( r => {
                group.ls = r._embedded.subGroups;
                this.forceUpdate()
                for (let subGroup of r._embedded.subGroups) this.subLs.push(subGroup)
            })
            element.parentElement.classList.add('active')
        }
        this.lastClicked = id
    }

    onSubGrPicked(href: string) {
        if (this.props.onPicked !== undefined) this.props.onPicked(href)
    }

    render() {
        const bs = this.state.bootstrap
        const tmp = this.state.groups.map( (g)=> {
            const tmp = (g.ls === undefined) ? '' : g.ls.map( sg => {
                const hId = 'sg' + sg.id
                return <li id={hId} onClick={() => this.onSubGroupClick(hId)} data-goods={ sg._links.goods.href }
                           className={bs.li + " sgc"} key={sg.id}>{sg.name}</li>;
            })
            const mrg = '-1rem'
            const sgLsStyle = { marginLeft: mrg, marginRight: mrg, display: 'none'}
            const hId = 'g'+g.id;
            return <li className={bs.li} onClick={ ()=> this.onGroupClick(hId)} key={g.id} data-id={ g.id }>
                {g.name}<div style={sgLsStyle} id={hId}>
                <ol className={bs.ls}>{tmp}</ol></div></li>
        });
        return <div className='card'>
            <div className='card-header btn-group'>
                <button type="button" className="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="bottom"
                    title='Добавить'>Add</button>
                <button type="button" className="btn btn-primary">Edit</button>
                <button type="button" className="btn btn-primary">Del</button>
            </div>
            <div className='card-body p-0'>
                <ol className={bs.ls}>{tmp}</ol>
            </div>
        </div>
    }
}
export default Groups