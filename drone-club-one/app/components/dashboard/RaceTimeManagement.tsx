"use client";
import { addPilotTimeAction } from "@/app/data/actions";
import { Plus, X, Save } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { PilotTableType } from "@/app/data/types";
import TimeManagementLeaderboard from "./TimeManagementLeaderboard";

export default function RaceTimeManagement({ pilots, races }: { pilots: PilotTableType[], races: { id: number, title: string }[] }) {
    const [selectedRaceId, setSelectedRaceId] = useState(0);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const [showAddEntry, setShowAddEntry] = useState(false);
    const [newEntry, setNewEntry] = useState({ pilotId: "", time: "", crashes: "0", fullName: "" });
    const [isPendingAddEntry, setIsPendingAddEntry] = useState(false);

    const handleSubmitAddEntry: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        console.log("Submitting pilot' time form with data:", event);
        event.preventDefault();
        setIsPendingAddEntry(true);

        try {
            const submittedFormData = new FormData(event.currentTarget);
            const result = await addPilotTimeAction(submittedFormData);
            if (result === 'duplicate') {
                toast.error("This pilot already has a time for this race.");
            } else if (result === 'error') {
                toast.error("Unable to add pilot time right now. Check server logs for details.");
            } else {
                setNewEntry({ pilotId: "", time: "", crashes: "0", fullName: "" });
                setShowAddEntry(false);
                setRefreshTrigger(prev => prev + 1);
                toast.success("Pilot time added successfully!");
            }
        } catch (error) {
            console.error("Error adding pilot time:", error);
            toast.error("Unable to add pilot time right now. Check server logs for details.");
        } finally {
            setIsPendingAddEntry(false);
        }
    }

    const handleSelectPilot: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewEntry({ ...newEntry, fullName: e.target.value });
        console.log("Selected pilot name:", e.target.value);
        const pilot = pilots.find(p => p.nickname === e.target.value.split(" ")[0]);
        if (pilot) {
            setNewEntry({ ...newEntry, pilotId: pilot.id.toString() });
        }
    }

    const handleSelectRace: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        if (e.target.value !== "") {
            const race = races.find(p => p.title === e.target.value);
            if (race) {
                setSelectedRaceId(race.id);
                
            }
        }
    }

    return (
        <div >
            <h2 className="text-2xl mb-6">Race Time Management</h2>

            <div className="bg-card border border-border rounded-lg p-6 mb-6">
                <label htmlFor="race" className="block mb-2">Select Race</label>

                <input
                    list="races"
                    name="race"
                    id="race"
                    required
                    placeholder="Search for a race"
                    onChange={handleSelectRace}
                    className="w-full max-w-md px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"

                />
                <datalist id="races">
                    {races.map(race => (
                        <option key={race.id} value={race.title} />
                    ))}
                </datalist>


            </div>

            {selectedRaceId > 0 && (
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
                                value={selectedRaceId}
                            />
                            <div>
                                <label htmlFor="pilotId" className="block mb-2 text-sm">Pilot</label>

                                <input type="hidden" name="pilotId" id="pilotId" value={newEntry.pilotId} />
                                <input
                                    list="pilots"
                                    name="pilot"
                                    id="pilot"
                                    required
                                    placeholder="Search for a Pilot"
                                    onChange={handleSelectPilot}
                                    className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                                <datalist
                                    id="pilots"
                                >
                                    {pilots.map(pilot => (
                                        <option key={pilot.id} value={`${pilot.nickname} (${pilot.firstname}${pilot.middlename ? " " + pilot.middlename : ""} ${pilot.lastname})`} />
                                    ))}
                                </datalist>
                            </div>
                            <div>
                                <label htmlFor="time" className="block mb-2 text-sm">Time</label>
                                <input
                                    type="text"
                                    id="time"
                                    name="time"
                                    inputMode="decimal"
                                    pattern="^([0-9]+:)?[0-5]?[0-9]\.[0-9]{3}$"
                                    title="Use m:ss.SSS or mm:ss.SSS"
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
                                        isPendingAddEntry ?
                                            <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={24} height={24} className="opacity-50 mx-auto animate-spin" />
                                            :
                                            <Save className="w-6 h-6 mx-auto" />
                                    }
                                </button>
                                <button
                                    type="reset"
                                    onClick={() => {
                                        setShowAddEntry(false);
                                        setNewEntry({ pilotId: "", time: "", crashes: "0", fullName: "" });
                                    }}
                                    className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors"
                                >
                                    <X className="w-6 h-6 mx-auto" />
                                </button>
                            </div>
                        </form>
                    )}

                    <TimeManagementLeaderboard selectedRaceId={selectedRaceId} refreshTrigger={refreshTrigger} />
                </div>
            )}
        </div>
    );
}