import Image from "next/image";
import profilePic from '@/public/charizard.webp'
import './style.css';
import { Card } from "../../types/global";

export default function DisplayCard({card, alt}: {alt: string, card: Card}) {
  return (
    <>
    
      <div className="max-w-40">
        <Image
        src={card.images.large}
        alt={alt}
        width={400}
        height={550}  
        layout="intrinsic"
        className="max-w-96 max-h-96 displayCard"
        />
      </div>
      <div className="max-w-40">
        <div>Name: </div>
      </div>
    </>
  );
}
