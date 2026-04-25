import postgres from 'postgres';
import { LeaderbaordEntryType, PilotTableType, RaceTableType } from './types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getAllRaces() {
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
        WHERE r.id = 1
        ORDER BY position
        ;`;
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
        FROM pilots WHERE id = ${pilotId};`

    return data;
}