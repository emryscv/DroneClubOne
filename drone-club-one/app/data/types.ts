export type RaceTableType = {
    id: number,
    title: string,
    date: string,
    location: string,
    bannerurl: string | null,
    isupcoming: boolean,
    pilotscount: number 
}

export type LeaderbaordTimeMSEntryType = {
    id: number,
    position: number,
    nickname: string,
    firstname: string,
    middlename: string | null,
    lastname: string,
    pictureurl: string | null,
    time: number,
    crashes: number
}

export type LeaderbaordEntryType = {
    id: number,
    position: number,
    nickname: string,
    firstname: string,
    middlename: string | null,
    lastname: string,
    pictureurl: string | null,
    time: string,
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

export type RaceHistoryTimeMSEntryType = {
    raceid: any
    title: string,
    position: number,
    time: number,
    crashes: number,
    date: string,
}

export type RaceHistoryEntryType = {
    raceid: any
    title: string,
    position: number,
    time: string,
    crashes: number,
    date: string,
}

export type UserType = {
    id: string,
    name: string,
    email: string,
    password: string,

}