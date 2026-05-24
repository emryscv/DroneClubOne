import { getRacesForPilot } from "../data/queries/pilotRace";
import { RaceHistoryEntryType } from "../data/types";
import RaceHistoryEntry from "./RaceHistoryEntry";

export default async function RaceHistory({ pilotId }: { pilotId: number }) {
    const raceHistory = await getRacesForPilot(pilotId);

    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full">
                <thead>
                    <tr className="bg-secondary border-b border-border">
                        <th className="text-muted-foreground tracking-wide p-4 text-left">RACE</th>
                        <th className="text-muted-foreground tracking-wide p-4 text-left">DATE</th>
                        <th className="text-muted-foreground tracking-wide p-4 text-left">POSITION</th>
                        <th className="text-muted-foreground tracking-wide p-4 text-left">TIME</th>
                        <th className="text-muted-foreground tracking-wide p-4">CRASHES</th>
                    </tr>
                </thead>
                <tbody>
                    {raceHistory.map((race: RaceHistoryEntryType, i: number) => (
                        <RaceHistoryEntry key={i} race={race} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}