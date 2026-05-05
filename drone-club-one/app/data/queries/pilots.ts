"use server";
import postgres from 'postgres';
import { PilotTableType } from '../types';

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