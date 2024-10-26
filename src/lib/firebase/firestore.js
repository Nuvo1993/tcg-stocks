import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
  getFirestore,
} from "firebase/firestore";

import { db } from "@/src/lib/firebase/clientApp";

export async function updateRestaurantImageReference(
  restaurantId,
  publicImageUrl
) {
  const restaurantRef = doc(collection(db, "restaurants"), restaurantId);
  if (restaurantRef) {
    await updateDoc(restaurantRef, { photo: publicImageUrl });
  }
}

const updateWithRating = async (
  transaction,
  docRef,
  newRatingDocument,
  review
) => {
  return;
};

export async function addReviewToRestaurant(db, restaurantId, review) {
  return;
}

function applyQueryFilters(q, { category, city, price, sort }) {
  return;
}

export async function getRestaurants(db = db, filters = {}) {
  return [];
}

export function getRestaurantsSnapshot(cb, filters = {}) {
  return;
}

export async function getRestaurantById(db, restaurantId) {
  if (!restaurantId) {
    console.log("Error: Invalid ID received: ", restaurantId);
    return;
  }
  const docRef = doc(db, "restaurants", restaurantId);
  const docSnap = await getDoc(docRef);
  return {
    ...docSnap.data(),
    timestamp: docSnap.data().timestamp.toDate(),
  };
}

export function getRestaurantSnapshotById(restaurantId, cb) {
  return;
}

export async function getReviewsByRestaurantId(db, restaurantId) {
  if (!restaurantId) {
    console.log("Error: Invalid restaurantId received: ", restaurantId);
    return;
  }

  const q = query(
    collection(db, "restaurants", restaurantId, "ratings"),
    orderBy("timestamp", "desc")
  );

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      // Only plain objects can be passed to Client Components from Server Components
      timestamp: doc.data().timestamp.toDate(),
    };
  });
}

export function getReviewsSnapshotByRestaurantId(restaurantId, cb) {
  if (!restaurantId) {
    console.log("Error: Invalid restaurantId received: ", restaurantId);
    return;
  }

  const q = query(
    collection(db, "restaurants", restaurantId, "ratings"),
    orderBy("timestamp", "desc")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const results = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
        // Only plain objects can be passed to Client Components from Server Components
        timestamp: doc.data().timestamp.toDate(),
      };
    });
    cb(results);
  });
  return unsubscribe;
}

export async function addFakeRestaurantsAndReviews() {
  const data = await generateFakeRestaurantsAndReviews();
  for (const { restaurantData, ratingsData } of data) {
    try {
      const docRef = await addDoc(
        collection(db, "restaurants"),
        restaurantData
      );

      for (const ratingData of ratingsData) {
        await addDoc(
          collection(db, "restaurants", docRef.id, "ratings"),
          ratingData
        );
      }
    } catch (e) {
      console.log("There was an error adding the document");
      console.error("Error adding document: ", e);
    }
  }
}

export const DatabaseService = {
  // Save or update user's collection
  async saveUserCollection(userId, collection) {
    const userCollectionRef = doc(db, "collections", userId);
    await setDoc(userCollectionRef, { collection });
  },

  // Retrieve user's collection
  async getUserCollection(userId) {
    try {
      const userDocRef = doc(db, "collections", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Directly access document data using .data()
        const data = userDoc.data();
        console.log("Fetched user collection data:", data); // Should log your fields directly
        return data; // Returns the object with fields as key-value pairs
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user collection:", error);
      return null;
    }
  },
};
