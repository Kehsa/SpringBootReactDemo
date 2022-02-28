export type LogEntities = {
    _embedded: {
        logs: LogEntity[]
    }
}
export type LogEntity = {
    id: number,
    user?: string,
    entity: number,
    info: string,
    table?: number,
    tableName: string,
    _links: {
        self: { href: string }
        user: { href: string }
    }
}
