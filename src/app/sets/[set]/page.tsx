// app/sets/[set]/page.tsx
"use client";
import pokemon from "pokemontcgsdk";
import { useState, useEffect } from "react";
import { Card, APIResponse } from "../../types/global";
import SearchBar from "../../components/SearchBar";
import DisplayCard from "../../components/DisplayCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "../../components/Utility/Loader";

export default function CardSet({ params }: { params: { set: string } }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response: APIResponse<Card[]> = await pokemon.card.where({
          q: "set.id:" + params.set, //set being the set name, confusing I know
          pageSize: 30,
          page: currentPage,
        });
        setCards(response.data);
        setFilteredCards(response.data);
        setTotalPages(Math.ceil(response.totalCount / 50)); // Assuming `response.totalCount` gives the total number of cards
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, [params.set, currentPage]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = cards.filter((card) =>
      card.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const cardList = filteredCards.map((card) => (
    <div key={card.id} className="mt-4">
      {" "}
      <DisplayCard card={card} alt={card.name} />
    </div>
  ));

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div>
        {cardList.length === 0 ? (
          <div className="flex justify-center items-center h-screen mb-4">
            <Loader></Loader>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 grid-flow-row justify-items-start">
            {cardList}
            <div className="pagination-controls">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
