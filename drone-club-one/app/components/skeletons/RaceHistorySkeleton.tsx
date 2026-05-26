import RaceHistoryEntry from "../RaceHistoryEntry";
import Image from "next/image";


export default async function RaceHistorySkeleton({ pilotId }: { pilotId: number }) {
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
                <tbody aria-hidden="true" className="invisible">
                    <RaceHistoryEntry key={0} race={{ raceid: 0, title: "Loading...", date: "Loading...", position: 0, time: 0, crashes: 0 }} />
                </tbody>
            </table>
            <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={48} height={48} className="opacity-50 mx-auto mb-16 animate-spin" />
        </div>
    );
}
