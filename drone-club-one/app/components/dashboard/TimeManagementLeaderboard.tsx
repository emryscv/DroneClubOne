import { editPilotTimeAction } from "@/app/data/actions";
import { getTimesForRace } from "@/app/data/queries/pilotRace";
import { LeaderbaordEntryType } from "@/app/data/types";
import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Edit, Save, Trophy, X } from "lucide-react";

interface TimeManagementLeaderboardProps {
    selectedRaceId: number;
    refreshTrigger: number;
}

export default function TimeManagementLeaderboard({ selectedRaceId, refreshTrigger }: TimeManagementLeaderboardProps) {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editEntry, setEditEntry] = useState({ time: "", crashes: "" });
    const [isPendingEditEntry, setIsPendingEditEntry] = useState(false);
    const [leaderboard, setLeaderboard] = useState<LeaderbaordEntryType[]>([]);
    const [isPending, setIsPending] = useState(false);

    const refreshLeaderboard = async () => {
        setLeaderboard([]);
        try {
            setIsPending(true);
            const data = await getTimesForRace(selectedRaceId);
            setLeaderboard(data);
        } catch (error) {
            toast.error("Unable to load leaderboard. Check server logs for details.");
        } finally {
            setIsPending(false);
        }
    }

    useEffect(() => {
        if (selectedRaceId > 0) {
            refreshLeaderboard();
        }
    }, [selectedRaceId, refreshTrigger]);

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditEntry({ time: "", crashes: "" });
    }

    const handleSubmitEditEntry: React.SubmitEventHandler<HTMLFormElement> = async (event) => {
        console.log("Submitting pilot' time form with edit data:", event);
        event.preventDefault();
        setIsPendingEditEntry(true);
        try {
            const submittedFormData = new FormData(event.currentTarget);
            const result = await editPilotTimeAction(submittedFormData);

            if (result === 'error') {
                toast.error("Unable to edit pilot time right now. Check server logs for details.");
            } else {
                await refreshLeaderboard();
            }
        } catch (error) {
            console.error("Error editing pilot time:", error);
            toast.error("Unable to edit pilot time right now. Check server logs for details.");
        } finally {
            setIsPendingEditEntry(false);
            setEditingIndex(null);
        }
    }

    return (
        <>
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
                                            <input type="hidden" id="raceId" name="raceId" value={selectedRaceId} />
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
                                                type="text"
                                                id="time"
                                                name="time"
                                                inputMode="decimal"
                                                pattern="^([0-9]+:)?[0-5]?[0-9]\.[0-9]{3}$"
                                                title="Use m:ss.SSS or mm:ss.SSS"
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
            {
                !isPending && leaderboard.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                        No entries yet. Add the first entry above.
                    </div>
                )
            }
            {isPending && <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={48} height={48} className="opacity-50 mx-auto my-16 animate-spin" />}
        </>
    );
}