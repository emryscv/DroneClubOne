"use client"
import { Edit, LogOut, Plus } from "lucide-react";
import TitleBorder from "../components/TitleBorder";
import { useEffect, useState } from "react";
import AddPilotModal from "../components/dashboard/AddPilotModal";
import EditPilotModal from "../components/dashboard/EditPilotModal";
import AddRaceModal from "../components/dashboard/AddRaceModal";
import EditRaceModal from "../components/dashboard/EditRaceModal";
import { signOutAction } from "../data/actions";
import RaceTimeManagement from "../components/dashboard/RaceTimeManagement";
import { PilotTableType } from "../data/types";
import Image from "next/image";
import ErrorPage from "../error";

export default function Dashboard() {
    const [pilots, setPilots] = useState<PilotTableType[]>([]);
    const [races, setRaces] = useState<{ id: number, title: string }[]>([]);
    const [showAddPilot, setShowAddPilot] = useState(false);
    const [showAddRace, setShowAddRace] = useState(false);
    const [showEditPilot, setShowEditPilot] = useState(false);
    const [showEditRace, setShowEditRace] = useState(false);

    const [isPendingPilot, setIsPendingPilot] = useState(false);
    const [isPendingRace, setIsPendingRace] = useState(false);
    const [error, setError] = useState<Error | null>(null);


    const refreshPilots = async () => {
        setIsPendingPilot(true);
        try {
            const res = await fetch("/api/refreshPilots");

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.error ?? "Error refreshing pilots");
            }

            const data = await res.json();
            setPilots(data);
        }
        catch (error) {
            setError(error instanceof Error ? error : new Error("Error refreshing pilots"));
        }
        finally {
            setIsPendingPilot(false);
        }
    }

    const refreshRaces = async () => {
        setIsPendingRace(true);
        try {
            const res = await fetch("/api/refreshRaces");

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.error ?? "Error refreshing races");
            }

            const data = await res.json();
            setRaces(data);
        }
        catch (error) {
            setError(error instanceof Error ? error : new Error("Error refreshing races"));
        }
        finally {
            setIsPendingRace(false);
        }
    }

    useEffect(() => {
        refreshPilots()
        refreshRaces()
    }, []);

    if (error) {
        return <ErrorPage error={error} unstable_retry={() => window.location.reload()} />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-22">
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
                        className={`bg-card border-2 border-border rounded-lg p-6 ${isPendingPilot ? "" : "hover:border-accent cursor-pointer"} transition-colors text-left relative`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Edit className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-xl">Edit Pilot Info</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Modify existing pilot information</p>
                        {isPendingPilot && <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500/30 border-2 border-border">
                            <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={48} height={48} className="opacity-50 animate-spin" />
                        </div>}
                    </button>

                    <button
                        onClick={() => setShowEditRace(true)}
                        className={`bg-card border-2 border-border rounded-lg p-6 ${isPendingRace ? "" : "hover:border-accent cursor-pointer"} transition-colors text-left relative`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Edit className="w-6 h-6 text-accent" />
                            </div>
                            <h3 className="text-xl">Edit Race Info</h3>
                        </div>
                        <p className="text-muted-foreground text-sm">Update race details and status</p>
                        {isPendingRace && <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-500/30 border-2 border-border">
                            <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={48} height={48} className="opacity-50 animate-spin" />
                        </div>}
                    </button>
                </div>
            </div>
            {
                isPendingPilot || isPendingRace ?
                    <div>
                        <h2 className="text-2xl mb-6">Race Time Management</h2>
                        <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={48} height={48} className="opacity-50 mx-auto animate-spin" />
                    </div>
                    :
                    <RaceTimeManagement pilots={pilots} races={races} />
            }
            <AddPilotModal isOpen={showAddPilot} onClose={() => setShowAddPilot(false)} refreshPilots={refreshPilots} />
            <AddRaceModal isOpen={showAddRace} onClose={() => setShowAddRace(false)} refreshRaces={refreshRaces} />
            <EditPilotModal isOpen={showEditPilot} onClose={() => setShowEditPilot(false)} pilots={pilots} refreshPilots={refreshPilots} />
            <EditRaceModal isOpen={showEditRace} onClose={() => setShowEditRace(false)} races={races} refreshRaces={refreshRaces} />
        </div>
    );
}