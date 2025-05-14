"use client"

import { useState } from "react"
import Link from "next/link"
import CardBoxHolder from "../(components)/(cardBox)/CardBoxHolder"
import NavBar from "../(components)/NavBar"
import { ViewType } from "@/types/view"
import FavoriteCardHolder from "../(components)/(favoriteCard)/FavoriteCardHolder"
import { TagFilters } from "@/types/tags"
import { sampleTagFilters } from "@/types/tags"



export default function Home() {
	const [currentView, changeView] = useState<ViewType>('Card');

    const tagFilterState = useState<TagFilters>(sampleTagFilters);
    const [tagFilters, setTagFilters] = tagFilterState;

	return (
		<div className="w-full h-full flex flex-col bg-white text-neutral-800 " id="_home">

			{/* header */}
			<NavBar changeViewAction={changeView} tagFilterState={tagFilterState}/>

			{/* main */}
			<main className="flex-1 flex">
				{currentView === 'Favorites' ? (
					<FavoriteCardHolder />
				) : currentView === 'Card' ? (
					<CardBoxHolder tagFilters={tagFilters} />
				) : (
					<></>
				)}
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
	);
}