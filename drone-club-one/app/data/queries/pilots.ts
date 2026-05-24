"use server";
import postgres from 'postgres';
import { PilotTableType } from '../types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getPilot(pilotId: number) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    try {
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
    } catch (error) {
        console.error("Error fetching pilot's metadata by ID", error);
        return {} as any;
    }
}

export async function getPilots() {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    try {
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
    catch (error) {
        console.error("Error fetching pilots' metadata", error);
        return [];
    }
}

export async function insertPilot(pilotData: PilotTableType) {
    console.log("Inserting pilot data into database", pilotData);
    try {
        const data = await sql<PilotTableType[]>`
            INSERT INTO pilots (firstname, middlename, lastname, nickname, status, pictureurl)
            VALUES (${pilotData.firstname}, ${pilotData.middlename}, ${pilotData.lastname}, ${pilotData.nickname}, ${pilotData.status}, ${pilotData.pictureurl});`;
    } catch (error) {
        console.error("Error inserting a new pilot", error); //notify this in frontend
    }
}

export async function updatePilot(pilotData: PilotTableType) {
    console.log("Updating pilot data in database", pilotData);
    try {
        const data = await sql<PilotTableType[]>`UPDATE pilots
        SET 
            firstname = ${pilotData.firstname},
            middlename = ${pilotData.middlename},
            lastname = ${pilotData.lastname},
            nickname = ${pilotData.nickname},
            status = ${pilotData.status},
            pictureurl = COALESCE(${pilotData.pictureurl}, pictureurl)
        WHERE id = ${pilotData.id};`;
    } catch (error) {
        console.error("Error updating a pilot's profile", error); //notify this in frontend
    }
}