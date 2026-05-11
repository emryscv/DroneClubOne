"use client"
import { Edit, LogOut, Plus, Save, Trophy, X } from "lucide-react";
import TitleBorder from "../components/TitleBorder";
import { useState } from "react";
import AddPilotModal from "../components/dashboard/AddPilotModal";
import AddRaceModal from "../components/dashboard/AddRaceModal";
import EditPilotModal from "../components/dashboard/EditPilotModal";
import EditRaceModal from "../components/dashboard/EditRaceModal";
import { useRouter } from "next/navigation";
import { signOutAction } from "../data/actions";

export default function Page() {
    const router = useRouter();
    const handleLogout = () => { router.push("/") }; //Add actual logout logic here

    const [showAddPilot, setShowAddPilot] = useState(false);
    const [showAddRace, setShowAddRace] = useState(false);
    const [showEditPilot, setShowEditPilot] = useState(false);
    const [showEditRace, setShowEditRace] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-8 flex items-center justify-between">
                <TitleBorder>Admin Dashboard</TitleBorder>
                <form
                    action={signOutAction}
                >
                    < button
                        className="flex items-center gap-2 px-4 py-2 bg-destructive text-white rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </form >
            </div>

            <div className="mb-12">
                <h2 className="text-2xl mb-6">Management Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <button
                        onClick={() => setShowAddPilot(true)}
                        className="bg-card border-2 border-border rounded-lg p-6 hover:border-accent transition-colors text-left cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Plus className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-xl">Add New Pilot</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Register a new pilot to the club</p>
                    </button>

                    <button
                        onClick={() => setShowAddRace(true)}
                        className="bg-card border-2 border-border rounded-lg p-6 hover:border-accent transition-colors text-left cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Plus className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-xl">Add New Race</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Schedule a new racing event</p>
                    </button>

                    <button
                        onClick={() => setShowEditPilot(true)}
                        className="bg-card border-2 border-border rounded-lg p-6 hover:border-accent transition-colors text-left cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Edit className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-xl">Edit Pilot Info</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Modify existing pilot information</p>
                    </button>

                    <button
                        onClick={() => setShowEditRace(true)}
                        className="bg-card border-2 border-border rounded-lg p-6 hover:border-accent transition-colors text-left cursor-pointer"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Edit className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-xl">Edit Race Info</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Update race details and status</p>
                    </button>
                </div>
            </div>

            <div>
                <h2 className="text-2xl mb-6">Race Time Management</h2>

                <div className="bg-card border border-border rounded-lg p-6 mb-6">
                    <label className="block mb-2">Select Race</label>
                    <select
                        //value={selectedRace}
                        //onChange={(e) => handleRaceSelect(e.target.value)}
                        className="w-full max-w-md px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                        <option value="">Choose a race...</option>
                        {/*mockRaces.map(race => (
                            <option key={race.id} value={race.id}>{race.name}</option>
                        ))*/}
                    </select>
                </div>

                {/*selectedRace && (
                    <div className="bg-card border border-border rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between p-4 bg-secondary border-b border-border">
                            <h3 className="text-xl">Leaderboard</h3>
                            {!showAddEntry && (
                                <button
                                    onClick={() => setShowAddEntry(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Entry
                                </button>
                            )}
                        </div>

                        {showAddEntry && (
                            <div className="p-4 bg-secondary/50 border-b border-border overflow-x-auto">
                                <div className="grid grid-cols-4 gap-4 min-w-[600px]">
                                    <div>
                                        <label className="block mb-2 text-sm">Pilot</label>
                                        <select
                                            value={newEntry.pilotId}
                                            onChange={(e) => setNewEntry({ ...newEntry, pilotId: e.target.value })}
                                            className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                        >
                                            <option value="">Select pilot...</option>
                                            {mockPilots.map(pilot => (
                                                <option key={pilot.id} value={pilot.id}>{pilot.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm">Time</label>
                                        <input
                                            type="text"
                                            value={newEntry.time}
                                            onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                                            className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-mono"
                                            placeholder="1:23.456"
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm">Crashes</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={newEntry.crashes}
                                            onChange={(e) => setNewEntry({ ...newEntry, crashes: e.target.value })}
                                            className="w-full px-3 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                        />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <button
                                            onClick={handleAddEntry}
                                            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
                                        >
                                            <Save className="w-4 h-4 mx-auto" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowAddEntry(false);
                                                setNewEntry({ pilotId: "", time: "", crashes: "0" });
                                            }}
                                            className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors"
                                        >
                                            <X className="w-4 h-4 mx-auto" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <div className="grid grid-cols-5 gap-4 p-4 bg-secondary border-b border-border min-w-[700px]">
                                <div className="text-muted-foreground tracking-wide">POS</div>
                                <div className="text-muted-foreground tracking-wide">PILOT</div>
                                <div className="text-muted-foreground tracking-wide">TIME</div>
                                <div className="text-muted-foreground tracking-wide">CRASHES</div>
                                <div className="text-muted-foreground tracking-wide">ACTIONS</div>
                            </div>

                            {leaderboard.length === 0 ? (
                                <div className="p-8 text-center text-muted-foreground">
                                    No entries yet. Add the first entry above.
                                </div>
                            ) : (
                                leaderboard.map((entry, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-5 gap-4 p-4 border-b border-border last:border-b-0 min-w-[700px]"
                                    >
                                        {editingIndex === index ? (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <span>{index + 1}</span>
                                                    {index === 0 && <Trophy className="w-4 h-4 text-accent" />}
                                                </div>
                                                <div>{entry.pilotName}</div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        value={editEntry.time}
                                                        onChange={(e) => setEditEntry({ ...editEntry, time: e.target.value })}
                                                        className="w-full px-2 py-1 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent font-mono"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={editEntry.crashes}
                                                        onChange={(e) => setEditEntry({ ...editEntry, crashes: e.target.value })}
                                                        className="w-full px-2 py-1 bg-input-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-accent"
                                                    />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleSaveEdit}
                                                        className="px-3 py-1 bg-accent text-accent-foreground rounded hover:opacity-90 transition-opacity"
                                                    >
                                                        <Save className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={handleCancelEdit}
                                                        className="px-3 py-1 bg-secondary text-foreground rounded hover:bg-muted transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <span className={index === 0 ? "text-accent" : ""}>{index + 1}</span>
                                                    {index === 0 && <Trophy className="w-4 h-4 text-accent" />}
                                                </div>
                                                <div>{entry.pilotName}</div>
                                                <div className="font-mono">{entry.time}</div>
                                                <div>{entry.crashes}</div>
                                                <div>
                                                    <button
                                                        onClick={() => handleEditEntry(index)}
                                                        className="px-3 py-1 bg-secondary text-foreground rounded hover:bg-muted transition-colors flex items-center gap-2"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                        Edit
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )*/}
            </div>

            <AddPilotModal isOpen={showAddPilot} onClose={() => setShowAddPilot(false)} />
            <AddRaceModal isOpen={showAddRace} onClose={() => setShowAddRace(false)} />
            <EditPilotModal isOpen={showEditPilot} onClose={() => setShowEditPilot(false)} />
            <EditRaceModal isOpen={showEditRace} onClose={() => setShowEditRace(false)} />
        </div>
    );
}