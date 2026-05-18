'use client';
import { editPilotAction } from "@/app/data/actions";
import { PilotTableType } from "@/app/data/types";
import { X, Upload } from "lucide-react";
import { useState } from "react";
import UploadPicture from "./UploadPicture";

interface EditPilotModalProps {
  isOpen: boolean;
  pilots: PilotTableType[];
  onClose: () => void;
  refreshPilots: () => void;
}

export default function EditPilotModal({ isOpen, pilots, onClose, refreshPilots }: EditPilotModalProps) {
  const [selectedPilot, setSelectedPilot] = useState("");
  const [formData, setFormData] = useState({
    nickname: "",
    firstName: "",
    middleName: null as string | null,
    lastName: "",
    status: "active",
    picture: null as File | null,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePilotSelect = (pilotId: string) => {
    const pilot = pilots.find(p => p.id === Number(pilotId));
    if (pilot) {
      setSelectedPilot(pilotId);
      setFormData({
        nickname: pilot.nickname,
        firstName: pilot.firstname,
        middleName: pilot.middlename ? pilot.middlename : null,
        lastName: pilot.lastname,
        status: pilot.status,
        picture: null,
      });
      setPreviewUrl(pilot.pictureurl);
    } else {
      setSelectedPilot("");
      setFormData({ nickname: "", firstName: "", middleName: null, lastName: "", status: "active", picture: null });
    }
  };

  const handleOnClose = () => {
    setSelectedPilot("");
    setFormData({ nickname: "", firstName: "", middleName: null, lastName: "", status: "active", picture: null });
    setPreviewUrl(null);
    onClose();
  }

  const handleEditPilotAction = async (formData: FormData) => {
    await editPilotAction(formData);
    await refreshPilots();
    alert("Pilot information updated successfully!");
    handleOnClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border-2 border-accent rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-accent">Edit Pilot Info</h2>
          <button
            onClick={handleOnClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form action={handleEditPilotAction} className="space-y-4">
          <div>
            <label htmlFor="pilotId" className="block mb-2 text-sm">Select Pilot</label>
            <select
              id="pilotId"
              name="pilotId"
              required
              value={selectedPilot}
              onChange={(e) => handlePilotSelect(e.target.value)}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Choose a pilot...</option>
              {pilots.map(pilot => (
                <option key={pilot.id} value={pilot.id}>{`${pilot.nickname} (${pilot.firstname}${pilot.middlename ? " " + pilot.middlename : ""} ${pilot.lastname})`}</option>
              ))}
            </select>
          </div>

          {selectedPilot && (
            <>
              <UploadPicture isProfilePicture onFileChange={(file) => setFormData({ ...formData, picture: file })} defaultPreviewUrl={previewUrl} />

              <div>
                <label htmlFor="nickname" className="block mb-2 text-sm">Nickname</label>
                <input
                  id="nickname"
                  name="nickname"
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
                  <label htmlFor="firstName" className="block mb-2 text-sm">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="middleName" className="block mb-2 text-sm">Middle Name</label>
                  <input
                    id="middleName"
                    name="middleName"
                    type="text"
                    value={formData.middleName ? formData.middleName : ""}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                    className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="M."
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block mb-2 text-sm">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
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
                <label htmlFor="status" className="block mb-2 text-sm">Status</label>
                <select
                  id="status"
                  name="status"
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
              onClick={handleOnClose}
              className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div >
    </div >
  );
}
