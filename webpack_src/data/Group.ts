export type Groups = {
    _embedded: {
        groups: Group[]
    }
}

export type Group = {
    id?: number,
    name: string,
    deleted?: boolean,
    subGroups?: string,
    _links?: {
        self: { href: string },
        group: { href: string },
        subGroups: { href: string }
    }
}
