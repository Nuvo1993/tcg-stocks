"use client";

import { useUser } from "@/src/app/Context/userContext";
import { use, useEffect, useState } from "react";
import {
  getUserCollection,
  removeCardFromUserCollection,
} from "@/src/lib/firebase/firestore";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";

export default function Profile() {
  const { user, loadingUser } = useUser(); // Access the user and loading state from the context
  const [collection, setCollection] = useState<DocumentData | null>(null);
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
  }, [user, collection]);

  if (loadingUser) {
    return <div>Loading...</div>; // Display 4loading state while checking auth status
  }

  return (
    <div>
      <h1>Your Collection</h1>
      {loadingUser ? (
        <p>Loading...</p>
      ) : collection ? (
        <>
          {Object.keys(collection).map((key) => {
            const card = collection[key];
            console.log("Key: ", key);
            return (
              <div className="max-w-40" key={card.docId}>
                <Image
                  key={card.images.large}
                  src={card.images.large}
                  alt={"alt text"}
                  width={400}
                  height={550}
                  layout="intrinsic"
                  loading="eager" // Disable lazy loading
                  className="max-w-96 max-h-96 displayCard"
                  onLoadingComplete={() => {
                    console.log("Image loaded:", card.images.large);
                    setImageLoaded(true);
                  }}
                  style={{ display: imageLoaded ? "block" : "none" }}
                />
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                  onClick={async () =>
                    await removeCardFromUserCollection(card.docId)
                  }
                >
                  <svg
                    className="svg-icon w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M7.836,2.722h4.389c0.242,0,0.439-0.196,0.439-0.439s-0.197-0.439-0.439-0.439H7.836c-0.242,0-0.438,0.196-0.438,0.439S7.595,2.722,7.836,2.722 M18.81,6.672H1.253c-0.484,0-0.878,0.394-0.878,0.878v0.878c0,0.485,0.394,0.877,0.878,0.877h0.176l1.593,7.569l0.008-0.003c0.048,0.191,0.213,0.335,0.418,0.335h13.168c0.205,0,0.369-0.144,0.418-0.335l0.008,0.003l1.593-7.569h0.176c0.484,0,0.878-0.393,0.878-0.877V7.55C19.688,7.065,19.294,6.672,18.81,6.672 M2.325,9.305h3.017l0.277,1.756H2.694L2.325,9.305z M2.879,11.939h2.878l0.277,1.755H3.249L2.879,11.939z M3.803,16.328l-0.369-1.756h2.739l0.277,1.756H3.803z M9.592,16.328H7.328l-0.277-1.756h2.542V16.328z M9.592,13.694h-2.68l-0.277-1.755h2.957V13.694z M9.592,11.062H6.497L6.22,9.305h3.373V11.062z M12.734,16.328H10.47v-1.756h2.542L12.734,16.328zM13.15,13.694h-2.68v-1.755h2.957L13.15,13.694z M10.47,11.062V9.305h3.373l-0.277,1.756H10.47z M16.259,16.328h-2.646l0.277-1.756h2.739L16.259,16.328z M16.813,13.694h-2.785l0.276-1.755h2.878L16.813,13.694z M17.368,11.062h-2.925l0.277-1.756h3.018L17.368,11.062z M18.81,8.428H1.253V7.55H18.81V8.428z"></path>
                  </svg>
                </button>
              </div>
            );
          })}
        </>
      ) : (
        <p>No collection found for {user.displayName}</p>
      )}
    </div>
  );
}
