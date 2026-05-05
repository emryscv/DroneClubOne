import Leaderboard from "@/app/components/Leaderboard";
import TitleBorder from "@/app/components/TitleBorder";
import { getAllTimesForRace, getRace } from "@/app/data/queries/races";
import { Calendar, Clock, MapPin, Trophy } from "lucide-react";

export default async function Race({ params }: { params: { id: number } }) {
  const { id } = await params;
  const raceData = await getRace(id);
  const leaderboard = await getAllTimesForRace(id);

  return <main className="mx-auto px-4 sm:px-12 lg:px-24 py-12">
    <div className="mb-8 mt-16">
      <TitleBorder>{raceData.title}</TitleBorder>

      <div className="flex flex-wrap gap-6 text-muted-foreground mb-6 mt-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          <span>{new Date(raceData.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span>{raceData.location}</span>
        </div>
    </div>
    </div>

    <Leaderboard leaderboard={leaderboard} />
  </main>
}