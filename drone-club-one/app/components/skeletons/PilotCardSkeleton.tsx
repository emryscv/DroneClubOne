import Loading from "@/app/(home)/loading";
import TitleBorder from "@/app/components/TitleBorder";
import Image from "next/image";

export default function PilotCardSkeleton() {
    return (
        <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="aspect-square flex items-center">
                <Image src="/Spinner-Gradient-1.png" alt="Loading..." width={48} height={48} className="opacity-50 mx-auto animate-spin" />
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <TitleBorder size="small">Loading ...</TitleBorder>

                    <span className={`inline-block px-3 py-1 rounded-full text-sm uppercase tracking-wide bg-secondary text-muted-foreground`}>
                        Loading ...
                    </span>
                </div>
                <div className="flex flex-col mt-4">
                    <span className="text-accent">Full Name</span>
                    <span className="text-xl">Loading ...</span>
                </div>
            </div>
        </div>
    );
}