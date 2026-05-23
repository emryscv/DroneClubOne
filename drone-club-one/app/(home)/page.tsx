import { getLatestRace } from "../data/queries/races";
import { getTimesForRace } from "../data/queries/pilotRace";
import Link from "next/link";
import Leaderboard from "../components/Leaderboard";
import TitleBorder from "../components/TitleBorder";


export default async function Home() {
  const raceData = await getLatestRace();

  return (
    <>
      <div className="mb-8">
        <TitleBorder>Current Race Leaderboard</TitleBorder>
        <p className="text-muted-foreground mt-4">{raceData.title}</p>
      </div>

      <Leaderboard raceId={raceData.id} />

      <div className="mt-8 text-center">
        <Link
          href={`/races/${raceData.id}`}
          className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          View Full Race Details
        </Link>
      </div>
    </>
  );
}
