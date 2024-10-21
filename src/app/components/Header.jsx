"use client";
import React from "react";
import Image from "next/image";
import { signInWithGoogle, signOut } from "@/src/lib/firebase/auth.js";
import { useUser } from "@/src/app/Context/userContext"; // Use the UserContext

export default function Header() {
  const { user, loading } = useUser(); // Access the user and loading state from the context

  const handleSignOut = (event) => {
    event.preventDefault();
    signOut(); // Trigger Firebase sign-out
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    signInWithGoogle(); // Trigger Firebase sign-in
  };

  return (
    <nav className="">
      <div className="flex flex-wrap text-lg items-center text-white ">
      <div className="ml-2 mb-2">
          <a href="/">
            {" "}
            <Image
              src={"/temp-logo.png"}
              alt="logo"
              width={240}
              height={120}
            ></Image>
          </a>
        </div>
        <div className="flex justify-start max-w-screen-md">
 
        <div className="ml-4 mb-2 hover:ring-4">
          <a href="/sets" className="">
            Sets
          </a>
        </div>
        <div className="ml-4 mb-2 hover:ring-4">
          <a href="/news">News</a>
        </div>
        <div className="ml-4 mb-2 hover:ring-4">
          <a href="/portfolio">Portfolio</a>
        </div>
        </div>
        <div className="flex justify-end grow mr-2">
          {user ? (
            <>
              <div className="profile flex 1 1">
                <div>
                  <Image
                    src={user.photoURL || "/profile.svg"}
                    alt={user.email}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-2"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="profile">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
