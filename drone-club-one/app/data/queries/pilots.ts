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
    console.log("Inserting pilot data into database", pilotData);
    const data = await sql<PilotTableType[]>`
        INSERT INTO pilots (firstname, middlename, lastname, nickname, status, pictureurl)
        VALUES (${pilotData.firstname}, ${pilotData.middlename}, ${pilotData.lastname}, ${pilotData.nickname}, ${pilotData.status}, ${pilotData.pictureurl});`;
}

export async function updatePilot(pilotData: PilotTableType) {
    console.log("Updating pilot data in database", pilotData);
    const data = await sql<PilotTableType[]>`UPDATE pilots
        SET 
            firstname = ${pilotData.firstname},
            middlename = ${pilotData.middlename},
            lastname = ${pilotData.lastname},
            nickname = ${pilotData.nickname},
            status = ${pilotData.status},
            pictureurl = COALESCE(${pilotData.pictureurl}, pictureurl)
        WHERE id = ${pilotData.id};`;
}