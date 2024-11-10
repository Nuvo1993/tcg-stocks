"use client";

import { useUser } from "@/src/app/Context/userContext";
import { use, useEffect, useState } from "react";
import {
  getUserCollection,
  getUsersWishList,
  removeCardFromUserCollection,
} from "@/src/lib/firebase/firestore";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import CardList from "../components/CardList";
import { Card } from "../types/global";

export default function Profile() {
  const { user, loadingUser } = useUser(); // Access the user and loading state from the context
  const [collection, setCollection] = useState<DocumentData | null>(null);
  const [wishlist, setWishlist] = useState<DocumentData | null>(null);

  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // list and filter "example" collection records
  useEffect(() => {
    const fetchCollection = async () => {
      if (user) {
        const userCollection = await getUserCollection();
        console.log("Returned collection: ", userCollection);
        setCollection(userCollection);
      }
      setLoading(false);
    };
    fetchCollection();
  }, [user]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const userWishlist = await getUsersWishList();
        console.log("Returned wishlist: ", userWishlist);
        setWishlist(userWishlist);
      }
      setLoading(false);
    };
    fetchWishlist();
  }, [user]);

  if (loadingUser) {
    return <div>Loading...</div>; // Display 4loading state while checking auth status
  }

  return (
    <div>
      {loadingUser ? (
        <p>Loading user profile...</p>
      ) : collection && wishlist ? (
        <>
          <CardList listType={"Collection"} cards={collection as Card[]} />
            <CardList listType={"Wishlist"} cards={wishlist as Card[]} />
        </>
      ) : (
        <>
          {user ? (
            <div>
              <h1>Welcome, {user.displayName}</h1>
              <p>Here you can view your collection of cards</p>
            </div>
          ) : (
            <div>
              <h1>Welcome, guest</h1>
              <p>Sign in to view your collection of cards</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
