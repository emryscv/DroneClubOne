import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Flag, Play, RotateCcw } from "lucide-react";

export default function ChangeStatusButton({ raceId }: { raceId: number }) {
    const [selectedRaceStatus, setSelectedRaceStatus] = useState<"UPCOMING" | "NEXT" | "CURRENT" | "COMPLETED" | null>(null);
    const [isPendingGetStatus, setIsPendingGetStatus] = useState(false);

    useEffect(() => {
        const fetchRaceStatus = async () => {
            setIsPendingGetStatus(true);
            try {
                const res = await fetch(`/api/raceStatus?raceId=${raceId}`);

                if (!res.ok) {
                    const body = await res.json().catch(() => null);
                    throw new Error(body?.error ?? "Error refreshing race status");
                }

                const data = await res.json();
                console.log("Fetched race status:", data);
                setSelectedRaceStatus(data.status);
                setIsPendingGetStatus(false);
            } catch (error) {
                toast.error("Unable to fetch race status right now. Check server logs for details.");
            }
        }
        fetchRaceStatus();
    }, [raceId]);

    return <>{selectedRaceStatus && (
        <button
            className={`shrink-0 flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-md  ${isPendingGetStatus || selectedRaceStatus === "UPCOMING" ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:opacity-90 transition-opacity"}`}
            disabled={isPendingGetStatus || selectedRaceStatus === "UPCOMING"}
        >
            {isPendingGetStatus &&
                <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={24} height={24} className="opacity-50 mx-auto animate-spin" />
            }
            {(selectedRaceStatus == "NEXT" || selectedRaceStatus == "UPCOMING") &&
                <>
                    <Play className="w-4 h-4" />
                    Start Race
                </>
            }
            {selectedRaceStatus == "CURRENT" &&
                <>
                    <Flag className="w-4 h-4" />
                    Finish Race
                </>
            }
            {selectedRaceStatus == "COMPLETED" &&
                <>
                    <RotateCcw className="w-4 h-4" />
                    Reopen Race
                </>
            }
        </button>
    )}
    </>
}