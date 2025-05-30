"use client"

import Image from "next/image"
import { useState } from "react"

export default function Profile() {
  // Example state (replace with real data/fetch as needed)
  const [fullName, setFullName] = useState("")
  const [nickName, setNickName] = useState("")
  const [gender, setGender] = useState("")
  const [country, setCountry] = useState("")
  const [language, setLanguage] = useState("")
  const [timeZone, setTimeZone] = useState("")

  return (
    <div className="w-full min-h-screen bg-white px-8 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-black">Profile</h1>
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">Edit</button>
        </div>

        {/* Profile Card */}
        <div className="flex items-center space-x-6 mb-12">
          <div className="w-24 h-24 relative rounded-full overflow-hidden bg-gray-200">
            <Image
              src="/images/default-avatar.png"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-2xl font-semibold text-black">Alexa Rawles</div>
            <div className="text-gray-500 text-base">alexarawles@gmail.com</div>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full bg-gray-50 rounded-lg border-none py-3 px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-200"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Nick Name</label>
            <input
              type="text"
              placeholder="Your Nick Name"
              className="w-full bg-gray-50 rounded-lg border-none py-3 px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-200"
              value={nickName}
              onChange={e => setNickName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <select
              className="w-full bg-gray-50 rounded-lg border-none py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-200"
              value={gender}
              onChange={e => setGender(e.target.value)}
            >
              <option value="">Your Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Country</label>
            <input
              type="text"
              placeholder="Your Country"
              className="w-full bg-gray-50 rounded-lg border-none py-3 px-4 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-200"
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Language</label>
            <select
              className="w-full bg-gray-50 rounded-lg border-none py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-200"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="">Your Language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Korean">Korean</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Time Zone</label>
            <select
              className="w-full bg-gray-50 rounded-lg border-none py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-200"
              value={timeZone}
              onChange={e => setTimeZone(e.target.value)}
            >
              <option value="">Your Time Zone</option>
              <option value="PST">PST</option>
              <option value="EST">EST</option>
              <option value="CST">CST</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Email Address Section */}
        <div className="mb-8">
          <div className="font-semibold text-lg mb-4">My email Address</div>
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect width="24" height="24" rx="12" fill="#2563EB"/>
                <path d="M7 9l5 3 5-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="7" y="9" width="10" height="6" rx="1" fill="#fff" fillOpacity=".2"/>
              </svg>
            </div>
            <div>
              <div className="text-gray-900">alexarawles@gmail.com</div>
              <div className="text-gray-400 text-xs">1 month ago</div>
            </div>
          </div>
          <button className="mt-4 px-5 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition">+Add Email Address</button>
        </div>
      </div>
    </div>
  )
} 