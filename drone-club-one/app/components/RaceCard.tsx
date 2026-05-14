"use client";
import { Link, MapPin, Users } from "lucide-react";
import { RaceTableType } from "../data/types";
import { useRouter } from "next/navigation";

export default function RaceCard({ race }: { race: RaceTableType }) {
//   TODO - addd active status  
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "text-accent";
//       case "completed":
//         return "text-muted-foreground";
//       case "upcoming":
//         return "text-foreground";
//       default:
//         return "text-foreground";
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "active":
//         return "bg-accent text-accent-foreground";
//       case "completed":
//         return "bg-muted text-muted-foreground";
//       case "upcoming":
//         return "bg-secondary text-foreground";
//       default:
//         return "bg-secondary text-foreground";
//     }
//   };
    const router = useRouter();    

    return <div
        key={race.id}
        onClick={() => router.push(`/races/${race.id}`)}
        className="bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-colors cursor-pointer"
    >
        <div className="aspect-square bg-secondary flex items-center justify-center p-6">
            <div className="text-center">
                <div className="text-6xl mb-4 text-accent">
                    {new Date(race.date).getDate()}
                </div>
                <div className="text-muted-foreground">
                    {new Date(race.date).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                    })}
                </div>
            </div>
        </div>

        <div className="p-4">
            <div className="flex items-start justify-between mb-3">
                <h3>
                    {race.title}
                </h3>
            </div>

            <span className={`inline-block px-2 py-1 rounded-full text-xs uppercase tracking-wide mb-3 ${race.isupcoming ? "bg-secondary text-foreground" : "bg-secondary text-muted-foreground"}`}>
                {race.isupcoming ? "upcoming" : "completed"}
            </span>

            <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{race.location}</span>
                </div>
                {!race.isupcoming && (
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{race.pilotscount} pilots</span>
                    </div>
                )}
            </div>
        </div>
    </div>

}