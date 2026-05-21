import { getPilots } from "@/app/data/queries/pilots";

export async function GET() {
    try {
        console.log("Refreshing pilots...");
        const data = await getPilots();
        return Response.json(data);
    }
    catch (error) {
        return Response.json({ error: "Error refreshing races" }, { status: 500 });
    }
}
