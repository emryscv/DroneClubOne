import PilotCard from "@/app/components/PilotCard";
import RaceHistoryEntry from "@/app/components/RaceHistoryEntry";
import { getPilot } from "@/app/data/queries/pilots";
import { getRacesForPilot } from "@/app/data/queries/pilotRace";
import { RaceHistoryEntryType } from "@/app/data/types";
import { TrendingUp } from "lucide-react";

export default async function Pilot({ params }: { params: { id: number } }) {
    const { id } = await params;
    const pilotData = await getPilot(id);
    const raceHistory = await getRacesForPilot(id);

    console.log("pilotData", pilotData);
    return (
        <div className="grid md:grid-cols-3 gap-8 mb-12 mt-10">
            <PilotCard pilotData={pilotData} isLink={false} />

            <div className="md:col-span-2">
                <h2 className="text-2xl mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-accent" />
                    Race History
                </h2>

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
            </div>
        </div>
    );
}