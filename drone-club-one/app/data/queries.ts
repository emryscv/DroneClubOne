"use server";
import postgres from 'postgres';
import { LeaderbaordEntryType, PilotTableType, RaceTableType } from './types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getLatestRace() {
    const data = await sql<RaceTableType[]>`
        SELECT *
        FROM races
        WHERE date <= CURRENT_DATE
        ORDER BY date DESC
        LIMIT 1;`;
    return data[0];
}
export async function getAllTimesForRace(raceId: number) {
    const data = await sql<LeaderbaordEntryType[]>`
        SELECT
            p.id, 
            position, 
            nickname, 
            firstname, 
            middlename, 
            lastname, 
            time, 
            crashes 
        FROM races r
        JOIN pilot_race pr ON r.id = pr.raceid
        JOIN pilots p ON pr.pilotid = p.id
        WHERE r.id = ${raceId}
        ORDER BY position;`;
    return data;
}

export async function getPilot(pilotId: number) {
    const data = await sql<PilotTableType[]>`
        SELECT 
            id, 
            firstname, 
            middlename,    
            lastname,  
            nickname, 
            picture, 
            status
        FROM pilots 
        WHERE id = ${pilotId};`;
    return data[0];
}

export async function getPilots() {
    const data = await sql<PilotTableType[]>`
        SELECT 
            id, 
            firstname, 
            middlename,    
            lastname,  
            nickname, 
            picture, 
            status
        FROM pilots 
        ORDER BY id;`

    return data;
}

export async function insertPilot(formData: FormData) {
    console.log(formData);
    const pilot = {
        firstname: formData.get("firstname") as string,
        middlename: formData.get("middlename") as string,
        lastname: formData.get("lastname") as string,
        nickname: formData.get("nickname") as string,
    };

    const data = await sql<PilotTableType[]>`
        INSERT INTO pilots (firstname, middlename, lastname, nickname)
        VALUES (${pilot.firstname}, ${pilot.middlename}, ${pilot.lastname}, ${pilot.nickname});`;
}

export async function uploadAvatar(pilotId: number, fileUrl: string) {
    const data = await sql<PilotTableType[]>`
        UPDATE pilots SET picture = ${fileUrl} WHERE id = ${pilotId};`;
}