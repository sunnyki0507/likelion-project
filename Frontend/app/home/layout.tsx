"use client"

import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import type { Metadata } from "next";
import { ReactNode, createContext, useContext } from "react";



export default function HomeLayout({ children }: { children: ReactNode }) {


    return (
        <div className="w-full h-full flex flex-col bg-white text-neutral-800 ">

            {/* header */}
            <header className="sticky top-0 z-50 w-full border-b border-neutral-300">
                <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center">
                            <img src="/images/BAPAGO-logo.png" alt="BAPAGO" className="h-10" />
                        </Link>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Link href="/favorites" className="text-sm">Favorites</Link>
                        <Link href="/customize" className="text-sm">Customize</Link>
                        <Link href="/change-view" className="text-sm">Change view</Link>
                        <Link href="/profile" className="text-sm">Profile</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="https://facebook.com" target="_blank">
                            <FaFacebook className="h-5 w-5" />
                        </Link>
                        <Link href="https://twitter.com" target="_blank">
                            <FaTwitter className="h-5 w-5" />
                        </Link>
                        <Link href="https://instagram.com" target="_blank">
                            <FaInstagram className="h-5 w-5" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* main */}
            <main className="flex-1 flex">
                {children}
            </main>

            {/* footer */}
            <footer className="w-full mt-auto border-t border-neutral-300">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-600 py-3">
                        <Link href="/help">Help Center</Link>
                        <Link href="/terms">Terms of Service</Link>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/cookies">Cookie Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
