"use server";
import postgres from 'postgres';
import { RaceTableType } from '../types';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getLatestRace() {
    try {
        const data = await sql<RaceTableType[]>`
            SELECT *
            FROM races
            WHERE date <= CURRENT_DATE
            ORDER BY date DESC
            LIMIT 1;`;
        return data[0];
    } catch (error) {
        console.error("Error fetching latest race", error);
        return {} as any;
    }
}

export async function getRace(raceId: number) {
    try {
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
    } catch (error) {
        console.error("Error fetching race by ID", error);
        return {} as any;
    }
}

export async function getRaces(year: number) {
    try {
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
        LEFT JOIN pilot_race pr ON r.id = pr.raceid
        WHERE EXTRACT(YEAR FROM date) = ${year}
        GROUP BY r.id
        ORDER BY date DESC;`;
        return data;
    } catch (error) {
        console.error("Error fetching all races", error);
        return [];
    }
}

export async function insertRace(raceData: RaceTableType) {
    console.log(raceData);
    try {
        const data = await sql<RaceTableType[]>`
            INSERT INTO races (title, date, location, bannerurl)
            VALUES (${raceData.title}, ${raceData.date}, ${raceData.location}, ${raceData.bannerurl});`;
    } catch (error) {
        console.error("Error inserting a new race", error); //notify this in frontend
    }
}

export async function updateRace(raceData: RaceTableType) {
    console.log(raceData);

    try {
        const data = await sql<RaceTableType[]>`
        UPDATE races
        SET 
            title = ${raceData.title},
            date = ${raceData.date},
            location = ${raceData.location},
            bannerurl = COALESCE(${raceData.bannerurl}, bannerurl)
        WHERE id = ${raceData.id};`;
    } catch (error) {
        console.error("Error updating a race", error); //notify this in frontend
    }
}

export async function getRaceNamesAndIDs() {
    try {
        const data = await sql<{ id: number, title: string }[]>`
        SELECT 
            id, 
            title
        FROM races;`;
        return data;
    } catch (error) {
        console.error("Error fetching races' names and IDs", error);
        return [];
    }
}

export async function getLocations() {
    try {
        const data = await sql<{ location: string }[]>`
            SELECT DISTINCT location From races;`;
        return data.map((row) => row.location);
    } catch (error) {
        console.error("Error fetching all possible locations", error);
        return [];
    }
}