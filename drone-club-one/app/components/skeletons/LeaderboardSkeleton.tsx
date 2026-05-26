import Image from "next/image";
import TableRow from "../TableRow";
import { LeaderbaordEntryType } from "../../data/types";

export default function LeaderboardSkeleton() {
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
            <tbody aria-hidden="true" className="invisible">
                <TableRow data={{ id: 1, position: 1, nickname: "nick", firstname: "Jhon", middlename: "Michael", lastname: "Doe", time: 0.4000, crashes: 1 } as LeaderbaordEntryType} />
            </tbody>
        </table>

        <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={48} height={48} className="opacity-50 mx-auto mb-16 animate-spin" />

    </div>
}