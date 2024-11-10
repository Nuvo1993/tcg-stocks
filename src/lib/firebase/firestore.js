import {
  collection,
  onSnapshot,
  query,
  getDocs,
  setDoc,
  deleteDoc,
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
import { getAuth } from "firebase/auth";

import { db } from "@/src/lib/firebase/clientApp";


export async function addCardToUserCollection(cardData) {
  const auth = getAuth();
  const user = auth.currentUser;

  const cardsRef = collection(db, `collections/${user.uid}/cards`);
  const uniqueCardRef = doc(cardsRef); // Generates a unique ID for the card
  await setDoc(uniqueCardRef, cardData);
}

export async function removeCardFromUserCollection(cardId) {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("Removing card with ID:", cardId);
  const cardRef = doc(db, `collections/${user.uid}/cards/${cardId}`);
  await deleteDoc(cardRef);
}



//TODO: Create addCardToWishlist
export async function addCardToWishlist(cardData) {
  const auth = getAuth();
  const user = auth.currentUser;

  const cardsRef = collection(db, `wishlists/${user.uid}/cards`);
  const uniqueCardRef = doc(cardsRef); // Generates a unique ID for the card
  await setDoc(uniqueCardRef, cardData);
}



//TODO: Create removeCardFromWishlist
export async function removeCardFromWishlist(cardId) {
	const auth = getAuth();
	const user = auth.currentUser;
	console.log("Removing card from wishlist with ID:", cardId);

  const cardRef = doc(db, `wishlists/${user.uid}/cards/${cardId}`);
  await deleteDoc(cardRef);
}


//TODO: Create getUsersWishList
export async function getUsersWishList() {
  try {
	const auth = getAuth();
	const user = auth.currentUser;
    const cardsRef = collection(db, `wishlists/${user.uid}/cards`);
    const cardDocs = await getDocs(cardsRef);
    if (!cardDocs.empty) {
      // Directly access document data using .data()
      return cardDocs.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user collection:", error);
    return null;
  }
}

// Retrieve user's collection
export async function getUserCollection() {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    const cardsRef = collection(db, `collections/${user.uid}/cards`);
    const cardDocs = await getDocs(cardsRef);
    console.log("cardDocs", cardDocs);
    if (!cardDocs.empty) {
      // Directly access document data using .data() and include the document ID
      return cardDocs.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user collection:", error);
    return null;
  }
}
