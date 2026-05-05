import { getAllTimesForRace, getLatestRace } from "./data/queries/races";
import Link from "next/link";
import Leaderboard from "./components/Leaderboard";
import TitleBorder from "./components/TitleBorder";


export default async function Home() {
  const raceData = await getLatestRace();
  const leaderboard = await getAllTimesForRace(raceData.id);

  return (
    <main className="mx-auto px-4 sm:px-12 lg:px-24 py-12">
      <div className="mb-8 mt-16">
        <TitleBorder>Current Race Leaderboard</TitleBorder>
        <p className="text-muted-foreground mt-4">{raceData.name}</p>
      </div>

      <Leaderboard leaderboard={leaderboard} />

      <div className="mt-8 text-center">
        <Link
          href={`/races/${raceData.id}`}
          className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          View Full Race Details
        </Link>
      </div>
    </main>
  );
}
