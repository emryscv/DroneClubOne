"use server";
import postgres from "postgres";
import { LeaderbaordEntryType, RaceHistoryEntryType } from "../types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

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

export async function getTimesForRace(raceId: number) {
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

export async function updatePilotTime(pilotId: number, raceId: number, time: number, crashes: number) {
    await sql`UPDATE pilot_race SET time = ${time}, crashes = ${crashes} WHERE pilotid = ${pilotId} AND raceid = ${raceId};`;
}

export async function addPilotTime(pilotId: number, raceId: number, time: number, crashes: number) {
    await sql`INSERT INTO pilot_race (pilotid, raceid, time, crashes) VALUES (${pilotId}, ${raceId}, ${time}, ${crashes});`;
}