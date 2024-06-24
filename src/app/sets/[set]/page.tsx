// app/sets/[set]/page.tsx
"use client";
import pokemon from "pokemontcgsdk";
import { useState, useEffect } from "react";
import { Card, APIResponse } from "../../types/global";
import SearchBar from "../../components/SearchBar";
import DisplayCard from "../../components/DisplayCard";

export default function CardSet({ params }: { params: { set: string } }) {
  const [cards, setCards] = useState<Card[]>([]);
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response: APIResponse<Card[]> = await pokemon.card.where({
          q: "set.id:" + params.set,
          pageSize: 50,
        });
        setCards(response.data);
        setFilteredCards(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCards();
  }, [params.set]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = cards.filter(card => card.name.toLowerCase().includes(term.toLowerCase()));
    setFilteredCards(filtered);
  };

  const cardList = filteredCards.map((card) => (
    <li key={card.id}>
      <DisplayCard card={card} alt={card.name} />
      <a href={"/sets/" + params.set + "/" + card.id}>{card.name}</a>
    </li>
  ));

  return (
    <>
      <div>
        <SearchBar onSearch={handleSearch} />
        <ul className="columns-3 ..."> {cardList}</ul>
      </div>
    </>
  );
}
