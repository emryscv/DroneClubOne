"use client"
import UploadPictureForm from "@/app/components/UploadPictureForm";
import { getPilot } from "@/app/data/queries";
import { PilotTableType } from "@/app/data/types";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Pilot({ params }: { params: { id: string } }) {
    const [data, setData] = useState<PilotTableType | null>(null);
    const [toggleUpload, setToggleUpload] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPilot() {
            try {
                const { id } = await params;
                const pilotData = await getPilot(parseInt(id));
                setData(pilotData);
            } catch (error) {
                console.error('Error fetching pilot:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPilot();
    }, [params]);

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>Pilot not found</div>;

    return <div>
        <Image src={data.picture ?? "/default-avatar.png"} alt={data.nickname + "_avatar"} width={100} height={100} />
        <button onClick={() => setToggleUpload(!toggleUpload)}>Change Avatar</button>
        <h1>{data.nickname}</h1>
        <p>{data.firstname} {data.middlename} {data.lastname}</p>
        <p>{data.status}</p>

        {toggleUpload && <UploadPictureForm pilotId={data.id}/>}
    </div>
}