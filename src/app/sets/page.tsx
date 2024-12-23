"use client";
import Image from "next/image";
import DisplayCard from "../components/DisplayCard";
import pokemon from "pokemontcgsdk";
import { useEffect } from "react";
import { APIResponse, Card, SetType } from "../types/global";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { paginate } from "../helpers/paginate";
import Pagination from "../components/Utility/Pagination";
import Loader from "../components/Utility/Loader";

export default function CardSets() {
  const [sets, setSets] = useState<SetType[]>([]);
  const [filteredSets, setFilteredSets] = useState<SetType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedSets = paginate(filteredSets, currentPage, pageSize);

  useEffect(() => {
    if (sets.length === 0) {
      console.log("pullingData with useEffect");
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
    console.log("Paginating filtered sets: ", filtered);
    const paginateFiltered = paginate(filtered, currentPage, pageSize);
    console.log("After paginate: ", paginateFiltered);
    setFilteredSets(paginateFiltered);
  };

  if (sets.length === 0) {
    console.log("Set length:", sets.length);
    return (
      <div className="flex justify-center items-center h-screen mb-4">
      <Loader></Loader>
      </div>
    );
  } else if (sets.length > 0 && Array.isArray(sets)) {
    return (
      <>
        <SearchBar onSearch={handleSearch} />
        <Pagination
          items={sets.length} // 100
          currentPage={currentPage} // 1
          pageSize={pageSize} // 10
          onPageChange={onPageChange}
        />
        <div className="grid grid-cols-5 gap-4">
          {paginatedSets.map((item: any) => {
            console.log(item);
            return (
              <div key={item.id}>
                <div className="w-full max-w-xs h-48 relative shadow-md hover:shadow-xl">
                  <a href={"/sets/" + item.id}>
                    {" "}
                    <Image
                      src={item.images.logo}
                      alt={item.name}
                      fill={true}
                      style={{ objectFit: "contain" }}
                      className="p-8"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <Pagination
          items={sets.length} // 100
          currentPage={currentPage} // 1
          pageSize={pageSize} // 10
          onPageChange={onPageChange}
        />
      </>
    );
  }
}
