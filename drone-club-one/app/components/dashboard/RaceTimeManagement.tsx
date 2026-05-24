"use client";

import { addPilotTimeAction, editPilotTimeAction } from "@/app/data/actions";
import { getTimesForRace } from "@/app/data/queries/pilotRace";
import { LeaderbaordEntryType, PilotTableType } from "@/app/data/types";
import { Edit, Plus, Save, Trophy, X } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { set } from "zod";

export default function RaceTimeManagement({ pilots, races }: { pilots: PilotTableType[], races: { id: number, title: string }[] }) {
    const [selectedRace, setSelectedRace] = useState("");
    const [showAddEntry, setShowAddEntry] = useState(false);
    const [newEntry, setNewEntry] = useState({ pilotId: "", time: "", crashes: "0" });
    const [leaderboard, setLeaderboard] = useState<LeaderbaordEntryType[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editEntry, setEditEntry] = useState({ time: "", crashes: "" });
    const [isPendingAddEntry, setIsPendingAddEntry] = useState(false);
    const [isPendingEditEntry, setIsPendingEditEntry] = useState(false);

    const [isPending, startTransition] = useTransition();

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditEntry({ time: "", crashes: "" });
    }

    const refreshLeaderboard = async () => {
        setLeaderboard([]); // Clear current leaderboard to show loading stat
        startTransition(async () => {
            const data = await getTimesForRace(Number(selectedRace));
            setLeaderboard(data);
        });
    }

    const handleSubmitAddEntry: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        console.log("Submitting pilot' time form with data:", event);
        event.preventDefault();
        setIsPendingAddEntry(true);
        try {
            const submittedFormData = new FormData(event.currentTarget);
            await addPilotTimeAction(submittedFormData);
            await refreshLeaderboard();
        } catch (error) {
            console.error("Error adding pilot time:", error);
            alert("Unable to add pilot time right now. Check server logs for details.");
        } finally {
            setIsPendingAddEntry(false);
        }
    }


    const handleSubmitEditEntry: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        console.log("Submitting pilot' time form with edit data:", event);
        event.preventDefault();
        setIsPendingEditEntry(true);
        try {
            const submittedFormData = new FormData(event.currentTarget);
            await editPilotTimeAction(submittedFormData);
            await refreshLeaderboard();
        } catch (error) {
            console.error("Error editing pilot time:", error);
            alert("Unable to edit pilot time right now. Check server logs for details.");
        } finally {
            setIsPendingEditEntry(false);
        }
    }

    useEffect(() => {
        if (selectedRace) {
            refreshLeaderboard();
        }
    }, [selectedRace]);

    return (
        <div >
            <h2 className="text-2xl mb-6">Race Time Management</h2>

            <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <label htmlFor="raceId" className="block mb-2">Select Race</label>
                <select
                    id="raceId"
                    name="raceId"
                    value={selectedRace || ""}
                    onChange={(e) => setSelectedRace(e.target.value)}
                    className="w-full max-w-md px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                >
                    <option value="">Choose a race...</option>
                    {races.map(race => (
                        <option key={race.id} value={race.id}>{race.title}</option>
                    ))}
                </select>
            </div>

            {selectedRace && (
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between p-4 bg-secondary border-b border-border">
                        <h3 className="text-xl">Leaderboard</h3>
                        {!showAddEntry && (
                            <button
                                onClick={() => setShowAddEntry(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                <Plus className="w-4 h-4" />
                                Add Entry
                            </button>
                        )}
                    </div>

                    {showAddEntry && (
                        <form
                            onSubmit={handleSubmitAddEntry}
                            className="p-4 bg-secondary/50 border-b border-border overflow-x-auto grid grid-cols-4 gap-4 min-w-150"
                        >
                            <input
                                type="hidden"
                                id="raceId"
                                name="raceId"
                                value={selectedRace}
                            />
                            <div>
                                <label htmlFor="pilotId" className="block mb-2 text-sm">Pilot</label>
                                <select
                                    value={newEntry.pilotId}
                                    id="pilotId"
                                    name="pilotId"
                                    onChange={(e) => setNewEntry({ ...newEntry, pilotId: e.target.value })}
                                    className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                >
                                    <option value="">Select pilot...</option>
                                    {pilots.map(pilot => (
                                        <option key={pilot.id} value={pilot.id}>
                                            {`${pilot.nickname} (${pilot.firstname}${pilot.middlename ? " " + pilot.middlename : ""} ${pilot.lastname})`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="time" className="block mb-2 text-sm">Time</label>
                                <input
                                    type="number"
                                    id="time"
                                    name="time"
                                    value={newEntry.time}
                                    onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                                    className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-mono"
                                    placeholder="1:23.456"
                                />
                            </div>
                            <div>
                                <label htmlFor="crashes" className="block mb-2 text-sm">Crashes</label>
                                <input
                                    type="number"
                                    id="crashes"
                                    name="crashes"
                                    min="0"
                                    value={newEntry.crashes}
                                    onChange={(e) => setNewEntry({ ...newEntry, crashes: e.target.value })}
                                    className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                            <div className="flex items-end gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
                                >
                                    {
                                        !isPendingAddEntry ?
                                            <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={24} height={24} className="opacity-50 mx-auto animate-spin" />
                                            :
                                            <Save className="w-6 h-6 mx-auto" />
                                    }
                                </button>
                                <button
                                    type="reset"
                                    onClick={() => {
                                        setShowAddEntry(false);
                                        setNewEntry({ pilotId: "", time: "", crashes: "0" });
                                    }}
                                    className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors"
                                >
                                    <X className="w-6 h-6 mx-auto" />
                                </button>
                            </div>
                        </form>
                    )}

                    <table className="w-full">
                        <thead>
                            <tr className="bg-secondary border-b border-border">
                                <th className="p-4 text-muted-foreground tracking-wide">POS</th>
                                <th className="p-4 text-muted-foreground tracking-wide text-left">PILOT</th>
                                <th className="p-4 text-muted-foreground tracking-wide">TIME</th>
                                <th className="p-4 text-muted-foreground tracking-wide">CRASHES</th>
                                <th className="p-4 text-muted-foreground tracking-wide">ACTIONS</th>
                            </tr>
                        </thead>

                        {leaderboard.length !== 0 && (
                            <tbody
                                className="p-4 border-b border-border last:border-b-0"
                            >
                                {leaderboard.map((entry, index) => {
                                    return editingIndex === index ? (
                                        <tr key={index}>
                                            <td className="p-4 col-span-5">
                                                <form
                                                    onSubmit={handleSubmitEditEntry}
                                                    id={`edit-form-${index}`}
                                                >
                                                    <input type="hidden" id="pilotId" name="pilotId" value={entry.id} />
                                                    <input type="hidden" id="raceId" name="raceId" value={selectedRace} />
                                                </form>
                                                <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                                                    <span className={index === 0 ? "text-accent" : ""}>{index + 1}</span>
                                                    {index === 0 && <Trophy className="w-4 h-4 text-accent" />}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="font-bold">{`${entry.nickname} `}</span>
                                                <span className="text-muted-foreground">{`(${entry.firstname}${entry.middlename ? " " + entry.middlename : ""} ${entry.lastname})`}</span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex justify-center">
                                                    <input
                                                        form={`edit-form-${index}`}
                                                        type="number"
                                                        id="time"
                                                        name="time"
                                                        value={editEntry.time}
                                                        onChange={(e) => setEditEntry({ ...editEntry, time: e.target.value })}
                                                        className="h-8 px-2 py-1 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent font-mono"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="p-4 flex justify-center">
                                                    <input
                                                        form={`edit-form-${index}`}
                                                        type="number"
                                                        id="crashes"
                                                        name="crashes"
                                                        min="0"
                                                        value={editEntry.crashes}
                                                        onChange={(e) => setEditEntry({ ...editEntry, crashes: e.target.value })}
                                                        className="h-8 px-2 py-1 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent"
                                                    />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                                                    <button
                                                        form={`edit-form-${index}`}
                                                        type="submit"
                                                        className="px-3 py-1 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity"
                                                    >
                                                        {
                                                            isPendingEditEntry ?
                                                                <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={24} height={24} className="opacity-50 mx-auto animate-spin" />
                                                                :
                                                                <Save className="w-4 h-6" />
                                                        }
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="px-3 py-1 bg-secondary text-foreground rounded hover:bg-muted transition-colors"
                                                    >
                                                        <X className="w-4 h-6" />
                                                    </button>
                                                </div>

                                            </td>
                                        </tr>
                                    ) : (
                                        <tr key={index}>
                                            <td className="p-4 flex items-center justify-center gap-2">
                                                <span className={index === 0 ? "text-accent" : ""}>{index + 1}</span>
                                                {index === 0 && <Trophy className="w-4 h-4 text-accent" />}
                                            </td>
                                            <td className="p-4">
                                                <span className="font-bold">{`${entry.nickname} `}</span>
                                                <span className="text-muted-foreground">{`(${entry.firstname}${entry.middlename ? " " + entry.middlename : ""} ${entry.lastname})`}</span>
                                            </td>
                                            <td className="p-4 text-center font-mono">{entry.time}</td>
                                            <td className="p-4 text-center">{entry.crashes}</td>
                                            <td className="p-4 flex justify-center">
                                                <button
                                                    onClick={() => {
                                                        setEditEntry({
                                                            time: entry.time.toString(),
                                                            crashes: entry.crashes.toString()
                                                        }); setEditingIndex(index)
                                                    }}
                                                    className="px-3 py-1 bg-secondary text-foreground rounded hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        )}
                    </table>
                    {!isPending && leaderboard.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                            No entries yet. Add the first entry above.
                        </div>
                    )}
                    {isPending && <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={48} height={48} className="opacity-50 mx-auto my-16 animate-spin" />}
                </div>
            )
            }
        </div >
    );
}