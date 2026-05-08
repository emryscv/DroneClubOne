export type RaceTableType = {
    id: number,
    title: string,
    date: string,
    location: string,
    bannerUrl?: string,
    isupcoming: boolean,
    pilotscount: number 
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
    raceid: any
    title: string,
    position: number,
    time: number,
    crashes: number,
    date: string,
}

export type UserType = {
    id: string,
    name: string,
    email: string,
    password: string,

}