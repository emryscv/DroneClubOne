"use client"
import { useRef, useState } from "react";
import { insertPilot } from "../data/queries";
import { upload } from "@vercel/blob/client";
import { PutBlobResult } from "@vercel/blob";

export default function Page() {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard!</p>

            <h3>Add new pilot</h3>
            <form action={insertPilot} onSubmit={
                async (e) => {
                    e.preventDefault();

                    if (!inputFileRef.current?.files) {
                        throw new Error('No file selected');
                    }

                    const file = inputFileRef.current.files[0];

                    const newBlob = await upload(file.name, file, {
                        access: 'private' /* or 'public' */,
                        handleUploadUrl: '/dashboard/api',
                    });

                    setBlob(newBlob);
                }
            }>
                <input name="file" ref={inputFileRef} type="file" required />
                <input type="text" placeholder="Nickname" name="nickname" className="border p-2 mb-2" />
                <input type="text" placeholder="First Name" name="firstname" className="border p-2 mb-2" />
                <input type="text" placeholder="Middle Name" name="middlename" className="border p-2 mb-2" />
                <input type="text" placeholder="Last Name" name="lastname" className="border p-2 mb-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add Pilot</button>
            </form>
            {blob && (
                <div>
                    Blob url: <a href={blob.url}>{blob.url}</a>
                </div>
            )}
        </div>
    );
}