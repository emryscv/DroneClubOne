export type RaceTableType = {
    id: number,
    title: string,
    date: string,
    location: string,
    bannerUrl?: string,
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
    status: "active" | "inactive",
    pictureUrl: string,

}

export type RaceHistoryEntryType = {
    raceId: number,
    position: number,
    time: number,
    crashes: number,
    title: string,
    date: string,
}