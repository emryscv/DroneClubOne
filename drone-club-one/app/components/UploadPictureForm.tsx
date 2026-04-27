"use client"

import { upload } from "@vercel/blob/client";
import { useRef } from "react";
import { uploadAvatar } from "../data/queries";


export default function UploadPictureForm({ pilotId }: { pilotId: number }) {
    const inputFileRef = useRef<HTMLInputElement>(null);

    return <form onSubmit={
        async (e) => {
            e.preventDefault();

            if (!inputFileRef.current?.files) {
                throw new Error('No file selected');
            }

            const file = inputFileRef.current.files[0];

            const newBlob = await upload(file.name, file, {
                access: 'public',
                handleUploadUrl: '/dashboard/api',
            });

            uploadAvatar(pilotId, newBlob.url);
        }
    }>
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Upload Avatar</button>
    </form>
}