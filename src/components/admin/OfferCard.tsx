import { getMedia, Media } from "@/Models/Media";

const OfferCard = ({ image }: { image?: Media }) => {
  return (
    <div className="card cursor-pointer bg-base-100 w-52 md:w-full h-full shadow-xl">
      <figure>
        <img src={getMedia(image)} className="rounded-xl" draggable={false} />
      </figure>
    </div>
  );
};

export default OfferCard;
