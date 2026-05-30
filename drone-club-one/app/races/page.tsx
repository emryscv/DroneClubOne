"use client";

import { CalendarCheck, CalendarFold, MapPin, Search } from "lucide-react";
import RaceCard from "../components/RaceCard";
import TitleBorder from "../components/TitleBorder";
import { getLocations, getRaces } from "../data/queries/races";
import { RaceTableType } from "../data/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import ErrorPage from "../error";
import { refresh } from "next/cache";

export default function Races() {
    const [racesData, setRacesData] = useState<RaceTableType[]>([]);
    const [filteredRaces, setFilteredRaces] = useState<RaceTableType[]>([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [locations, setLocations] = useState<string[]>([]);

    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedYear, setSelectedYear] = useState(2026);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setIsLoading(true);
        getRaces(selectedYear).then((data) => {
            setRacesData(data);
            setIsLoading(false);
        }).catch((error) => {
            setError(error);
            setIsLoading(false);
        });
        getLocations().then((data) => {
            setLocations(data);
        }).catch((error) => {
            setError(error);
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
        if (selectedStatus !== "") {
            filteredRaces = filteredRaces.filter((race) =>
            (race.isupcoming && selectedStatus === "upcoming" ||
                !race.isupcoming && selectedStatus === "Completed"));
        }

        setFilteredRaces(filteredRaces);
    }, [searchQuery, selectedLocation, selectedStatus, racesData]);

    if(error){
        return <ErrorPage error={error} unstable_retry={() => window.location.reload()}/>;
    }

    return (
        <>
            <div className="mb-8 pt-22">
                <TitleBorder>Races</TitleBorder>
                <p className="text-muted-foreground mt-4">All past and upcoming drone racing events</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 w-full gap-6">
                    <div className="relative">
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
                    <div className="relative">
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
                    <div className="grid grid-cols-2 gap-6">
                        <div className="relative">
                            <CalendarCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
                            <select
                                id="status"
                                name="status"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                                <option value="">Filter by Status</option>
                                <option value="Completed">Completed</option>
                                <option value="upcoming">Upcoming</option>
                            </select>
                        </div>
                        <div className="relative">
                            <CalendarFold className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-accent" />
                            <select
                                id="year"
                                name="year"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                                <option value="2026">2026</option>
                            </select>
                        </div>
                    </div>
                </div >
            </div>
            {isLoading ? (
                <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={48} height={48} className="opacity-50 mx-auto mt-32 animate-spin" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-16">
                    {filteredRaces.map((race: RaceTableType, i: number) => (
                        <RaceCard key={i} race={race} />
                    )
                    )}
                </div>
            )}
            {!isLoading && filteredRaces.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No races found
                </div>
            )}

        </>);
}