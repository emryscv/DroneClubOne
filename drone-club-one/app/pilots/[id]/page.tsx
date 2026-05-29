import { TrendingUp } from "lucide-react";
import PilotCardServer from "@/app/components/PilotCardServer";
import { Suspense } from "react";
import PilotCardSkeleton from "@/app/components/skeletons/PilotCardSkeleton";
import RaceHistory from "@/app/components/RaceHistory";
import RaceHistorySkeleton from "@/app/components/skeletons/RaceHistorySkeleton";

export default async function Pilot({ params }: { params: { id: number } }) {
    const { id } = await params;

    return (
        <div className="grid md:grid-cols-3 gap-8 mb-12 pt-32">
            <Suspense fallback={<PilotCardSkeleton />}>
                <PilotCardServer pilotId={id} />
            </Suspense>

            <div className="md:col-span-2">
                <h2 className="text-2xl mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-accent" />
                    Race History
                </h2>


                <Suspense fallback={<RaceHistorySkeleton pilotId={id} />}>
                    <RaceHistory pilotId={id} />
                </Suspense>
            </div>
        </div>
    );
}