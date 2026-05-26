'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { PilotTableType, RaceTableType } from './types';
import { insertPilot, updatePilot } from './queries/pilots';
import { insertRace, updateRace } from './queries/races';
import { addTimeToRace, updatePilotTime, updatePositions } from './queries/pilotRace';


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}


export async function signOutAction() {
    'use server';
    await signOut({ redirectTo: '/' });
}

export async function addPilotAction(formData: FormData) {
    const image: File | null = formData.get('image') as File | null;
    const nickname = formData.get('nickname') as string;
    const firstname = formData.get('firstName') as string;
    const middlename = formData.get('middleName') as string;
    const lastname = formData.get('lastName') as string;

    console.log("Add Pilot Form Data", image, nickname, firstname, middlename, lastname);

    let blob;
    if (image && image.size > 0) {
        blob = await put(image.name, image, {
            access: 'public' /* or 'public' */,
            addRandomSuffix: true,
        });
        revalidatePath('/');
    }

    const pilotData: PilotTableType = {
        id: -1, // This will be set by the database
        nickname,
        firstname,
        middlename,
        lastname,
        status: 'active',
        pictureurl: blob ? blob.url : null,
    };

    await insertPilot(pilotData);
}

export async function editPilotAction(formData: FormData) {
    const pilotId = parseInt(formData.get('pilotId') as string);
    const image: File | null = formData.get('image') as File | null;
    const nickname = formData.get('nickname') as string;
    const firstname = formData.get('firstName') as string;
    const middlename = formData.get('middleName') as string;
    const lastname = formData.get('lastName') as string;
    const status = formData.get('status') as string;

    console.log("Edit Pilot Form Data", { pilotId, image, nickname, firstname, middlename, lastname, status });

    let blob;
    if (image && image.size > 0) {
        blob = await put(image.name, image, {
            access: 'public' /* or 'public' */,
            addRandomSuffix: true,
        });
        revalidatePath('/');
    }

    const pilotData: PilotTableType = {
        id: pilotId, // This will be set by the database
        nickname,
        firstname,
        middlename,
        lastname,
        status: status as 'active' | 'inactive',
        pictureurl: blob ? blob.url : null,
    };

    console.log("Updating pilot data", pilotData);

    await updatePilot(pilotData);
}

export async function addRaceAction(formData: FormData) {
    const banner: File | null = formData.get('image') as File | null;
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;

    console.log("Add Race Form Data", { banner, title, date, location });
    let blob;
    if (banner && banner.size > 0) {
        blob = await put(banner.name, banner, {
            access: 'public' /* or 'public' */,
            addRandomSuffix: true,
        });
        revalidatePath('/');
    }

    const raceData: RaceTableType = {
        id: -1, // This will be set by the database
        title,
        date,
        location,
        bannerurl: blob ? blob.url : null,
        isupcoming: true, // This will be calculated based on the date
        pilotscount: -1, // This will be updated when pilots
    };

    await insertRace(raceData);
}

export async function editRaceAction(formData: FormData) {
    const raceId = parseInt(formData.get('raceId') as string);
    const banner: File | null = formData.get('image') as File | null;
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;

    console.log("Edit Race Form Data", { raceId, banner, title, date, location });
    let blob;
    if (banner && banner.size > 0) {
        blob = await put(banner.name, banner, {
            access: 'public' /* or 'public' */,
            addRandomSuffix: true,
        });
        revalidatePath('/');
    }

    const raceData: RaceTableType = {
        id: raceId, // This will be set by the database
        title,
        date,
        location,
        bannerurl: blob ? blob.url : null,
        isupcoming: true, // This will be calculated based on the date
        pilotscount: -1, // This will be updated when pilots
    };

    await updateRace(raceData);
}

export async function addPilotTimeAction(formData: FormData) {
    const pilotId = parseInt(formData.get('pilotId') as string);
    const raceId = parseInt(formData.get('raceId') as string);
    const time = formData.get('time') as string;
    const crashes = parseInt(formData.get('crashes') as string);

    time.split(":")[1].split(".")
    console.log("Addding pilot time", { pilotId, raceId, time, crashes });
    await addTimeToRace(pilotId, raceId, timeToMS(time), crashes);
    await updatePositions(raceId);
}

export async function editPilotTimeAction(formData: FormData) {
    const pilotId = parseInt(formData.get('pilotId') as string);
    const raceId = parseInt(formData.get('raceId') as string);
    const time = formData.get('time') as string;
    const crashes = parseInt(formData.get('crashes') as string);

    console.log("Updating pilot time", { pilotId, raceId, time, crashes });
    await updatePilotTime(pilotId, raceId, timeToMS(time), crashes);
    await updatePositions(raceId);
}

function timeToMS(time: string): number {
    const [minutes, seconds, milliseconds] = time.split(/[:.]/).map(Number);
    return minutes * 60000 + seconds * 1000 + milliseconds;
}