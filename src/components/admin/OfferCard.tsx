import { getMedia, Media } from "@/Models/Media";

const OfferCard = ({ image }: { image?: Media }) => {
  return (
    <div className="card cursor-pointer w-52 md:w-full h-full shadow-xl  object-contain">
      <figure className="h-full w-full object-contain">
        <img src={getMedia(image)} className="rounded-xl" draggable={false} />
      </figure>
    </div>
  );
};

export default OfferCard;
