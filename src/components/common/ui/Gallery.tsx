import ImagePreview from "./ImagePreview";
import { Media, getMedia } from "@/Models/Media";

const Gallery = ({ media }: { media: Media[]|string[] }) => {
  const cols = parseInt(`${media.length / 2}`);

  return (
    <div
      className={`gap-5 grid grid-cols-${parseInt(`${cols / 2}`)} md:grid-cols-${cols} w-full`}
    >
      {media.map((img, index) => (
        <div key={index} className="h-32">
          <ImagePreview
              // @ts-ignore
            src={getMedia(img)}
            className={"h-full w-full object-cover rounded-md cursor-pointer"}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
