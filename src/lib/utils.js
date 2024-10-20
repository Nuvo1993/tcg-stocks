
"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "@/src/lib/firebase/clientApp.js";
import { useRouter } from "next/navigation";


export function randomNumberBetween(min = 0, max = 1000) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomDateBefore(startingDate = new Date()) {
	const randomNumberOfDays = randomNumberBetween(20, 80);
	const randomDate = new Date(
		startingDate - randomNumberOfDays * 24 * 60 * 60 * 1000
	);
	return randomDate;
}

export function getRandomDateAfter(startingDate = new Date()) {
	const randomNumberOfDays = randomNumberBetween(1, 19);
	const randomDate = new Date(
		startingDate.getTime() + randomNumberOfDays * 24 * 60 * 60 * 1000
	);
	return randomDate;
}

export function useUser() {
	const [user, setUser] = useState();
  
	useEffect(() => {
	  const unsubscribe = onAuthStateChanged(auth, (authUser) => {
		setUser(authUser);
	  });
  
	  return () => unsubscribe();
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
  
	return user;
  }