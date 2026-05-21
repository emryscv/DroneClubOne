import { getRaceNamesAndIDs } from "@/app/data/queries/races";

export async function GET() {
    try {
        console.log("Refreshing races...");
        const data = await getRaceNamesAndIDs();
        return Response.json(data);
    }
    catch (error) {
        return Response.json({ error: "Error refreshing races" }, { status: 500 });
    }
}
