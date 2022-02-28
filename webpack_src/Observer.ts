export default class Observer {

    private ls: Function[] = []

    register = (fn: Function) => {
        this.ls.push(fn)
    }

    emit = (obj: any) => {
        for (let fn of this.ls) {
            fn(obj)
        }
    }
}