import React from "react";
import {withRouter, RouteComponentProps} from "react-router-dom"
import {
    fetchGJ,
    fetchX,
    formToObject,
    getById,
    objectFromFormBool,
    objectFromFormTimestamp,
    parseSearchParams
} from "../util";
import Strings from "../Strings";
import LinkedRestFilteredPicker from "./LinkedRestFilteredPicker";

type S = { bool: any, str: any, ref: any, date: any, num: any }

interface PropsAuEd extends RouteComponentProps {
    cols?: string,
    lblCls?: string,
    inputsCls?: string,
    isPatch?: boolean,
    href?: string,
    newObj?: any
}
interface StateAuEd {
    method?: string,
    elements?: undefined,
    s?: S,
    href?: string
}
class AutoEditor extends React.Component<PropsAuEd, StateAuEd> {

    // @ts-ignore
    static defaultProps: PropsAuEd = {
        cols: 'col-md-4 card',
        lblCls: 'card-title',
        inputsCls: 'card-text',
        isPatch: false,
        href: undefined,
        newObj: undefined
    }
    state: StateAuEd = { }
    objInitial: any
    hrefChose: any = {}

    componentDidMount() {
        if (this.props.href === undefined) {
            const params = parseSearchParams<any>(this.props.location.search)
            if (params.href === undefined) return
            this.state.href = params.href
        }
        if (this.props.newObj !== undefined) {
            this.state.method = 'POST'
            this.rebuild(this.props.newObj)
        } else {
            this.state.method = (this.props.isPatch) ? 'PATCH' : 'PUT'
            fetchGJ(this.state.href).then( resp => this.rebuild(resp) )
        }
    }

    rebuild(o: any) {
        this.objInitial = o
        const s: S = { bool: {}, str: {}, ref: {}, date: {}, num: {} }
        for (let name of Object.keys(o)) {
            if (name === '_links') continue

            if (typeof o[name] === 'boolean') {
                s.bool[name] = o[name]
                continue
            }
            if (typeof o[name] === 'number') {
                if (name !== 'id') s.num[name] = o[name]
                continue
            }
            if (name.endsWith('T')) {
                let d = new Date(o[name])
                let value = d.getTime()
                if (typeof value == 'number' && !isNaN(value)) {
                    s.date[name] = d
                    continue
                }
            }
            s.str[name] = o[name]
        }
        let links = o._links;
        let h = links.self.href
        for (let name of Object.keys(links)) {
            if (name === 'self') continue
            let href = links[name].href;
            if (href === h) continue
            s.ref[name] = href
        }
        this.setState({ s: s })
    }

    getStr = (key: string, val: string) => {
        return <label className={this.props.lblCls}>{ key }<input className={this.props.inputsCls}
                                                                  type='text' name={ key } defaultValue={ val }/></label>
    }
    getNum = (key: string, val: number) => {
        return <label className={this.props.lblCls}>{ key }<input className={this.props.inputsCls}
                                                                  type='number' name={ key } defaultValue={ val }/></label>
    }
    getBool = (key: string, val: boolean) => {
        return <label className={this.props.lblCls}>{ key }<input className={this.props.inputsCls}
                                                                  type='checkbox' name={ key } defaultChecked={val}/></label>
    }
    getDate = (key: string, val: Date) => {
        let full = val.toISOString().split('T')
        let date = full[0]
        let time = full[1].split('.')[0]/*className={this.props.lblCls}*/
        return <div>
            {key}
            <div className={this.props.inputsCls}>
                <label style={{display: "inline"}}>{'date: '}<input type='date' name={key + 'D'} defaultValue={date}/></label>
                <label>{'time: '}<input type='time' name={key + 'T'} defaultValue={time}/></label>
            </div>
        </div>
    }
    getRef = (key: string, val: string) => {
            // <input className={this.props.inputsCls} type='text' name={ key } defaultValue={ val }/>
        return <label className={this.props.lblCls}>{ key }
            <LinkedRestFilteredPicker uniqueId={key} mainClassName={this.props.inputsCls} href={val}
                                      callback={this.refCallBack}/>
        </label>
    }
    refCallBack = (href: string, name: string) => {
        this.hrefChose[name] = href
    }

    getAny(key: string, val: any, fn: Function) {
        return <div className={ this.props.cols }><div className='card-body'>
            {fn(key, val)}
        </div></div>
    }
    getStrs(s: any) { return Object.keys(s.str).map( k => this.getAny(k, s.str[k], this.getStr)) }
    getNums(s: any) { return Object.keys(s.num).map( k => this.getAny(k, s.num[k], this.getNum)) }
    getBools(s: any) { return Object.keys(s.bool).map( k => this.getAny(k, s.bool[k], this.getBool)) }
    getDates(s: any) { return Object.keys(s.date).map( k => this.getAny(k, s.date[k], this.getDate)) }
    getRefs(s: any) { return Object.keys(s.ref).map( k => this.getAny(k, s.ref[k], this.getRef)) }

    fixFormObject(o: any) {
        for (let b of Object.keys(this.state.s.bool)) objectFromFormBool(o, b)
        for (let t of Object.keys(this.state.s.date)) objectFromFormTimestamp(o, t)
        LinkedRestFilteredPicker.objectFromForm(this.hrefChose, o)
        return o
    }

    onClick = () => {
        fetchX(this.state.href, {
            method: 'PATCH',
            body: JSON.stringify(this.fixFormObject(formToObject(getById('aeForm') as HTMLFormElement)))
        }).then( res => {
            console.log(res)
        })
    }

    onCancel = () => {
        window.close()
    }

    render() {
        if (this.state.href === undefined) return <div>Error: href is undefined</div>
        const s = this.state.s
        if (s === undefined) return <div>Loading</div>

        return <form id='aeForm'>
            <div className='row'>
                { this.getStrs(s) }
                { this.getDates(s) }
                { this.getNums(s) }
                { this.getRefs(s) }
                { this.getBools(s) }
            </div>
            <div className='row btn-toolbar'>
                <div className='btn-group'>
                    <button type='button' className='btn btn-primary' onClick={this.onClick}>{Strings.okButton}</button>
                    <button type='button' className='btn btn-secondary' onClick={this.onCancel}>{Strings.cancelButton}</button>
                </div>
            </div>
        </form>
    }
}

export default withRouter(AutoEditor)