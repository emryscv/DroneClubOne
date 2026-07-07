import { Upload } from "lucide-react";
import { useEffect, useState } from "react";

export default function UploadPicture({ isProfilePicture, onFileChange, defaultPreviewUrl }: {isProfilePicture?: boolean, onFileChange: (file: File) => void, defaultPreviewUrl?: string | null}) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        setPreviewUrl(defaultPreviewUrl || null);
    }, [defaultPreviewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileChange(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    return <div>
        <label htmlFor="image" className="block mb-2 text-sm">{isProfilePicture ? "Profile Picture" : "Race Banner"}</label>
        <div className="flex items-center gap-4">
            <div className={`w-24 h-24 ${isProfilePicture ? 'rounded-full' : 'rounded-lg'} bg-secondary flex items-center justify-center overflow-hidden`}>
                {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                )}
            </div>
            <div className="relative flex-1">
                <label htmlFor="image" className="inline-block w-full px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors cursor-pointer text-center">
                    Choose File
                    <input
                        type="file"
                        id="image"
                        name="image"

                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
                <p className="absolute top-full mt-2 text-red-500">If the picture is not a square, it will be shrunk.</p>
            </div>
        </div>
    </div>
}