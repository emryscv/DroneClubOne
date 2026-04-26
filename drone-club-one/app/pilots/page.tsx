import { getPilots } from "../data/queries";

export default async function Pilots() {
    const pilots = await getPilots();
    return <div>
        <h2>Pilots</h2>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nickname</th>
                    <th>Fullname</th>
                </tr>
            </thead>
            <tbody className="text-black">
                {pilots.map(pilot => <tr key={pilot.id}>
                    <td>{pilot.id}</td>
                    <td>{pilot.nickname}</td>
                    <td>{pilot.firstname} {pilot.middlename} {pilot.lastname}</td>
                </tr>)}
            </tbody>
        </table>
    </div>
}