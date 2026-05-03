import { LeaderbaordEntryType } from "../data/types";
import TableRow from "./TableRow";

export default function Leaderboard({ leaderboard }: { leaderboard: LeaderbaordEntryType[] }) {
    return <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
            <thead>
                <tr className="bg-secondary border-b border-border">
                    <th className="p-4 text-muted-foreground tracking-wide">POS</th>
                    <th className="p-4 text-muted-foreground tracking-wide text-left">PILOT</th>
                    <th className="p-4 text-muted-foreground tracking-wide">TIME</th>
                    <th className="p-4 text-muted-foreground tracking-wide">CRASHES</th>
                </tr>
            </thead>
            <tbody>
                {
                    leaderboard.map((row: LeaderbaordEntryType, i: number) => <TableRow key={i} data={row} />)
                }
            </tbody>
        </table>
    </div>
}