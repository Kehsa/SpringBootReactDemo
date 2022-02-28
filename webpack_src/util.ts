import ModalLogin from "./component/ModalLogin";

const my: any = {}
my.dateTimeFormatter = new Intl.DateTimeFormat('ru-RU')

export function fd(d: Date): string {
    return my.dateTimeFormatter.format(d)
}

export function formToObject<T>(f: HTMLFormElement): T {
    const obj: any = {};
    const fd = new FormData(f);
    for (let k of fd.keys()) {
        obj[k] = fd.get(k)
    }
    return obj
}

export function formToJson(f: any): string {
    return JSON.stringify(formToObject(f))
}

export function objectFromFormTimestamp(obj: any, tsName: string) {
    let dateName = tsName+'D';
    let timeName = tsName+'T';
    let date = obj[dateName]
    let time = obj[timeName]
    delete obj[dateName]
    delete obj[timeName]
    obj[tsName] = date+'T'+time
}

export function objectFromFormBool(obj: any, boolName: string) {
    obj[boolName] = (obj[boolName] !== undefined)
}

export function getById(id: string): HTMLElement {
    return document.getElementById(id)
}

export function parseSearchParams<T>(str: string): T {
    if (!str) return undefined

    const obj: any = {}
    const arr = str.split('&')
    if (arr.length > 0) {
        arr[0] = arr[0].slice(1)
        for (let e of arr) {
            let tmp = e.split('=')
            obj[tmp[0]] = tmp[1]
        }
    }
    return obj
}

export type Csrf = { header: string, token: string }
export function getCsrf() {
    const obj: Csrf = {
        // @ts-ignore
        header: document.querySelector('meta[name="_csrf_header"]').content,
        // @ts-ignore
        token: document.querySelector('meta[name="_csrf"]').content
    }
    return obj
}

export interface MyResponse extends Response { catched: boolean }
export function fetchX(address: string, options: RequestInit) {
    const csrf = getCsrf()
    options.headers = { 'Content-Type': 'application/json' }
    options.headers[csrf.header] = csrf.token
    options.redirect = 'manual'
    return fetch(address, options).then( resp => {
        const res = resp as MyResponse
        res.catched = false
        if (res.redirected) {
            res.catched = true
            window.open(res.url, '_blank')
        }
        if (res.status === 0 && res.type === 'opaqueredirect') {
            res.catched = true
            ModalLogin.showMe()
        }
        return res
    })
}

export function fetchGJ(address: string) {
    return fetch(address, { redirect: 'manual' }).then(res => {
        if (res.redirected) window.location.href = res.url
        if (res.status === 0 && res.type === 'opaqueredirect') window.location.href = '/login'
        return res.json();
    })
}

export function  findRestSelfName(o: any): string {
    let h = o._links.self.href
    for (let e of Object.keys(o._links)) {
        if (e === 'self') continue
        if (o._links[e].href === h) return e
    }
}

export function toggleDisplay(block: HTMLElement) {
    if (block.style.display === "none") {
        block.style.display = '';
    } else {
        block.style.display = "none";
    }
}

export function getHttpParam(obj: any, name: string): string {
    return obj.props.match.params[name]
}