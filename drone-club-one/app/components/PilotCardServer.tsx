import { getPilot } from "../data/queries/pilots";
import PilotCard from "./PilotCard";

export default async function PilotCardServer({ pilotId }: { pilotId: number }) {
    const pilotData = await getPilot(pilotId);
    return <PilotCard pilotData={pilotData} />;
}