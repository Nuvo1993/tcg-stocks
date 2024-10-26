"use client";

import { useUser } from "@/src/app/Context/userContext";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import { DatabaseService } from '@/src/lib/firebase/firestore'
import { DocumentData } from "firebase/firestore";

export default function Profile() {
  const { user, loadingUser } = useUser(); // Access the user and loading state from the context
  const [collection, setCollection] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);

  // list and filter "example" collection records
  useEffect(() => {
    const fetchCollection = async () => {
      if (user) {
        console.log("userID: ", user.uid);
        const userCollection = await DatabaseService.getUserCollection(user.uid);
        console.log("Returned collection: ", userCollection);
        setCollection(userCollection);
      }
      setLoading(false);
    };
    fetchCollection();
  }, []);
  
  if (loadingUser) {
    return <div>Loading...</div>; // Display loading state while checking auth status
  }

  return (
    <div>
      <h1>Your Collection</h1>
      {loadingUser ? (
        <p>Loading...</p>
      ) : collection ? (
        <div>{JSON.stringify(collection)}</div>
      ) : (
        <p>No collection found for {user.displayName}</p>
      )}
    </div>
  );
}
