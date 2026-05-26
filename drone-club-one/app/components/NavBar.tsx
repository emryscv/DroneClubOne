'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from "lucide-react";
import { is } from 'zod/locales';

export default function NavBar({ is404 = false }: { is404?: boolean }) {
    const location = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === "/") {
            return location === "/";
        }
        return location.startsWith(path);
    };
    const navLinks = [
        { path: "/", label: "HOME" },
        { path: "/races", label: "RACES" },
        { path: "/pilots", label: "PILOTS" },
    ];

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return <header className='fixed top-0 left-0 w-full z-50 bg-black border-b border-border'>
        <div className='px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16'>
            {is404 ? (
                <a href="/" className="flex items-center gap-2">
                    <Image
                        src="/droneClubLogo.png"
                        width="40"
                        height="40"
                        alt="Drone Club Logo"
                        style={{ filter: "invert(100%)" }}
                    />

                    <h1 className="text-xl tracking-wide text-accent">DRONE CLUB ONE</h1>
                </a>
            ) : (
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/droneClubLogo.png"
                        width="40"
                        height="40"
                        alt="Drone Club Logo"
                        style={{ filter: "invert(100%)" }}
                    />

                    <h1 className="text-xl tracking-wide text-accent">DRONE CLUB ONE</h1>
                </Link>
            )}
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
                {navLinks.map((link) => (
                    is404 ? (
                        <a
                            key={link.path}
                            href={link.path}
                            className="tracking-wide transition-colors flex items-center gap-2"
                        >
                            <span className={isActive(link.path) ? "text-accent" : "opacity-0"}>&gt;</span>
                            <span className={isActive(link.path) ? "text-white" : "text-muted-foreground hover:text-foreground"}>
                                {link.label}
                            </span>
                        </a>
                    ) : (
                        <Link
                            key={link.path}
                            href={link.path}
                            className="tracking-wide transition-colors flex items-center gap-2"
                        >
                            <span className={isActive(link.path) ? "text-accent" : "opacity-0"}>&gt;</span>
                            <span className={isActive(link.path) ? "text-white" : "text-muted-foreground hover:text-foreground"}>
                                {link.label}
                            </span>
                        </Link>
                    )
                ))}
            </nav>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center text-accent hover:bg-secondary rounded transition-colors"
            >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>

        {/* Mobile Navigation Menu */}
        {
            isMobileMenuOpen && (
                <div className="md:hidden bg-black border-t border-border">
                    <nav className="px-4 py-4 space-y-3">
                        {navLinks.map((link) => (
                            is404 ? (
                                <a
                                    key={link.path}
                                    href={link.path}
                                    onClick={handleLinkClick}
                                    className="tracking-wide transition-colors flex items-center gap-2 py-2"
                                >
                                    <span className={isActive(link.path) ? "text-accent" : "opacity-0"}>&gt;</span>
                                    <span className={isActive(link.path) ? "text-white" : "text-muted-foreground hover:text-foreground"}>
                                        {link.label}
                                    </span>
                                </a>)
                                : (
                                    <Link
                                        key={link.path}
                                        href={link.path}
                                        onClick={handleLinkClick}
                                        className="tracking-wide transition-colors flex items-center gap-2 py-2"
                                    >
                                        <span className={isActive(link.path) ? "text-accent" : "opacity-0"}>&gt;</span>
                                        <span className={isActive(link.path) ? "text-white" : "text-muted-foreground hover:text-foreground"}>
                                            {link.label}
                                        </span>
                                    </Link>
                                )
                        ))}
                    </nav>
                </div>
            )
        }
    </header >
}