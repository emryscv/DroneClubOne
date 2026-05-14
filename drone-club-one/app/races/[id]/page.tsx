import Leaderboard from "@/app/components/Leaderboard";
import TitleBorder from "@/app/components/TitleBorder";
import { getRace } from "@/app/data/queries/races";
import { getTimesForRace } from "@/app/data/queries/pilotRace";
import { Calendar, MapPin } from "lucide-react";

export default async function Race({ params }: { params: { id: number } }) {
  const { id } = await params;
  const raceData = await getRace(id);
  const leaderboard = await getTimesForRace(id);
  const raceDate = new Date(raceData.date);

  return (
    <>
      <div className="mb-8">
        <TitleBorder>{raceData.title}</TitleBorder>

        <div className="flex flex-wrap gap-6 text-muted-foreground mb-6 mt-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span>{raceDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              timeZone: 'UTC'
            })}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>{raceData.location}</span>
          </div>
        </div>
      </div>

      <Leaderboard leaderboard={leaderboard} />
    </>
  );
}