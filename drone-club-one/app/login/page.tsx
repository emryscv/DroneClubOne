"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
    const route = useRouter();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Simple authentication check - in production, this would be done server-side
        if (formData.username === "admin" && formData.password === "admin123") {
            //onLogin(formData.username, formData.password);
            route.push("/dashboard");
            setFormData({ username: "", password: "" });
        } else {
            setError("Invalid credentials");
        }
    };

    const onClose = () => {
        route.push("/");
    };
    return (
        <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
            <div className="bg-card border-2 border-accent rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl text-accent">ADMIN LOGIN</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center hover:bg-secondary rounded cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm">Username</label>
                        <input
                            type="text"
                            required
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter username"
                            autoComplete="username"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm">Password</label>
                        <input
                            type="password"
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter password"
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <div className="text-destructive text-sm p-2 bg-destructive/10 rounded border border-destructive">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-xs text-muted-foreground text-center">
                    Access to admin dashboard is restricted to administrators only.
                </div>
            </div>
        </div>
    );
}