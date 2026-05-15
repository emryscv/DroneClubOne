"use client";

import { MapPin, Search } from "lucide-react";
import RaceCard from "../components/RaceCard";
import TitleBorder from "../components/TitleBorder";
import { getLocations, getRaces } from "../data/queries/races";
import { RaceTableType } from "../data/types";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function Races() {
    const [racesData, setRacesData] = useState<RaceTableType[]>([]);
    const [filteredRaces, setFilteredRaces] = useState<RaceTableType[]>([]);

    const [locations, setLocations] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");


    useEffect(() => {
        getRaces().then((data) => {
            setRacesData(data);
        });
        getLocations().then((data) => {
            setLocations(data);
        });
    }, []);

    useEffect(() => {
        let filteredRaces = [...racesData];
        if (selectedLocation !== "") {
            filteredRaces = filteredRaces.filter((race) => race.location == selectedLocation);
        }
        if (searchQuery !== "") {
            filteredRaces = filteredRaces.filter((race) => race.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setFilteredRaces(filteredRaces);
    }, [searchQuery, selectedLocation, racesData]);

    return (
        <>
            <div className="mb-8">
                <TitleBorder>Races</TitleBorder>
                <p className="text-muted-foreground mt-4">All past and upcoming drone racing events</p>
                <div className="flex mt-6 w-full gap-6">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
                        <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Search races..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    <div className="relative w-full max-w-md">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
                        <select
                            id="location"
                            name="location"
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                        >
                            <option value="">Filter by Location</option>
                            {locations.map((location, i) => (
                                <option key={i} value={location}>{location}</option>
                            ))}
                        </select>
                    </div>
                </div >
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-16">
                {filteredRaces.map((race: RaceTableType, i: number) => (
                    <RaceCard key={i} race={race} />
                ))}
            </div>
            {filteredRaces.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No races found matching "{searchQuery}"
                </div>
            )}
        </>);
}