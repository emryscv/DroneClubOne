import { PilotTableType } from "../data/types";
import TitleBorder from "./TitleBorder";
import Image from "next/image";

export default function PilotCard({ pilotData }: { pilotData: PilotTableType }) {
    console.log("pilotData", pilotData);
    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
            <Image
                src={pilotData.pictureurl ? pilotData.pictureurl : "/default-avatar.png"}
                alt={`${pilotData.nickname} profile picture`}
                width={1024}
                height={1024}
                className="aspect-square"
            />

            <div className="p-6">
                <div className="flex items-center justify-between">
                    <TitleBorder size="small">{pilotData.nickname}</TitleBorder>

                    <span className={`inline-block px-3 py-1 rounded-full text-sm uppercase tracking-wide ${pilotData.status === "active" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                        }`}>
                        {pilotData.status}
                    </span>
                </div>
                <div className="flex flex-col mt-4">
                    <span className="text-accent">Full Name</span>
                    <span className="text-xl">{`${pilotData.firstname}${pilotData.middlename ? " " + pilotData.middlename : ""} ${pilotData.lastname}`}</span>
                </div>
            </div>
        </div>
    );
}