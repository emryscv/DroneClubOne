import Image from "next/image";
import { getAllRaces } from "./data/queries";

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
              leaderboard.map((position, i) => {
                return <tr key={i}>
                  <td>{position.position}</td>
                  <td>{position.nickname}</td>
                  <td>{position.firstname + (
                    position.middlename ? " " + position.middlename : "")
                    + " " + position.lastname
                  }</td>
                  <td>{position.time}</td>
                  <td>{position.crashes}</td>
                </tr>
              })
            }
          </tbody>
        </table>
      </main>
    </div>
  );
}
