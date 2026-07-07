'use client';
import { editRaceAction } from "@/app/data/actions";
import { getRace } from "@/app/data/queries/races";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UploadPicture from "./UploadPicture";
import { set } from "zod";
import { ca } from "zod/locales";

interface EditRaceModalProps {
  isOpen: boolean;
  races: { id: number, title: string }[];
  onClose: () => void;
  refreshRaces: () => void;
}


export default function EditRaceModal({ isOpen, races, onClose, refreshRaces }: EditRaceModalProps) {
  const [selectedRaceId, setSelectedRaceId] = useState(0);
  const [selectedRaceName, setSelectedRaceName] = useState("");
  const [formIsDirty, setFormIsDirty] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    picture: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedRaceName !== "") {
      const race = races.find(p => p.title === selectedRaceName);
      console.log("Selected race name:", selectedRaceName, race);
      if (race) {
        console.log("Setting selected race ID to:", race.id);
        setSelectedRaceId(race.id);
        getRace(race.id).then((race) => {
          setFormData({
            name: race.title,
            date: new Date(race.date).toISOString().split('T')[0], // Format date for input type="date"
            location: race.location,
            picture: null,
          });
          setPreviewUrl(race.bannerurl);
          setFormIsDirty(true);
        }).catch((error) => {
          toast.error("Error fetching race details. Check server logs for more info.");
        });
      } else if (formIsDirty) {
        setSelectedRaceId(0);
        setFormData({ name: "", date: "", location: "", picture: null });
        setPreviewUrl(null);
        setFormIsDirty(false);
      }
    }
  }, [selectedRaceName]);

  const handleOnClose = () => {
    setSelectedRaceId(-1);
    setFormData({ name: "", date: "", location: "", picture: null });
    setPreviewUrl(null);
    setFormIsDirty(false);
    onClose();
  }

  if (!isOpen) return null;

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {

    console.log("Submitting race form with data:", event);
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const submittedFormData = new FormData(event.currentTarget);
      const result = await editRaceAction(submittedFormData);

      if (result === 'duplicate') {
        toast.error("A race with this title and date already exists.");
      } else if (result === 'error') {
        toast.error("Unable to update race right now. Check server logs for details.");
      } else {
        await refreshRaces();
        toast.success("Race updated successfully!");
        handleOnClose();
      }
    } catch (error) {
      console.error("Error updating race information:", error);
      toast.error("Unable to update race information right now. Check server logs for details.");
    } finally {
      setIsSubmitting(false);
    }
  }

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

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div>
            <label htmlFor="race" className="block mb-2 text-sm">Select Race</label>

            <input type="hidden" name="raceId" id="raceId" value={selectedRaceId} />
            <input
              list="races"
              name="race"
              id="race"
              required
              placeholder="Search for a race"
              value={selectedRaceName}
              onChange={(e) => setSelectedRaceName(e.target.value)}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"

            />
            <datalist id="races">
              {races.map(race => (
                <option key={race.id} value={race.title} />
              ))}
            </datalist>
          </div>

          {selectedRaceId !== 0 && (
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
              disabled={selectedRaceId === -1 || isSubmitting}
              className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Updating..." : "Update Race"}
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
