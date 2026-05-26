"use server";
import postgres from "postgres";
import { LeaderbaordEntryType, LeaderbaordTimeMSEntryType, RaceHistoryEntryType, RaceHistoryTimeMSEntryType } from "../types";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getRacesForPilot(pilotId: number) {
    try {
        const data = await sql<RaceHistoryTimeMSEntryType[]>`
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

        const formattedData: RaceHistoryEntryType[] = data.map(entry => ({
            ...entry,
            time: msToTime(entry.time)
        }));

        return formattedData;
    } catch (error) {
        console.error("Error fetching races for a pilot", error);
        return [];
    }
}

export async function getTimesForRace(raceId: number) {
    try {
        const data = await sql<LeaderbaordTimeMSEntryType[]>`
        SELECT
            p.id, 
            position, 
            nickname, 
            firstname, 
            middlename, 
            lastname, 
            pictureurl,
            time, 
            crashes 
        FROM races r
        JOIN pilot_race pr ON r.id = pr.raceid
        JOIN pilots p ON pr.pilotid = p.id
        WHERE r.id = ${raceId}
        ORDER BY position;`;

        const formattedData: LeaderbaordEntryType[] = data.map(entry => ({
            ...entry,
            time: msToTime(entry.time)
        }));

        return formattedData;
    } catch (error) {
        console.error("Error fetching times for a race", error);
        return [];
    }
}

export async function updatePilotTime(pilotId: number, raceId: number, time: number, crashes: number) {
    try {
        await sql`UPDATE pilot_race SET time = ${time}, crashes = ${crashes} WHERE pilotid = ${pilotId} AND raceid = ${raceId};`;
    } catch (error) {
        console.error("Error updating pilot's time", error); //notify this in frontend
    }
}

export async function addTimeToRace(pilotId: number, raceId: number, time: number, crashes: number) {
    try {
        await sql`INSERT INTO pilot_race (pilotid, raceid, time, crashes) VALUES (${pilotId}, ${raceId}, ${time}, ${crashes});`;
    } catch (error) {
        console.error("Error adding time to a race", error); //notify this in frontend
    }
}

export async function updatePositions(raceId: number) {
    try {
        await sql`
    UPDATE pilot_race SET position = newPosition
    FROM (
        SELECT 
            pilotid, 
            time, 
            crashes,
            RANK() OVER (ORDER BY time ASC, crashes ASC) AS newPosition
        FROM pilot_race
        WHERE raceid = ${raceId}
    ) AS ranked
    WHERE pilot_race.pilotid = ranked.pilotid AND pilot_race.raceid = ${raceId};`;
    } catch (error) {
        console.error("Error updating positions of a race", error); //notify this in frontend
    }
}

function msToTime(time: number): string {
    const minutes = Math.floor(time / 60000);
    time %= 60000;
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    return `${minutes}:${seconds >= 10 ? seconds : '0' + seconds}.${milliseconds >= 100 ? milliseconds : milliseconds >= 10 ? '0' + milliseconds : '00' + milliseconds}`;
}