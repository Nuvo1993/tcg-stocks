import Image from "next/image";
import { useEffect, useState } from "react";
import profilePic from "@/public/charizard.webp";
import "./style.css";
import { Card } from "../../types/global";
import Skeleton from "react-loading-skeleton";

export default function DisplayCard({
  card,
  alt,
}: {
  alt: string;
  card: Card;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  console.log(card);
  return (
    <>
    <div className="flex 1 1">
      <div className="max-w-40 card-container mb-4">
      {!imageLoaded && <Skeleton height={250} width={180} />}
        <Image
          key={card.images.large}
          src={card.images.large}
          alt={alt}
          width={400}
          height={550}
          layout="intrinsic"
          loading="eager" // Disable lazy loading
          className="max-w-96 max-h-96 displayCard"
          onLoadingComplete={() => {
            console.log("Image loaded:", card.images.large);
            setImageLoaded(true);
          }}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
      </div>
      <div className="grid-cols-1 ml-2 mb-2">
        <div className="text-base font-bold">{card.name}</div>
        <div>{card.set.name}</div>
        <div>${card.cardmarket.prices.averageSellPrice}</div>
      </div>
      </div>
    </>
  );
}
