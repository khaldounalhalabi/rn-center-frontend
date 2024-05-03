import ImagePreview from "./ImagePreview";
import { getMedia, Media } from "@/Models/Media";

const Gallery = ({ media }: { media: Media[] | string[] }) => {
  const cols =
    parseInt(`${media.length / 2} `) != 1
      ? parseInt(`${media.length / 2} `)
      : 2;

  return (
    <div
      className={`gap-5 grid grid-cols-${parseInt(`${cols / 2}`)} md:grid-cols-${cols} w-full`}
    >
      {media.map((img, index) => (
        <div key={index} className="h-32">
          <ImagePreview
            src={typeof img == "string" ? img : getMedia(img)}
            className={"h-full w-full object-contain rounded-md cursor-pointer"}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
