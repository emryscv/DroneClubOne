import { getTimesForRace, getLatestRace } from "./data/queries/races";
import Link from "next/link";
import Leaderboard from "./components/Leaderboard";
import TitleBorder from "./components/TitleBorder";
import bcrypt from 'bcrypt';


export default async function Home() {
  const raceData = await getLatestRace();
  const leaderboard = await getTimesForRace(raceData.id);

  const hashedPassword = await bcrypt.hash("12345678", 10);

  console.log("Hashed password:", hashedPassword);
  
  return (
    <>
      <div className="mb-8">
        <TitleBorder>Current Race Leaderboard</TitleBorder>
        <p className="text-muted-foreground mt-4">{raceData.title}</p>
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
    </>
  );
}
