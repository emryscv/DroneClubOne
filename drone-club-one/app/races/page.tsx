import RaceCard from "../components/RaceCard";
import TitleBorder from "../components/TitleBorder";
import { getRaces } from "../data/queries/races";
import { RaceTableType } from "../data/types";

export default async function Races() {
    const racesData = await getRaces();
    console.log(racesData);

    return (
        <>
            <div className="mb-8">
                <TitleBorder>Races</TitleBorder>
                <p className="text-muted-foreground mt-4">All past and upcoming drone racing events</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
                {racesData.map((race: RaceTableType, i: number) => (
                    <RaceCard key={i} race={race} />
                ))}
            </div>
        </>);
}