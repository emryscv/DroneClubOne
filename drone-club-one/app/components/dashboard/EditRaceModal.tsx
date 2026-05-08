import { X, Upload } from "lucide-react";
import { useState } from "react";

interface EditRaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockRaces = [
  { id: "1", name: "Spring Championship 2026 - Round 1", date: "2026-03-15", location: "Innovation Center Track" },
  { id: "2", name: "Spring Championship 2026 - Round 2", date: "2026-04-05", location: "Campus Outdoor Circuit" },
  { id: "3", name: "Spring Championship 2026 - Round 3", date: "2026-04-20", location: "Innovation Center Track" },
];

export default function EditRaceModal({ isOpen, onClose }: EditRaceModalProps) {
  const [selectedRace, setSelectedRace] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    picture: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRaceSelect = (raceId: string) => {
    const race = mockRaces.find(r => r.id === raceId);
    if (race) {
      setSelectedRace(raceId);
      setFormData({
        name: race.name,
        date: race.date,
        location: race.location,
        picture: null,
      });
      setPreviewUrl(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, picture: file });
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated race data:", formData);
    alert("Race information updated successfully!");
    setSelectedRace("");
    setFormData({ name: "", date: "", location: "", picture: null });
    setPreviewUrl(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border-2 border-accent rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-accent">Edit Race Info</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm">Select Race</label>
            <select
              required
              value={selectedRace}
              onChange={(e) => handleRaceSelect(e.target.value)}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Choose a race...</option>
              {mockRaces.map(race => (
                <option key={race.id} value={race.id}>{race.name}</option>
              ))}
            </select>
          </div>

          {selectedRace && (
            <>
              <div>
                <label className="block mb-2 text-sm">Race Picture</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-32 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <label className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors cursor-pointer text-center">
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Race Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Date</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Location</label>
                <input
                  type="text"
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
              disabled={!selectedRace}
              className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Race
            </button>
            <button
              type="button"
              onClick={onClose}
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
