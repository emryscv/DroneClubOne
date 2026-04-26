import { getPilot } from "@/app/data/queries";
import Image from "next/image";

export default async function Pilot({ params }: { params: { id: string } }) {
    const { id } = await params;
    const data = await getPilot(parseInt(id));

    return <div>
        <Image src={data.picture ?? "/default-avatar.png"} alt={data.nickname + "_avatar"} width={100} height={100} />
        <h1>{data.nickname}</h1>
        <p>{data.firstname} {data.middlename} {data.lastname}</p>
        <p>{data.status}</p>
    </div>
}