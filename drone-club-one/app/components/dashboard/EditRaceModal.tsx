'use client';
import { editRaceAction } from "@/app/data/actions";
import { getRace } from "@/app/data/queries/races";
import { X, Upload } from "lucide-react";
import { useEffect, useState } from "react";

interface EditRaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  races: { id: number, title: string }[];
}


export default function EditRaceModal({ isOpen, onClose, races }: EditRaceModalProps) {
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
          date: race.date,
          location: race.location,
          picture: null,
        });
        setPreviewUrl(race.bannerurl);
      });
    }
  }, [selectedRace]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, picture: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleOnClose = () => {
    setSelectedRace(-1);
    setFormData({ name: "", date: "", location: "", picture: null });
    setPreviewUrl(null);
    onClose();
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    console.log("Updated race data:", formData);
    alert("Race information updated successfully!");
    handleOnClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border-2 border-accent rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-accent">Edit Race Info</h2>
          <button
            onClick={handleOnClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} action={editRaceAction} className="space-y-4">
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
              <div>
                <label htmlFor="banner" className="block mb-2 text-sm">Race Picture</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <label htmlFor="banner" className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors cursor-pointer text-center">
                    Choose File
                    <input
                      type="file"
                      id="banner"
                      name="banner"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

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
                  value={new Date(formData.date).toLocaleDateString('sv-SE', { //sv-SE format ensures the date is in YYYY-MM-DD format which is compatible with input type="date"
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    timeZone: 'UTC',
                  })}
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
