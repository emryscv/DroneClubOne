import Leaderboard from "@/app/components/Leaderboard";
import TitleBorder from "@/app/components/TitleBorder";
import { getAllTimesForRace, getRace } from "@/app/data/queries/races";

export default async function Race({ params }: { params: { id: number } }) {
  const { id } = await params;
  const raceData = await getRace(id);
  const leaderboard = await getAllTimesForRace(id);

  return <main className="mx-auto px-4 sm:px-12 lg:px-24 py-12">
    <div className="mb-8 mt-16">
      <TitleBorder>{raceData.title}</TitleBorder>
      <p className="text-muted-foreground mt-4">{raceData.location}</p>
      <p className="text-muted-foreground mt-4">{raceData.location}</p>
    </div>

    <Leaderboard leaderboard={leaderboard} />
  </main>
}