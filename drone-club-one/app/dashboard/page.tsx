"use server";

import { getPilots } from "../data/queries/pilots";
import { getRaceNamesAndIDs } from "../data/queries/races";
import Dashboard from "./Dashboard";

export default async function Page() {
    const pilots = await getPilots();
    const races = await getRaceNamesAndIDs();
    
    return <Dashboard pilots={pilots} races={races} />;
}