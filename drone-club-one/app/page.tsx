import Image from "next/image";
import { getAllRaces } from "./data/queries";
import TableRow from "./components/TableRow";


export default async function Home() {
  const leaderboard = await getAllRaces();
  console.log(leaderboard);

  return (
    <div className="flex flex-col flex-1 bg-white">
      <main className="">
        <table>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Nickname</th>
              <th>Fullname</th>
              <th>Time</th>
              <th>Crashes</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {
              leaderboard.map((row, i) => <TableRow key={i} data={row} />)
            }
          </tbody>
        </table>
      </main>
    </div>
  );
}
