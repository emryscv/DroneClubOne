"use client"
import { insertPilot } from "../data/queries";

export default function Page() {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard!</p>

            <h3>Add new pilot</h3>
            <form action={insertPilot}>
                <input type="text" placeholder="Nickname" name="nickname" className="border p-2 mb-2" />
                <input type="text" placeholder="First Name" name="firstname" className="border p-2 mb-2" />
                <input type="text" placeholder="Middle Name" name="middlename" className="border p-2 mb-2" />
                <input type="text" placeholder="Last Name" name="lastname" className="border p-2 mb-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Pilot</button>
            </form>
        </div>
    );
}