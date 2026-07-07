"use client";
import { Calendar, MapPin, Users } from "lucide-react";
import { RaceTableType } from "../data/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RaceCard({ race }: { race: RaceTableType }) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "CURRENT":
                return "bg-accent text-accent-foreground";
            case "COMPLETED":
                return "bg-secondary text-muted-foreground";
            case "UPCOMING":
                return "bg-secondary text-black border-2 border-border";
            case "NEXT":
                return "bg-black text-white";
            default:
                return "bg-secondarytext-white";
        }
    };

    const router = useRouter();
    const raceDate = new Date(race.date);

    return <div
        key={race.id}
        onClick={() => { if (race.status !== "UPCOMING" && race.status !== "NEXT") router.push(`/races/${race.id}`) }}
        className={`bg-card border border-border rounded-lg overflow-hidden ${race.status === "UPCOMING" || race.status === "NEXT" ? "opacity-70 cursor-default" : "hover:border-accent transition-colors cursor-pointer"}`}
    >
        {race.bannerurl && (
            <Image
                src={race.bannerurl}
                alt={`${race.title} banner`}
                width={1024}
                height={1024}
                className="aspect-square"
            />
        )}
        {!race.bannerurl && (
            <div className="aspect-square bg-secondary flex items-center justify-center p-6">
                <div className="text-center">
                    <div className="text-6xl mb-4 text-accent">
                        {raceDate.getUTCDate()}
                    </div>
                    <div className="text-muted-foreground">
                        {raceDate.toLocaleDateString('en-US', {
                            month: 'short',
                            year: 'numeric',
                            timeZone: 'UTC'
                        })}
                    </div>
                </div>
            </div>
        )}

        <div className="p-4">
            <div className={`flex items-start justify-between mb-3 ${race.status === "CURRENT" ? "text-accent" : ""}`}>
                <h3>
                    {race.title}
                </h3>
            </div>

            <span className={`inline-block px-2 py-1 rounded-full text-xs uppercase tracking-wide mb-3 ${getStatusBadge(race.status)}`}>
                {race.status}
            </span>

            <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{raceDate.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        timeZone: 'UTC'
                    })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{race.location}</span>
                </div>
                {race.status !== "UPCOMING" && race.status !== "NEXT" && (
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{race.pilotscount} pilots</span>
                    </div>
                )}
            </div>
        </div>
    </div>

}