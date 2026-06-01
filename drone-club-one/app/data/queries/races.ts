"use server";
import postgres from 'postgres';
import { RaceTableType } from '../types';
import { th } from 'zod/locales';

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
        throw error;
    }
}

export async function getNextRace(raceId: number) {
    try { //we are assuming at most one race per day
        const data = await sql<{id :number}[]>`
            SELECT
                id
            FROM races
            WHERE date >= (SELECT date FROM races WHERE id = ${raceId}) 
            ORDER BY date ASC
            LIMIT 1;`;
        return data[0];
    }
    catch (error) {
        console.error("Error fetching next race", error);
        throw error;
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
            bannerurl,
            status
        FROM races
        WHERE id = ${raceId}
        ORDER BY date ASC;`;
        return data[0];
    } catch (error) {
        console.error("Error fetching race by ID", error);
        throw error;
    }
}

export async function getRaceStatus(raceId: number) {
    try {
        const data = await sql<{ status: string }[]>`
        SELECT 
            status
        FROM races
        WHERE id = ${raceId};`;
        return data[0];
    } catch (error) {
        console.error("Error fetching race status by ID", error);
        throw error;
    }
}

export async function getRaces(year: number) {
    //fix status here
    const data = await sql<RaceTableType[]>`
        SELECT 
            id, 
            title, 
            date, 
            location,
            bannerurl,
            status,
            count(pr.pilotid) AS pilotscount
        FROM races r
        LEFT JOIN pilot_race pr ON r.id = pr.raceid
        WHERE EXTRACT(YEAR FROM date) = ${year}
        GROUP BY r.id
        ORDER BY date DESC;`;
    return data;
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
        throw error;
    }
}

export async function getLocations() {
    try {
        const data = await sql<{ location: string }[]>`
            SELECT DISTINCT location From races;`;
        return data.map((row) => row.location);
    } catch (error) {
        console.error("Error fetching all possible locations", error);
        throw error
    }
}

export async function insertRace(raceData: RaceTableType) {
    console.log(raceData);

    const data = await sql<RaceTableType[]>`
        INSERT INTO races (title, date, location, bannerurl, status)
        VALUES (${raceData.title}, ${raceData.date}, ${raceData.location}, ${raceData.bannerurl}, ${raceData.status});`;
}


export async function updateRace(raceData: RaceTableType) {
    console.log(raceData);

    const data = await sql<RaceTableType[]>`
        UPDATE races
        SET 
            title = ${raceData.title},
            date = ${raceData.date},
            location = ${raceData.location},
            bannerurl = COALESCE(${raceData.bannerurl}, bannerurl)
        WHERE id = ${raceData.id};`;
}

export async function changeStatus(raceId: number, newStatus: "UPCOMING" | "NEXT" | "CURRENT" | "COMPLETED") {
    console.log(`Changing status of race with ID ${raceId} to ${newStatus}`);

    const data = await sql<RaceTableType[]>`
        UPDATE races
        SET status = ${newStatus}
        WHERE id = ${raceId};`;
}
