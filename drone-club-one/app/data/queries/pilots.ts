"use server";
import postgres from 'postgres';
import { PilotTableType, RaceHistoryEntryType } from '../types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getPilot(pilotId: number) {
    const data = await sql<PilotTableType[]>`
        SELECT 
            id, 
            firstname, 
            middlename,    
            lastname,  
            nickname, 
            pictureurl, 
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

export async function getRacesForPilot(pilotId: number) {
    const data = await sql<RaceHistoryEntryType[]>`
        SELECT
            pr.raceid,
            r.title,
            r.date,
            position,
            time,
            crashes
        FROM pilots p
        JOIN pilot_race pr ON p.id = pr.pilotid
        JOIN races r ON pr.raceid = r.id
        WHERE p.id = ${pilotId};
    `;
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