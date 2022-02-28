import React from "react";
import Strings from "../Strings";
import {fetchGJ, findRestSelfName, getById} from "../util";

interface PropsLRFP {
    uniqueId: string,
    objectKeyVal: string,
    mainClassName: string,
    href?: string,
    callback?: Function
}
interface StateLRFP {
    inputId: string,
    lsId: string,
    liClass: string,
    btnLabel: string,
    ls?: any[]
}
class LinkedRestFilteredPicker extends React.Component<PropsLRFP, StateLRFP> {

    static defaultProps: PropsLRFP = {
        uniqueId: '',
        objectKeyVal: 'name',
        mainClassName: ''
    }
    state: StateLRFP = {
        inputId: 'lrfpI' + this.props.uniqueId,
        lsId: 'lrfpL' + this.props.uniqueId,
        liClass: 'dropdown-item',
        btnLabel: 'loading'
    }
    defObject: any

    componentDidMount() {
        fetchGJ(this.props.href).then(o => {
            this.defObject = o
            this.setState({ btnLabel: o[this.props.objectKeyVal] })
        })
    }

    loadList = () => {
        fetchGJ(this.defObject._links.self.href.split('/'+this.defObject.id)[0]).then( l => {
            this.setState({ ls: l._embedded[Object.keys(l._embedded)[0]] })

        })
    }

    static objectFromForm(listObject: any, formObject: any) {
        for (let t of Object.keys(listObject)) {
            formObject[t] = listObject[t]
        }
    }

    filterEvent = () => {
        // @ts-ignore
        let filter = getById(this.state.inputId).value.toLowerCase();
        let lis = getById(this.state.lsId).getElementsByTagName('li');

        for (let li of lis) {
            let e = li.firstElementChild;
            // @ts-ignore
            let txtValue = e.textContent || e.innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                li.style.display = "";
            } else {
                li.style.display = "none";
            }
        }
    }

    chose = (obj: any) => {
        this.props.callback(obj._links.self.href, findRestSelfName(obj))
        this.setState({ btnLabel: obj[this.props.objectKeyVal] })
    }

    getLiElements() {
        if (this.state.ls === undefined) return ''
        let label = this.props.objectKeyVal;
        return this.state.ls.map( u => {
            return <li key={u.id}><button type='button' className={this.state.liClass}
                               onClick={ ()=> this.chose(u) }>
                { u[label] }</button></li>
        })
    }

    btnClick = () => { if (this.state.ls === undefined) this.loadList() }

    render() {
        return <div className={"btn-group " + this.props.mainClassName}>
            <button onClick={ this.btnClick } type="button" className="btn btn-danger dropdown-toggle"
                    data-bs-toggle="dropdown" aria-expanded="false">
                { this.state.btnLabel }
            </button>
            <ul id={this.state.lsId} className="dropdown-menu">
                <input id={this.state.inputId} type="text"
                       onKeyUp={ this.filterEvent } placeholder={ Strings.filterPlaceHolder }/>
                { this.getLiElements() }
            </ul>
        </div>
    }
}
export default LinkedRestFilteredPicker