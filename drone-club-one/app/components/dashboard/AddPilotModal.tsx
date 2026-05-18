'use client';
import { addPilotAction } from "@/app/data/actions";
import { X, Upload } from "lucide-react";
import { useState } from "react";
import UploadPicture from "./UploadPicture";

interface AddPilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshPilots: () => void;
}

export default function AddPilotModal({ isOpen, onClose, refreshPilots }: AddPilotModalProps) {
  const [formData, setFormData] = useState({
    nickname: "",
    firstName: "",
    middleName: "",
    lastName: "",
    picture: null as File | null,
  });

  if (!isOpen) return null;

  const handleOnClose = () => {
    setFormData({ nickname: "", firstName: "", middleName: "", lastName: "", picture: null });
    onClose();
  }

  const handleAddPilotAction = async (formData: FormData) => {
    await addPilotAction(formData);
    await refreshPilots();
    alert("Pilot added successfully!");
    handleOnClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border-2 border-accent rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-accent">Add New Pilot</h2>
          <button
            onClick={handleOnClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form action={handleAddPilotAction} className="space-y-4">
        <UploadPicture isProfilePicture onFileChange={(file) => setFormData({ ...formData, picture: file })} />

          <div>
            <label htmlFor="nickname" className="block mb-2 text-sm">Nickname</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
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
                type="text"
                id="firstName"
                name="firstName"
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
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="M."
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2 text-sm">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Doe"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Add Pilot
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
