import { getAllRaces } from "./data/queries";
import Link from "next/link";
import Leaderboard from "./components/Leaderboard";


export default async function Home() {
  const leaderboard = await getAllRaces();
  console.log(leaderboard);

  return (
    <main className="mx-auto px-4 sm:px-12 lg:px-24 py-12">
      
      <Leaderboard leaderboard={leaderboard} />

      <div className="mt-8 text-center">
        <Link
          href="/races/3"
          className="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          View Full Race Details
        </Link>
      </div>
    </main>
  );
}
