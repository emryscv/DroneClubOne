import TitleBorder from "@/app/components/TitleBorder";
import { getRacesForPilot, getPilot } from "@/app/data/queries/pilots";
import { Calendar, TrendingUp, Trophy } from "lucide-react";

export default async function Pilot({ params }: { params: { id: number } }) {
    const { id } = await params;
    const pilotData = await getPilot(id);
    const raceHistory = await getRacesForPilot(id);

    return (
        <div className="grid md:grid-cols-3 gap-8 mb-12 mt-10">
            <div className="md:col-span-1 bg-card border border-border rounded-lg overflow-hidden">
                <div className="aspect-square bg-secondary flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-6xl text-accent">
                        {"AB"}
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <TitleBorder size="small">{pilotData.nickname}</TitleBorder>

                        <span className={`inline-block px-3 py-1 rounded-full text-sm uppercase tracking-wide ${pilotData.status === "active" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                            }`}>
                            {pilotData.status}
                        </span>
                    </div>
                    <div className="flex flex-col mt-4">
                        <span className="text-accent">Full Name</span>
                        <span className="text-xl">{`${pilotData.firstname}${pilotData.middlename ? " " + pilotData.middlename : ""} ${pilotData.lastname}`}</span>
                    </div>
                </div>
            </div>

            <div className="md:col-span-2">
                <h2 className="text-2xl mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-accent" />
                    Race History
                </h2>

                <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-secondary border-b border-border">
                                <th className="text-muted-foreground tracking-wide">RACE</th>
                                <th className="text-muted-foreground tracking-wide">DATE</th>
                                <th className="text-muted-foreground tracking-wide">POSITION</th>
                                <th className="text-muted-foreground tracking-wide">TIME</th>
                                <th className="text-muted-foreground tracking-wide">CRASHES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {raceHistory.map((race: any, index: number) => (
                                <tr key={index}
                                    className="p-4 border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors"
                                >
                                    <td>{race.title}</td>
                                    <td >
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(race.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <span className={race.position === 1 ? "text-accent" : ""}>
                                                {race.position}
                                            </span>
                                            {race.position === 1 && <Trophy className="w-4 h-4 text-accent" />}
                                        </div>
                                    </td>
                                    <td>{race.time}</td>
                                    <td>{race.crashes}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}