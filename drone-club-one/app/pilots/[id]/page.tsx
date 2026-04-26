import { getPilot } from "@/app/data/queries";

export default async function Pilot({ params }: { params: { id: string } }) {
    const { id } = await params;
    const data = await getPilot(parseInt(id));

    return <div>
        <h1>{data.nickname}</h1>
        <p>{data.firstname} {data.middlename} {data.lastname}</p>
        <p>{data.status}</p>
    </div>
}