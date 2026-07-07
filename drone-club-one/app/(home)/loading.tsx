import TitleBorder from "../components/TitleBorder";
import Image from "next/image";

export default function Loading() {
    return (
        <>
            <div className="mb-8 pt-22">
                <TitleBorder>Current Race Leaderboard</TitleBorder>
                <p className="text-muted-foreground mt-4">Loading ...</p>
            </div>

            <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={48} height={48} className="opacity-50 mx-auto mb-16 animate-spin" />

        </>
    );
}