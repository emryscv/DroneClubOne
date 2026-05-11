'use client';
import { X, Upload } from "lucide-react";
import { useState } from "react";

interface EditPilotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockPilots = [
  { id: "1", nickname: "Maverick", firstName: "Alex", middleName: "J.", lastName: "Rivera", status: "active" },
  { id: "2", nickname: "Sky", firstName: "Jordan", middleName: "", lastName: "Chen", status: "active" },
  { id: "3", nickname: "Thunder", firstName: "Sam", middleName: "M.", lastName: "Taylor", status: "inactive" },
];

export default function EditPilotModal({ isOpen, onClose }: EditPilotModalProps) {
  const [selectedPilot, setSelectedPilot] = useState("");
  const [formData, setFormData] = useState({
    nickname: "",
    firstName: "",
    middleName: "",
    lastName: "",
    status: "active",
    picture: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePilotSelect = (pilotId: string) => {
    const pilot = mockPilots.find(p => p.id === pilotId);
    if (pilot) {
      setSelectedPilot(pilotId);
      setFormData({
        nickname: pilot.nickname,
        firstName: pilot.firstName,
        middleName: pilot.middleName,
        lastName: pilot.lastName,
        status: pilot.status,
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
    console.log("Updated pilot data:", formData);
    alert("Pilot information updated successfully!");
    setSelectedPilot("");
    setFormData({ nickname: "", firstName: "", middleName: "", lastName: "", status: "active", picture: null });
    setPreviewUrl(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border-2 border-accent rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-accent">Edit Pilot Info</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm">Select Pilot</label>
            <select
              required
              value={selectedPilot}
              onChange={(e) => handlePilotSelect(e.target.value)}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Choose a pilot...</option>
              {mockPilots.map(pilot => (
                <option key={pilot.id} value={pilot.id}>{pilot.nickname} - {pilot.firstName} {pilot.lastName}</option>
              ))}
            </select>
          </div>

          {selectedPilot && (
            <>
              <div>
                <label className="block mb-2 text-sm">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
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
                <label className="block mb-2 text-sm">Nickname</label>
                <input
                  type="text"
                  required
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="e.g., Maverick, Sky, Thunder"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block mb-2 text-sm">First Name</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Middle Name</label>
                  <input
                    type="text"
                    value={formData.middleName}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="M."
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Last Name</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={!selectedPilot}
              className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Pilot
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
