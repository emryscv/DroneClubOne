export type RaceTableType = {
    name: string,
    date: string,
    location: string
}

export type LeaderbaordEntryType = {
    id: number,
    position: number,
    nickname: string,
    firstname: string,
    middlename: string,
    lastname: string,
    time: number,
    crashes: number
}

export type PilotTableType = {
    id: number,
    firstname: string,
    middlename: string,
    lastname: string,
    nickname: string,
    status: ["active", "inactive"]
    picture: string,

}