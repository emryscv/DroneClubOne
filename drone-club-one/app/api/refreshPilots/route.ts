import { getPilots } from "@/app/data/queries/pilots";

export async function GET() {
    try {
        console.log("Refreshing pilots...");
        const data = await getPilots();
        return Response.json(data, { status: 200 });
    }
    catch (error) {
        console.error("Error refreshing pilots:", error);
        return Response.json(
            {
                error: "Error refreshing pilots",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}
