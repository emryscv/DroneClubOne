"use client";
import { useRouter } from "next/navigation";
import { PilotTableType } from "../data/types";
import TitleBorder from "./TitleBorder";
import Image from "next/image";

export default function PilotCard({ pilotData, isLink = true }: { pilotData: PilotTableType, isLink?: boolean }) {
    const router = useRouter();
    console.log("pilotData", pilotData);
    return (
        <div
            onClick={() => isLink && router.push(`pilots/${pilotData.id}`)}
            className={`bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-colors ${isLink ? "cursor-pointer" : ""}`}
        >
            <div className="md:col-span-1 bg-card border border-border rounded-lg overflow-hidden">
                {//<div className="aspect-square bg-secondary flex items-center justify-center">
                    //<Image className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-6xl text-accent">
                
                <Image 
                    src={pilotData.pictureurl ? pilotData.pictureurl : "/default-avatar.png"} 
                    alt={`${pilotData.nickname} profile picture`} 
                    width={1024}
                    height={1024}
                    />
                
                    // </div>
                }

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
        </div>);
}