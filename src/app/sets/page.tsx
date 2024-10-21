"use client";
import Image from "next/image";
import DisplayCard from "../components/DisplayCard";
import pokemon from "pokemontcgsdk";
import { useEffect } from "react";
import { APIResponse, Card, SetType } from "../types/global";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function CardSets() {
  const [sets, setSets] = useState<SetType[]>([]);
  const [filteredSets, setFilteredSets] = useState<SetType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (sets.length === 0) {
      console.log("pullingData with useEffect")
      pokemon.set
        .all()
        .then((set: SetType[]) => {
          setSets(set);
          setFilteredSets(set);
        })
        .catch((error: Error) => {
          setSets([]);
        });
    }
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = sets.filter((set) =>
      set.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredSets(filtered);
  };

  if (sets.length === 0) {
    console.log("Set length:", sets.length);
    return <div>Loading...</div>;
  } else if (sets.length > 0 && Array.isArray(sets)) {
    const setList = filteredSets.map((sets) => (
      <div key={sets.id} className="flex justify-center items-center">
        <a href={"/sets/" + sets.id}>
          {" "}
          <Image
            src={sets.images.logo}
            alt={sets.name}
            width={200}
            height={50}
            style={{ objectFit: "contain" }}
          />
        </a>
      </div>
    ));

    return (
      <>
        <SearchBar onSearch={handleSearch} />
        {/* <div className="columns-3 hover:columns-3">
          <ul>{setList}</ul>
        </div> */}
        <div className="grid grid-cols-5 gap-4">{setList}</div>
      </>
    );
  }
}
