export type Goods = {
    _embedded: {
        groups: Good[]
    }
}

export type Good = {
    id?: number,
    name: String,
    deleted: boolean,
    subGroup?: string,
    _links: {
        self: { href: string },
        good: { href: string },
        subGroup?: { href: string }
    }
}