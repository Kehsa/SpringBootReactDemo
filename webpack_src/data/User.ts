export type Users = {
    _embedded: {
        users: User[]
    }
}

export type User = {
    id?: number,
    name: string,
    login: string,
    role: string,
    password?: string,
    _links: {
        self: { href: string },
        user: { href: string }
    }
}
