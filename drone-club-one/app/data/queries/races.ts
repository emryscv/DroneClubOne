"use server";
import postgres from 'postgres';
import { LeaderbaordEntryType, PilotTableType, RaceTableType } from '../types';

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
export async function getRace(raceId: number) {
    const data = await sql<RaceTableType[]>`
        SELECT 
            id, 
            title, 
            date, 
            location,
            bannerurl
        FROM races
        WHERE id = ${raceId};`;
    return data[0];
}

export async function getRaces() {
    const data = await sql<RaceTableType[]>`
        SELECT 
            id, 
            title, 
            date, 
            location,
            bannerurl,
            date > CURRENT_DATE AS isupcoming,
            count(pr.pilotid) AS pilotscount
        FROM races r
        JOIN pilot_race pr ON r.id = pr.raceid
        GROUP BY r.id
        ORDER BY date DESC;`;
    return data;
}

// Check if this is still a good idea, given the fact that 
// checking the time here maybe not a good ideaMaybe it is 
// better to check that by hand on dashboards
export async function getPreviousRaces() { 
    const data = await sql<RaceTableType[]>`
        SELECT 
            id, 
            title, 
            date, 
            location,
            bannerurl
        FROM races
        WHERE date <= CURRENT_DATE
        ORDER BY date DESC;`;
    return data;
}

export async function insertRace(raceData: RaceTableType) {
    console.log(raceData);

    const data = await sql<RaceTableType[]>`
        INSERT INTO races (title, date, location, bannerurl)
        VALUES (${raceData.title}, ${raceData.date}, ${raceData.location}, ${raceData.bannerurl});`;
}