import { list } from "firebase/storage";
import { Card } from "../types/global";
import DisplayCard from "./DisplayCard";

export default function CardList({
  listType,
  cards,
}: {
  listType: string;
  cards: Card[];
}) {
  return (
    <>
      <p className="text-2xl">{listType}</p>
      <div className="grid grid-cols-3">
        {cards.map((card: Card) => {
          return (
            <div key={card.id} className="card">
              <DisplayCard card={card} alt={card.name} />
            </div>
          );
        })}
      </div>
    </>
  );
}
