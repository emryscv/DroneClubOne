"use client"
import { Edit, LogOut, Plus } from "lucide-react";
import TitleBorder from "../components/TitleBorder";
import { useState } from "react";
import AddPilotModal from "../components/dashboard/AddPilotModal";
import AddRaceModal from "../components/dashboard/AddRaceModal";
import EditPilotModal from "../components/dashboard/EditPilotModal";
import EditRaceModal from "../components/dashboard/EditRaceModal";
import { useRouter } from "next/navigation";
import { signOutAction } from "../data/actions";
import RaceTimeManagement from "../components/dashboard/RaceTimeManagement";
import { PilotTableType } from "../data/types";

export default function Dashboard({ pilots, races }: { pilots: PilotTableType[], races: { id: number, title: string }[] }) {
    const router = useRouter();

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

            <RaceTimeManagement pilots={pilots} races={races} />

            <AddPilotModal isOpen={showAddPilot} onClose={() => setShowAddPilot(false)} />
            <AddRaceModal isOpen={showAddRace} onClose={() => setShowAddRace(false)} />
            <EditPilotModal isOpen={showEditPilot} onClose={() => setShowEditPilot(false)} pilots={pilots} />
            <EditRaceModal isOpen={showEditRace} onClose={() => setShowEditRace(false)} />
        </div>
    );
}