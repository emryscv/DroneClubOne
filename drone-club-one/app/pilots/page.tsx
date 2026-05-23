"use client";
import TitleBorder from "../components/TitleBorder";
import { getPilots } from "../data/queries/pilots";
import PilotCard from "../components/PilotCard";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { PilotTableType } from "../data/types";
import Image from "next/image";

export default function Pilots() {
    const [pilotsList, setPilotsList] = useState<PilotTableType[]>([]);
    const [filteredPilots, setFilteredPilots] = useState<PilotTableType[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getPilots().then((data) => {
            setPilotsList(data);
            setIsLoading(false);
        });
    }, [])

    useEffect(() => {
        if (searchQuery !== "") {
            setFilteredPilots(
                pilotsList.filter((pilot) =>
                    pilot.nickname.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                    pilot.firstname.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                    pilot.middlename?.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()) ||
                    pilot.lastname.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
                )
            )
        } else {
            setFilteredPilots(pilotsList);
        }
    }, [searchQuery, pilotsList]);

    return <>
        <div className="mb-8">
            <TitleBorder>Pilots</TitleBorder>
            <p className="text-muted-foreground mt-4">All registered pilots</p>

            <div className="relative max-w-md mt-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search pilots..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div>
        </div>

        {isLoading ? (
            <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={48} height={48} className="opacity-50 mx-auto mt-32 animate-spin" />
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-16">
                {filteredPilots.map((pilot) => (
                    <PilotCard key={pilot.id} pilotData={pilot} />
                ))}
            </div>
        )}

        {filteredPilots.length === 0 && !isLoading && (
            <div className="text-center py-12 text-muted-foreground">
                No pilots found matching "{searchQuery}"
            </div>
        )}
    </>
}