export type RaceTableType = {
    id: number,
    title: string,
    date: string,
    location: string,
    bannerurl?: string,
    isupcoming: boolean,
    pilotscount: number 
}

export type LeaderbaordEntryType = {
    id: number,
    position: number,
    nickname: string,
    firstname: string,
    middlename: string | null,
    lastname: string,
    time: number,
    crashes: number
}

export type PilotTableType = {
    id: number,
    firstname: string,
    middlename: string | null,
    lastname: string,
    nickname: string,
    status: "active" | "inactive",
    pictureurl: string | null,
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