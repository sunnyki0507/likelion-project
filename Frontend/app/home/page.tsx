//import { Geist, Geist_Mono } from "next/font/google";
//import type { Metadata } from "next";
//import { ReactNode, useContext } from "react";

import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

import { getRestaurants } from "../(api)/getRestaurants";
import ViewSelector from "../(components)/ViewSelector";
import TagOverlay from "../(components)/TagOverlay";
import HomePage from "./HomePage";

const defaultTags: Tags = {
    location: "irvine",
    category: "Thai",
    distance: 5,
    ratings: 4,
    delivery: true,
    vegan: false,
}

export default async function Home() {
    const initRestaurants = await getRestaurants({ tags: defaultTags, size: 5 });

    return (
        <HomePage initRestaurants={initRestaurants} />
    );
}