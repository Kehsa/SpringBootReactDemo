export type SubGroups = {
    _embedded: {
        groups: SubGroup[]
    }
}

export type SubGroup = {
    id?: number,
    name: string,
    deleted: boolean,
    group?: string,
    goods?: string[],
    _links: {
        self: { href: string },
        subGroup: { href: string },
        group: { href: string },
        goods: { href: string }
    }
}
