import postgres from 'postgres';
import { LeaderbaordEntryType, RaceTableType } from './types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getAllRaces(){
    const data = await sql<LeaderbaordEntryType[]>`
        SELECT 
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