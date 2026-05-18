'use client';
import { editRaceAction } from "@/app/data/actions";
import { getRace } from "@/app/data/queries/races";
import { X, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import UploadPicture from "./UploadPicture";

interface EditRaceModalProps {
  isOpen: boolean;
  races: { id: number, title: string }[];
  onClose: () => void;
  refreshRaces: () => void;
}


export default function EditRaceModal({ isOpen, races, onClose, refreshRaces }: EditRaceModalProps) {
  const [selectedRace, setSelectedRace] = useState(-1);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    picture: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedRace !== -1) {
      getRace(selectedRace).then((race) => {
        setFormData({
          name: race.title,
          date: new Date(race.date).toISOString().split('T')[0], // Format date for input type="date"
          location: race.location,
          picture: null,
        });
        setPreviewUrl(race.bannerurl);
      });
    }
  }, [selectedRace]);

  if (!isOpen) return null;

  const handleOnClose = () => {
    setSelectedRace(-1);
    setFormData({ name: "", date: "", location: "", picture: null });
    setPreviewUrl(null);
    onClose();
  }

  const handleEditRaceAction = async (formData: FormData) => {
    await editRaceAction(formData);
    await refreshRaces();
    alert("Race information updated successfully!");
    handleOnClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border-2 border-accent rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-accent">Edit Race Info</h2>
          <button
            onClick={handleOnClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form action={handleEditRaceAction} className="space-y-4">
          <div>
            <label htmlFor="raceId" className="block mb-2 text-sm">Select Race</label>
            <select
              required
              id="raceId"
              name="raceId"
              value={selectedRace}
              onChange={(e) => setSelectedRace(Number(e.target.value))}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value={-1}>Choose a race...</option>
              {races.map(race => (
                <option key={race.id} value={race.id}>{race.title}</option>
              ))}
            </select>
          </div>

          {selectedRace !== -1 && (
            <>
              <UploadPicture onFileChange={(file) => setFormData({ ...formData, picture: file })} defaultPreviewUrl={previewUrl} />

              <div>
                <label htmlFor="title" className="block mb-2 text-sm">Race Name</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="date" className="block mb-2 text-sm">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label htmlFor="location" className="block mb-2 text-sm">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={selectedRace === -1}
              className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Race
            </button>
            <button
              type="button"
              onClick={handleOnClose}
              className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
