"use client";

import { useUser } from "@/src/app/Context/userContext";

export default function Profile() {
  const { user, loading } = useUser(); // Access the user and loading state from the context

  if (loading) {
    return <div>Loading...</div>; // Display loading state while checking auth status
  }

  return (
    <>
      {user ? (
        <div className="news">Welcome back, {user.displayName}</div>
      ) : (
        <div className="news">Please login to view</div>
      )}
    </>
  );
}
