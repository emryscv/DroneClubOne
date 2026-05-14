'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { blob } from 'stream/consumers';
import { PilotTableType, RaceTableType } from './types';
import { getPilot, getPilots, insertPilot } from './queries/pilots';
import { getRaceNamesAndIDs, insertRace } from './queries/races';
import { updatePilotTime } from './queries/pilotRace';


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

    console.log("formData", nickname, firstname, middlename, lastname, image);
    let blob;
    if (image) {
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

    insertPilot(pilotData);
}

export async function addRaceAction(formData: FormData) {
    const banner: File | null = formData.get('banner') as File | null;
    const title = formData.get('title') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;

    console.log("formData", banner, title, date, location);
    let blob;
    if (banner) {
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

    insertRace(raceData);
}

export async function addPilotTime(formData: FormData) {

}

export async function editPilotTime(formData: FormData) {
    const pilotId = parseInt(formData.get('pilotId') as string);
    const raceId = parseInt(formData.get('raceId') as string);
    const time = parseFloat(formData.get('time') as string);
    const crashes = parseInt(formData.get('crashes') as string);

    console.log("Updating pilot time", { pilotId, raceId, time, crashes });
    updatePilotTime(pilotId, raceId, time, crashes);
}

export async function getDashboardData() {
    const pilots = await getPilots();
    const races = await getRaceNamesAndIDs();

    return {
        pilots,
        races
    }
}