"use client"

import { useState, useEffect, useRef } from "react";
import { MapPinIcon, ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ChevronDown } from "lucide-react";

interface LocationSectionProps {
    selectedLocation: string;
    onLocationChange: (location: string) => void;
}

export default function LocationSection({
    selectedLocation,
    onLocationChange,
}: LocationSectionProps) {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const locations = ["Irvine Spectrum Center", "South Coast Plaza", "The Block at Orange", "Fashion Island"] // later change it to locations that are near the user

    const filteredLocations = locations.filter(location =>
        location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        if (isSearching && inputRef.current) {
            inputRef.current.focus();
        }
    }
    , [isSearching]);

    return (
      <div className = "flex items-center mb-1">
        <div className="bg-black rounded-full p-3 mr-3">
          <MapPinIcon className="w-6 h-6 text-white" />
        </div>

        <div className="relative w-full ">
        <button
          onClick={() => {
            setIsDropDownOpen(!isDropDownOpen);
            setIsSearching(true);
          }}
          className="flex items-center hover:bg-gray-100 rounded-md px-2 py-1 w-full justify-between"
        >
          <div className="flex flex-col">
            <p className="text-gray-500 mr-auto">Current location</p>
            <h2 className="text-2xl font-medium">{selectedLocation}</h2>
          </div>
          <MagnifyingGlassIcon className="w-9 h-9 ml-3" />
        </button>

        {isDropDownOpen && (
          <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg z-10 py-2">
            {/* Search Header */}
            <div className="px-4 py-2 border-b">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-none focus:ring-0"
                  autoFocus
                />
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-60 overflow-y-auto">
              {filteredLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    onLocationChange(location);
                    setIsDropDownOpen(false);
                    setSearchQuery("");
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center ${
                    location === selectedLocation ? "bg-gray-50 font-medium" : ""
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    );
  }
