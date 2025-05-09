"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { signUp, logIn, initializeDatabase } from "../api/auth"

export default function Login() {
  const [isHidden, setIsHidden] = useState(true)
  const [showSignUp, setShowSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState<{ id: number; email: string } | null>(null)

  // Initialize the database on component mount
  useEffect(() => {
    initializeDatabase()
    // hit our “who-ami” route
    fetch("/api/me", { cache: "no-store" })
      .then(r => r.json())
      .then(data => {
        if (data.user) {
          setIsLoggedIn(true)
          setUserData(data.user)
        }
      })
  }, [])

// inside your Login() component (a "use client" file)

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  // Basic validation
  if (!email || !password) {
    setError("Please fill in both email and password");
    setIsLoading(false);
    return;
  }

  try {
    // 1. Send credentials to your Next.js API route
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    // 2. If login fails, show the error
    if (!resp.ok) {
      const { error } = await resp.json();
      setError(error || "Login failed");
      setIsLoading(false);
      return;
    }

    // 3. On success, the API returns { user: { id, email } } 
    //    (and sets an HttpOnly cookie “token” under the hood)
    const { user } = await resp.json();

    // 4. Update your UI state
    setIsLoggedIn(true);
    setUserData(user);

    // 5. Clear the form
    setEmail("");
    setPassword("");
  } catch (err) {
    console.error(err);
    setError("An unexpected error occurred");
  } finally {
    setIsLoading(false);
  }
};


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const result = await signUp(email, password)

      if (result.success && result.user) {
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(result.user))
        setIsLoggedIn(true)
        setUserData(result.user)
        setShowSignUp(false)
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      } else {
        setError(result.error || "Sign up failed")
      }
    } catch (err) {
      setError("An error occurred during sign up")
      console.error(err)
    }

    setIsLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUserData(null)
  }

  if (isLoggedIn && userData) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-200 text-black font-poppins select-none min-h-screen">
        <div className="bg-white p-8 rounded-3xl shadow-md max-w-md w-full">
          <h1 className="text-2xl font-medium text-gray-700 mb-4 text-center">Welcome to BAPAGO</h1>
          <p className="text-gray-500 mb-2 text-center">You are successfully logged in!</p>
          <p className="text-gray-500 mb-6 text-center">Email: {userData.email}</p>
          <button
            onClick={handleLogout}
            className="w-full h-12 flex items-center justify-center bg-gray-600 text-white rounded-full font-medium hover:bg-gray-800 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Sign Up Overlay */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-3xl w-full max-w-md p-8">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setShowSignUp(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-medium text-gray-700 mb-4">Sign Up</h2>
            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <label className="block text-xs font-light text-gray-500">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 h-10 p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-light text-gray-500">Password</label>
                <input
                  type={isHidden ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  maxLength={30}
                  className="w-full mt-1 h-10 p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-light text-gray-500">Confirm Password</label>
                <input
                  type={isHidden ? "password" : "text"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  maxLength={30}
                  className="w-full mt-1 h-10 p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 flex items-center justify-center bg-gray-600 text-white rounded-full font-medium hover:bg-gray-800 transition disabled:bg-gray-400"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* background & loginbox */}
      <div className="flex-1 flex items-center justify-center bg-gray-200 text-black font-poppins select-none min-h-screen">
        <div className="flex rounded-3xl w-4xl h-[680px] bg-white overflow-hidden relative">
          {/* @@@@@@@@@@@@ left box @@@@@@@@@@@@ */}
          <div className="flex flex-1 bg-white flex-col">
            {/* upper section */}
            <div className="flex bg-white flex-5 p-12 flex-col">
              {/* logo */}
              <div className="flex-1 flex items-center justify-center">
                <img src="/images/BAPAGO-logo.png" alt="BAPAGO" className="w-20" />
              </div>

              {/* Log in / To access your account */}
              <div className="flex-2 flex flex-col items-center pt-8">
                <div className="cursor-default font-medium text-[28px] text-gray-700">Log in</div>
                <div className="cursor-default font-light text-[14px] text-gray-500">To access your account</div>
              </div>

              {error && (
                <div className="flex-1 flex justify-center mt-2">
                  <div className="text-red-500 text-sm">{error}</div>
                </div>
              )}

              <form onSubmit={handleLogin}>
                {/* email */}
                <div className="flex-2 flex flex-col justify-center px-4">
                  <label className="text-xs font-light text-gray-500">Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mt-2 h-10 p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-400"
                  />
                </div>

                {/* password */}
                <div className="flex-2 flex flex-col justify-center px-4 mt-4">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-light text-gray-500">Password</label>
                    <div className="flex items-center cursor-pointer" onClick={() => setIsHidden(!isHidden)}>
                      <img src="/images/hide-icon.png" alt="Toggle" className="w-4" />
                      <span className="ml-2 text-sm font-light text-gray-400">{isHidden ? "Show" : "Hide"}</span>
                    </div>
                  </div>
                  <input
                    type={isHidden ? "password" : "text"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    maxLength={30}
                    className="w-full mt-2 h-10 p-3 ring-1 ring-gray-300 rounded-md outline-none focus:ring-2 focus:ring-gray-500"
                  />
                </div>

                {/* I forgot my password */}
                <div className="flex-1 flex justify-center mt-4">
                  <div className="cursor-pointer font-light text-xs text-gray-800 underline">I forgot my password</div>
                </div>

                {/* login bottom */}
                <div className="flex-1 flex justify-center mt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-56 h-12 rounded-full bg-neutral-400 text-white font-normal hover:bg-neutral-500 transition disabled:bg-neutral-300"
                  >
                    {isLoading ? "Logging in..." : "Log in"}
                  </button>
                </div>
              </form>
            </div>

            {/* lower section */}
            <div className="bg-gray-100 flex-2 flex flex-col justify-center items-center">
              <div className="text-xs font-light text-gray-800">Don't have an account?</div>
              <button
                onClick={() => setShowSignUp(true)}
                className="mt-2 w-56 h-12 rounded-full bg-neutral-900 text-neutral-200 font-light hover:bg-neutral-700 transition"
              >
                Create an account
              </button>
              <div className="cursor-pointer font-light text-xs text-neutral-400 mt-2">Continue as guest</div>
            </div>
          </div>

          {/* @@@@@@@@@@@@ right box @@@@@@@@@@@@ */}
          <div className="flex-1 bg-gray-500"></div>
        </div>
      </div>
    </>
  )
}
