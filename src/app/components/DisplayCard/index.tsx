import Image from "next/image";
import { useEffect, useState } from "react";
import profilePic from "@/public/charizard.webp";
import "./style.css";
import { Card } from "../../types/global";
import Skeleton from "react-loading-skeleton";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/solid";
import { addCardToUserCollection } from "@/src/lib/firebase/firestore";

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
          <a href={"/sets/" + card.set + "/" + card.id}>
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
          </a>
        </div>
        <div className="grid-cols-1 ml-2 mb-2">
          <div className="text-base font-bold">{card.name}</div>
          <div>{card.set.name}</div>
          <div>${card.cardmarket.prices.averageSellPrice}</div>
          <div className="flex justify-between">
            <button onClick={async () => await addCardToUserCollection(card)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              <svg
                className="svg-icon w-6 h-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.727,7.292c0.078,0.078,0.186,0.125,0.304,0.125c0.119,0,0.227-0.048,0.304-0.125l1.722-1.722c0.078-0.078,0.126-0.186,0.126-0.305c0-0.237-0.192-0.43-0.431-0.43c-0.118,0-0.227,0.048-0.305,0.126l-0.986,0.987V1.822c0-0.237-0.193-0.43-0.431-0.43s-0.431,0.193-0.431,0.43v4.126L8.614,4.961C8.537,4.884,8.429,4.835,8.31,4.835c-0.238,0-0.43,0.193-0.43,0.43c0,0.119,0.048,0.227,0.126,0.305L9.727,7.292z M18.64,8.279H1.423c-0.475,0-0.861,0.385-0.861,0.86V10c0,0.476,0.386,0.861,0.861,0.861h0.172l1.562,7.421l0.008-0.002c0.047,0.187,0.208,0.328,0.41,0.328h12.912c0.201,0,0.362-0.142,0.409-0.328l0.009,0.002l1.562-7.421h0.173c0.475,0,0.86-0.386,0.86-0.861V9.139C19.5,8.664,19.114,8.279,18.64,8.279 M2.475,10.861h2.958l0.271,1.721H2.837L2.475,10.861z M3.018,13.443h2.823l0.271,1.722H3.38L3.018,13.443z M3.924,17.747l-0.362-1.722h2.687l0.271,1.722H3.924z M9.601,17.747H7.38l-0.271-1.722h2.491V17.747z M9.601,15.165H6.973l-0.271-1.722h2.899V15.165z M9.601,12.582H6.565l-0.271-1.721h3.307V12.582z M12.682,17.747h-2.22v-1.722h2.491L12.682,17.747z M13.09,15.165h-2.628v-1.722h2.899L13.09,15.165z M10.462,12.582v-1.721h3.307l-0.271,1.721H10.462z M16.139,17.747h-2.596l0.271-1.722H16.5L16.139,17.747z M16.683,15.165H13.95l0.271-1.722h2.823L16.683,15.165z M17.226,12.582h-2.867l0.271-1.721h2.958L17.226,12.582z M18.64,10H1.423V9.139H18.64V10z"></path>
              </svg>
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              <svg
                className="svg-icon w-6 h-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.22,2.984c-1.125,0-2.504,0.377-3.53,1.182C8.756,3.441,7.502,2.984,6.28,2.984c-2.6,0-4.714,2.116-4.714,4.716c0,0.32,0.032,0.644,0.098,0.96c0.799,4.202,6.781,7.792,7.46,8.188c0.193,0.111,0.41,0.168,0.627,0.168c0.187,0,0.376-0.041,0.55-0.127c0.011-0.006,1.349-0.689,2.91-1.865c0.021-0.016,0.043-0.031,0.061-0.043c0.021-0.016,0.045-0.033,0.064-0.053c3.012-2.309,4.6-4.805,4.6-7.229C17.935,5.1,15.819,2.984,13.22,2.984z M12.544,13.966c-0.004,0.004-0.018,0.014-0.021,0.018s-0.018,0.012-0.023,0.016c-1.423,1.076-2.674,1.734-2.749,1.771c0,0-6.146-3.576-6.866-7.363C2.837,8.178,2.811,7.942,2.811,7.7c0-1.917,1.554-3.47,3.469-3.47c1.302,0,2.836,0.736,3.431,1.794c0.577-1.121,2.161-1.794,3.509-1.794c1.914,0,3.469,1.553,3.469,3.47C16.688,10.249,14.474,12.495,12.544,13.966z"></path>
              </svg>
            </button>

            {/* Wishlist Button */}
          </div>
        </div>
      </div>
    </>
  );
}
