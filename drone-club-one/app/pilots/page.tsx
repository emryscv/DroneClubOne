import { Search } from "lucide-react";
import TitleBorder from "../components/TitleBorder";
import { getPilots } from "../data/queries/pilots";
import PilotCard from "../components/PilotCard";

export default async function Pilots() {
    const pilotsList = await getPilots();

    return <>
        <div className="mb-8">
            <TitleBorder>Pilots</TitleBorder>
            <p className="text-muted-foreground mt-4">All registered pilots</p>

            {/* <div className="relative max-w-md mt-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search pilots..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
            </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-16">
            {pilotsList.map((pilot) => (
                <PilotCard key={pilot.id} pilotData={pilot} />
            ))}
        </div>

        {/* {filteredPilots.length === 0 && (
        //     <div className="text-center py-12 text-muted-foreground">
        //         No pilots found matching "{searchQuery}"
        //     </div>
        // )} */}
    </>
}