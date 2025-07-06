"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: number
  email: string
  firstName: string
  lastName: string
  nickName: string
  gender: string
  country: string
  timeZone: string
  language: string
  createdAt: string
  profile_image: string
}

export default function Profile() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [fullName, setFullName] = useState("")
  const [nickName, setNickName] = useState("")
  const [gender, setGender] = useState("")
  const [country, setCountry] = useState("")
  const [language, setLanguage] = useState("")
  const [timeZone, setTimeZone] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [profileImage, setProfileImage] = useState("/profile-icon.svg")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          credentials: "include"
        })
        
        if (!response.ok) {
          throw new Error("Failed to fetch profile")
        }

        const data = await response.json()
        // Populate the form fields with fetched data
        setFullName(data.firstName ? `${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}` : "")
        setNickName(data.nickName || "")
        setGender(data.gender || "")
        setCountry(data.country || "")
        setLanguage(data.language || "")
        setTimeZone(data.timeZone || "")
        setEmail(data.email)
        setProfileImage(data.profile_image || "/profile-icon.svg")
      } catch (err) {
        console.error("Error fetching profile:", err)
        setError("Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click()
    }
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB")
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file")
      return
    }

    // Create a FileReader to read the image
    const reader = new FileReader()
    reader.onloadend = () => {
      // Update the profile image state with the new image
      setProfileImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleEdit = async () => {
    if (isEditing) {
      // Save changes
      setSaving(true)
      setError("")
      
      try {
        // Split full name into first and last name, handling empty or single name cases
        const nameParts = fullName.trim().split(/\s+/)
        const firstName = nameParts[0] || ""
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : ""
        
        const response = await fetch("/api/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            firstName,
            lastName,
            nickName,
            gender,
            country,
            timeZone,
            language,
            profile_image: profileImage
          })
        })

        if (!response.ok) {
          throw new Error("Failed to update profile")
        }

        // Get the updated data from the response
        const data = await response.json()
        
        // Update the form fields with the response data
        setFullName(data.firstName ? `${data.firstName}${data.lastName ? ` ${data.lastName}` : ''}` : "")
        setNickName(data.nickName || "")
        setGender(data.gender || "")
        setCountry(data.country || "")
        setLanguage(data.language || "")
        setTimeZone(data.timeZone || "")
        setProfileImage(data.profile_image || "/profile-icon.svg")

        setIsEditing(false)
      } catch (err) {
        console.error("Error saving profile:", err)
        setError("Failed to save changes")
      } finally {
        setSaving(false)
      }
    } else {
      // Enter edit mode
      setIsEditing(true)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include"
      })
      
      if (response.ok) {
        // Force a hard navigation to login page
        window.location.href = "/login"
      } else {
        console.error("Logout failed:", await response.text())
      }
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white px-8 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-gray-600">Loading profile...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-white px-8 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-black">Profile</h1>
          <button 
            onClick={handleEdit}
            disabled={saving}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : isEditing ? "Save" : "Edit"}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* Profile Card */}
        <div className="flex items-center space-x-6 mb-12">
          <div 
            className="w-24 h-24 relative rounded-full overflow-hidden bg-gray-200 cursor-pointer group"
            onClick={handleImageClick}
          >
            <Image
              src={profileImage}
              alt="Profile"
              fill
              className="object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg 
                  className="w-8 h-8 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div>
            <div className="text-2xl font-semibold text-black">{fullName || "Your Name"}</div>
            <div className="text-gray-500 text-base">{email}</div>
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
              disabled={!isEditing || saving}
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
              disabled={!isEditing || saving}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Gender</label>
            <select
              className="w-full bg-gray-50 rounded-lg border-none py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-200"
              value={gender}
              onChange={e => setGender(e.target.value)}
              disabled={!isEditing || saving}
            >
              <option value="">Your Gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Country</label>
            <select
              className="w-full bg-gray-50 rounded-lg border-none py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-200"
              value={country}
              onChange={e => setCountry(e.target.value)}
              disabled={!isEditing || saving}
            >
              <option value="">Select Country</option>
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
              <option value="South Korea">South Korea</option>
              <option value="China">China</option>
              <option value="India">India</option>
              <option value="Brazil">Brazil</option>
              <option value="Mexico">Mexico</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Language</label>
            <select
              className="w-full bg-gray-50 rounded-lg border-none py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-200"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              disabled={!isEditing || saving}
            >
              <option value="">Select Language</option>
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Italian">Italian</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Russian">Russian</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Chinese">Chinese</option>
              <option value="Hindi">Hindi</option>
              <option value="Arabic">Arabic</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Time Zone</label>
            <select
              className="w-full bg-gray-50 rounded-lg border-none py-3 px-4 text-gray-900 focus:ring-2 focus:ring-blue-200"
              value={timeZone}
              onChange={e => setTimeZone(e.target.value)}
              disabled={!isEditing || saving}
            >
              <option value="">Select Time Zone</option>
              <option value="Pacific Time (PT)">Pacific Time (PT)</option>
              <option value="Mountain Time (MT)">Mountain Time (MT)</option>
              <option value="Central Time (CT)">Central Time (CT)</option>
              <option value="Eastern Time (ET)">Eastern Time (ET)</option>
              <option value="Atlantic Time (AT)">Atlantic Time (AT)</option>
              <option value="Greenwich Mean Time (GMT)">Greenwich Mean Time (GMT)</option>
              <option value="Central European Time (CET)">Central European Time (CET)</option>
              <option value="Eastern European Time (EET)">Eastern European Time (EET)</option>
              <option value="Japan Standard Time (JST)">Japan Standard Time (JST)</option>
              <option value="China Standard Time (CST)">China Standard Time (CST)</option>
              <option value="Australian Eastern Time (AET)">Australian Eastern Time (AET)</option>
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
              <div className="text-gray-900">{email}</div>
              <div className="text-gray-400 text-xs">1 month ago</div>
            </div>
          </div>
          <button className="mt-4 px-5 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition">+Add Email Address</button>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
} 