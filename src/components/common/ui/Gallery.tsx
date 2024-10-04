"use client";
import ImagePreview from "./ImagePreview";
import { getMedia, Media } from "@/Models/Media";
import XMark from "@/components/icons/XMark";
import { MediaService } from "@/services/MediaService";
import { swal } from "@/Helpers/UIHelpers";
import { useState, useTransition } from "react";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { useRouter } from "@/navigation";

const Gallery = ({ media }: { media: Media[] | string[] }) => {
  const [isPending, setPending] = useState<boolean>(false);
  const [isTransitionStarted, startTransition] = useTransition();
  const isMutating: boolean = isPending || isTransitionStarted;
  let router = useRouter();

  const handleDeleteImage = (index: number) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't to Delete This Image!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          return await MediaService.make<MediaService>()
            .delete(index)
            .then((res) => {
              setPending(true);
              startTransition(router.refresh);
              setPending(false);
              return res;
            });
        }
      });
  };

  return (
    <div
      className={`my-10 grid gap-6 grid-cols-2 md:grid-cols-6 w-full`}
    >
      {isMutating ? (
        <LoadingSpin className={"w-7 h-7"} />
      ) : (
        media.map((img, index) => (
          <div key={index} className="h-32 relative">
            <div
              onClick={() => {
                // @ts-ignore
                return handleDeleteImage(img?.id ?? 0);
              }}
              className={
                "rounded-full border-[1px] hover:bg-gray-300 absolute  w-fit border-gray-600 cursor-pointer p-1"
              }
            >
              <XMark className={"w-4 h-4 fill-error stroke-error"} />
            </div>
            <ImagePreview
              src={typeof img == "string" ? img : getMedia(img)}
              className={
                "h-full w-full object-contain rounded-md cursor-pointer"
              }
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Gallery;