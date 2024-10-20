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

  return (
    <>
      <div className="max-w-40 card-container">
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
    </>
  );
}
