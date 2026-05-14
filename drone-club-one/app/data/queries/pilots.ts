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
            status,
            pictureurl
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
            pictureurl, 
            status
        FROM pilots 
        ORDER BY id;`

    return data;
}

export async function insertPilot(pilotData: PilotTableType) {
    console.log(pilotData);

    const data = await sql<PilotTableType[]>`
        INSERT INTO pilots (firstname, middlename, lastname, nickname, status, pictureurl)
        VALUES (${pilotData.firstname}, ${pilotData.middlename}, ${pilotData.lastname}, ${pilotData.nickname}, ${pilotData.status}, ${pilotData.pictureurl});`;
}

