"use client";
import React from "react";
import Image from "next/image";
import {
  signInWithGoogle,
  signOut,
} from "@/src/lib/firebase/auth.js";
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

  if (loading) {
    return <div>Loading...</div>; // Show loading state while determining auth status
  }

  return (
    <header>
      {user ? (
        <>
          <div className="profile flex 1 1">
            <div>
              <Image
                src={user.photoURL || "/profile.svg"}
                alt={user.email}
                width={40}
                height={40}
              />
            </div>
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}
