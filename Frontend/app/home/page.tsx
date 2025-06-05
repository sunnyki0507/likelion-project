"use client"

import { useState } from "react"
import Link from "next/link"
import CardBoxHolder from "../(components)/(cardBox)/CardBoxHolder"
import NavBar from "../(components)/NavBar"
import { ViewType } from "@/types/view"
import FavoriteCardHolder from "../(components)/(favoriteCard)/FavoriteCardHolder"
import { TagFilters, sampleTagFilters } from "@/types/tags"
import Profile from "../(components)/(profile)/Profile"
import ListBoxHolder from "../(components)/(listBox)/ListBoxHolder"



export default function Home() {
	const [currentView, changeView] = useState<ViewType>('Card');

    const tagFilterState = useState<TagFilters>(sampleTagFilters);
    const [tagFilters, setTagFilters] = tagFilterState;

	return (
		<div className="w-full h-full flex flex-col bg-white text-neutral-800 " id="_home">

			{/* header */}
			<NavBar changeViewAction={changeView} tagFilterState={tagFilterState}/>

			{/* main */}
			<main className="flex-1 overflow-y-auto">
				{currentView === 'Favorites' ? (
					<FavoriteCardHolder />
				) : currentView === 'Card' ? (
					<CardBoxHolder tagFilters={tagFilters} />
				) : currentView === 'Profile' ? (
					<Profile />
				) : currentView === 'List' ? (
					<ListBoxHolder tagFilters={tagFilters} />
				) : (
					<></>
				)}
			</main>

			{/* footer */}
			<footer className="w-full mt-auto border-t border-neutral-300">
				<div className="max-w-screen-xl mx-auto px-4">
					<div className="flex items-center justify-center gap-4 text-sm text-gray-600 py-3">
						Copyright © 2025 BAPAGO. All rights reserved.
					</div>
				</div>
			</footer>

		</div>
	);
}