import { getRaceStatus } from "@/app/data/queries/races";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const raceId = Number(searchParams.get("raceId"));

    if (!raceId) {
        return Response.json(
            { error: "Missing or invalid raceId" },
            { status: 400 }
        );
    }

    try {
        console.log("Refreshing race status...");
        const data = await getRaceStatus(raceId);
        return Response.json(data, { status: 200 });
    }
    catch (error) {
        console.error("Error refreshing race status:", error);
        return Response.json(
            {
                error: "Error refreshing race status",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}
