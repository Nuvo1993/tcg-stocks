"use client";
import pokemon from "pokemontcgsdk";
import { useEffect, useState } from "react";
import { Card } from "../../../types/global";
import DisplayCard from "@/src/app/components/DisplayCard";


export default function CardSet({ params }: { params: { card: string } }) {
  const [card, setCard] = useState<Card>();

  useEffect(() => {
    console.log(params.card);
    pokemon.card
      .find(params.card)
      .then((card: any) => {
        console.log(card);
        setCard(card);
      })
      .catch((error: Error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.card]);

  return (<>

  {card && <div>
    <DisplayCard card={card} alt={"sd"}/>
  </div>}</>
  );
}
