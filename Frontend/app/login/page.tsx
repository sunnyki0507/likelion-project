"use client"

import { useState } from "react";


export default function Login() {
    const [isHidden, setIsHidden] = useState(false);

    return (
        <>
            {/* background & loginbox*/}
            <div className="flex-1 flex items-center justify-center bg-gray-200 text-black font-poppins select-none">
                <div className="flex rounded-3xl w-4xl h-[680px] bg-white overflow-hidden">


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
                                <div className="flex flex-1">
                                    <div className="cursor-default font-medium text-[28px] space-x-0 text-gray-700">Log in</div>
                                </div>
                                <div className="flex flex-1">
                                    <div className="cursor-default font-light text-[14px] text-gray-500">To access your account</div>
                                </div>
                            </div>

                            {/* email */}
                            <div className="flex-2 flex justify-center flex-col">
                                <div className="cursor-default font-light text-xs text-gray-500">Email or mobile phone number</div>
                                <input className="font-light text-xs my-2 h-10 outline-none ring-1 
                                ring-gray-300 transition p-3 focus:ring-gray-400 focus:ring-2  rounded-md"
                                    type="text" />
                            </div>

                            {/* password */}
                            <div className="flex-2 flex justify-center flex-col mt-2">
                                <div className="flex justify-between">
                                    <div className="cursor-default font-light text-xs text-gray-500 mt-1">Password</div>

                                    {/* hide button */}
                                    <div className="flex cursor-pointer" onClick={() => setIsHidden(!isHidden)}>
                                        <div><img src="/images/hide-icon.png" alt="BAPAGO" className="w-4 mt-1" /></div>
                                        <div className="font-light text-sm text-gray-400 mx-2">{isHidden ? "Hide" : "Show"}</div>
                                    </div>
                                </div>
                                <input className="font-light text-xs my-2 h-10 outline-none ring-1 
                                ring-gray-300 transition p-3 focus:ring-gray-500 focus:ring-2 rounded-md"
                                    type={isHidden ? "text" : "password"}
                                    maxLength={30}
                                />

                            </div>

                            {/* I forgot my password */}
                            <div className="flex-1 flex justify-center">
                                <div className="cursor-pointer font-light text-xs text-gray-800 underline">I forgot my password</div>
                            </div>

                            {/* login bottom */}
                            <div className="flex-1 flex justify-center">
                                <button type="submit" className="cursor-pointer font-normal rounded-full bg-neutral-400 w-56 h-12 text-white hover:bg-neutral-500 transition">Log in</button>
                            </div>
                        </div>


                        {/* lower section */}
                        <div className="bg-gray-100 flex-2 flex flex-col justify-center items-center">
                            <div className="font-light text-xs text-gray-800">Don't have an account?</div>
                            <button type="submit" className="cursor-pointer font-light rounded-full bg-neutral-900 w-56 h-12 text-neutral-200 m-4 hover:bg-neutral-700 transition">Create an account</button>
                            <div className="cursor-pointer font-light text-xs text-neutral-400">Continue as guest</div>
                        </div>
                    </div>


                    {/* @@@@@@@@@@@@ right box @@@@@@@@@@@@ */}
                    <div className="flex-1 bg-gray-500">
                        {/* image */}
                        <div></div>
                    </div>


                </div>
            </div>
        </>
    )

}