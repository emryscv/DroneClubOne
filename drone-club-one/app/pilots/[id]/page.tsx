import { getPilot } from "@/app/data/queries";

export default async function Pilot({ params }: { params: { id: string } }) {
    const { id } = await params;
    const data = await getPilot(parseInt(id));

    return <div>
        <h1>{data[0].nickname}</h1>
        <p>{data[0].firstname} {data[0].middlename} {data[0].lastname}</p>
        <p>{data[0].status}</p>
    </div>
}