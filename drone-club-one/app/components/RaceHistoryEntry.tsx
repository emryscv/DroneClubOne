"use client";
import { Calendar, Trophy } from "lucide-react";
import { RaceHistoryEntryType } from "../data/types";
import { useRouter } from "next/navigation";

export default function RaceHistoryEntry({ race }: { race: RaceHistoryEntryType }) {
    const  router = useRouter();
    console.log(race);
    return <tr
        className="border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors cursor-pointer"
        onClick={() => { router.push(`/races/${race.raceid}`) }}
    >
        <td className="p-4" > {race.title} </td>
        < td className="p-4" >
            <div className="flex items-center gap-2 text-muted-foreground" >
                <Calendar className="w-4 h-4" />
                {
                    new Date(race.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    })
                }
            </div>
        </td>
        < td className="p-4" >
            <div className="flex items-center gap-2" >
                <span className={race.position === 1 ? "text-accent" : ""}>
                    {race.position}
                </span>
                {race.position === 1 && <Trophy className="w-4 h-4 text-accent" />}
            </div>
        </td>
        < td className="p-4" > {race.time} </td>
        < td className="p-4 text-center" > {race.crashes} </td>
    </tr>
}