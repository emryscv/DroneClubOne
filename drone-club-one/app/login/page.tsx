"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useActionState } from 'react';
import { authenticate } from '../data/actions';
import { useSearchParams } from 'next/navigation';

export default function Page() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );

    const route = useRouter();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

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

                <form action={formAction} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            disabled={isPending}
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter email"
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            disabled={isPending}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="Enter password"
                            autoComplete="current-password"
                        />
                    </div>

                    {errorMessage && (
                        <div className="text-destructive text-sm p-2 bg-destructive/10 rounded border border-destructive">
                            {errorMessage}
                        </div>
                    )}
                    
                    <div className="flex gap-3 pt-4">
                        <button
                            disabled={isPending}
                            type="submit"
                            className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-md hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            Login
                        </button>
                        <button
                            disabled={isPending}
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-secondary text-foreground rounded-md hover:bg-muted transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

                <div className="mt-4 text-xs text-muted-foreground text-center">
                    Access to dashboard is restricted to administrators only.
                </div>
            </div>
        </div>
    );
}