"use client";
import Image from "next/image";
import DisplayCard from "../components/DisplayCard";
import pokemon from "pokemontcgsdk";
import { useEffect } from "react";
import { APIResponse, Card, SetType } from "../types/global";
import { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function CardSets() {
  const [filteredSets, setFilteredSets] = useState<SetType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    if (searchTerm) {
      console.log("Setting set: ", searchTerm);
      pokemon.set
        .where({ q: "name:" + searchTerm.toLowerCase() + "*", pageSize: 10 })
        .then((set: APIResponse<SetType[]>) => {
          console.log("Setting set1: ", set);
          console.log("Set length", set.data.length);
          if (set.data.length === 0) {
            setFilteredSets([]);
          }
          setFilteredSets(set.data);
        })
        .catch((error: Error) => {
          console.log("Setting set2: ", error);
          setFilteredSets([]);
        });
    } else {
      pokemon.set
        .all()
        .then((set: SetType[]) => {
          console.log("Setting set3: ", set);
          setFilteredSets(set);
        })
        .catch((error: Error) => {
          console.log("Setting set4: ", error);
          setFilteredSets([]);
        });
    }
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = filteredSets.filter(set => set.name.toLowerCase().includes(term.toLowerCase()));
    setFilteredSets(filtered);
  };

  if (filteredSets.length === 0) {
    return <div>Loading...</div>;
  } else if (filteredSets.length > 0 && Array.isArray(filteredSets)){
    console.log("Filtered sets: ", filteredSets); 
    const setList = filteredSets.map((set) => (
      <li key={set.id}>
        <Image
          src={set.images.logo}
          alt={set.name}
          layout="intrinsic"
          width={100}
          height={100}
        />
        <a href={"/sets/" + set.id}>{set.name}</a>
      </li>
    ));

    return (
      <>
        <SearchBar onSearch={handleSearch} />
        <div className="columns-3 ... hover:columns-3">
          <ul>{setList}</ul>
        </div>
      </>
    );
  }else{
    
  }
}
