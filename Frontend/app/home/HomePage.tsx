//import { Geist, Geist_Mono } from "next/font/google";
//import type { Metadata } from "next";
//import { ReactNode, useContext } from "react";

"use client"

import Link from "next/link";
import { useState } from "react";

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

import TagOverlay from "../(components)/TagOverlay";

import Modal from 'react-modal'
import CardBoxHolder from "../(components)/CardBoxHolder";


const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: "white",
        opacity: "60%",
        //backdropFilter: "blur(2px)",
        borderRadius: "10px",
    },
};

Modal.setAppElement('#_home');



export default function HomePage({ initRestaurants }: { initRestaurants: RestaurantInfo[] }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentView, changeView] = useState<ViewType>('Card');

    return (
        <div className="w-full h-full flex flex-col bg-white text-neutral-800 " id="_home">

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

                        {/* enable tag overlay */}
                        <div className="text-sm" onClick={() => setModalOpen(true)}>Customize</div>

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
                {currentView == 'Card' ?
                    (<CardBoxHolder initRestaurants={initRestaurants} />) :
                    (<></>)
                }
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

            {/* tag overlay */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
                style={modalStyle}
            //overlayClassName="bg-transparent"
            >
                <TagOverlay />
            </Modal>
        </div>
    );
}