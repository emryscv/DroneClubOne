'use client';
import { changePasswordAction } from "@/app/data/actions";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [invalidOldPassword, setInvalidOldPassword] = useState(false);

    if (!isOpen) return null;

    const passwordsMismatch = formData.newPassword !== formData.confirmPassword;
    const passwordsSameAsOld = formData.newPassword && formData.oldPassword && formData.oldPassword === formData.newPassword;

    const handleOnClose = () => {
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        onClose();
    }

    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (event) => {

        console.log("Submitting pilot form with data:", event);
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await changePasswordAction(formData.oldPassword, formData.newPassword);

            if (result === 'invalid_old_password') {
                setInvalidOldPassword(true);
                toast.error("Old password is incorrect.");
            } else {
                setInvalidOldPassword(false);
                
                if (result === 'error') {
                    toast.error("Unable to change password right now. Check server logs for details.");
                } else if (result === 'unauthorized') {
                    toast.error("You are not authorized to change the password.");
                } else {
                    toast.success("Password changed successfully!");
                    handleOnClose();
                }
            }
        } catch (error) {
            console.error("Error changing password:", error);
            toast.error("Unable to change password right now. Check server logs for details.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-card border-2 border-accent rounded-lg p-6 max-w-lg w-full mx-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-accent">Change Password</h2>
                    <button
                        onClick={handleOnClose}
                        className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>


                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                    <div>
                        <label htmlFor="oldPassword" className="block mb-2 text-sm">Old Password</label>
                        <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            required
                            value={formData.oldPassword}
                            onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                            className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Old Password"
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block mb-2 text-sm">New Password {passwordsSameAsOld && (
                            <span> (<span className="text-red-500">Password same as old</span>)</span>
                        )}</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            required
                            value={formData.newPassword}
                            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                            className={`w-full px-4 py-2 bg-input-background border ${passwordsSameAsOld ? "border-red-500" : "border-border"}  rounded-md focus:outline-none focus:ring-2 focus:ring-accent`}
                            placeholder="New Password"
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm">
                            Confirm Password {passwordsMismatch && (
                                <span> (<span className="text-red-500">Passwords do not match</span>)</span>
                            )}
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className={`w-full px-4 py-2 bg-input-background border ${passwordsMismatch ? "border-red-500" : "border-border"} rounded-md focus:outline-none focus:ring-2 focus:ring-accent`}
                            placeholder="Confirm Password"
                        />
                    </div>

                    <p className="text-red-500">This change is permanent and cannot be undone.</p>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting || !formData.oldPassword || !formData.newPassword || !formData.confirmPassword || formData.newPassword !== formData.confirmPassword || formData.oldPassword === formData.newPassword}
                            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md  hover:opacity-80 transition-opacity cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isSubmitting ? "Changing..." : "Change Password"}
                        </button>
                        <button
                            type="button"
                            onClick={handleOnClose}
                            className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors cursor-pointer hover:opacity-80"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
