'use client';
import { addRaceAction } from "@/app/data/actions";
import { X, Upload } from "lucide-react";
import { useState } from "react";
import UploadPicture from "./UploadPicture";

interface AddRaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshRaces: () => void;
}

export default function AddRaceModal({ isOpen, onClose, refreshRaces }: AddRaceModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    banner: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleOnClose = () => {
    setFormData({ title: "", date: "", location: "", banner: null });
    onClose();
  }

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {

    console.log("Submitting pilot form with data:", event);
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const submittedFormData = new FormData(event.currentTarget);
      const result = await addRaceAction(submittedFormData);

      if (result === 'duplicate') {
        alert("A race with this title and date already exists.");
      } else if (result === 'error') {
        alert("Unable to add race right now. Check server logs for details.");
      } else {
        await refreshRaces();
        alert("Race added successfully!");
        handleOnClose();
      }
    } catch (error) {
      console.error("Error adding race:", error);
      alert("Unable to add race right now. Check server logs for details.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border-2 border-accent rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl text-accent">Add New Race</h2>
          <button
            onClick={handleOnClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <UploadPicture onFileChange={(file) => setFormData({ ...formData, banner: file })} />

          <div>
            <label htmlFor="title" className="block mb-2 text-sm">Race Title</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Spring Championship 2026 - Round 5"
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
              placeholder="Innovation Center Track"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              {isSubmitting ? "Adding..." : "Add Race"}
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
