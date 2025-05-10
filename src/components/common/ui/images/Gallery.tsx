"use client";
import ImagePreview from "./ImagePreview";
import { getMedia, Media } from "@/Models/Media";
import { MediaService } from "@/services/MediaService";
import { swal } from "@/Helpers/UIHelpers";
import { useState, useTransition } from "react";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import Trash from "@/components/icons/Trash";

const Gallery = ({ media }: { media: Media[] | undefined }) => {
  const t = useTranslations("components");
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
    <div className={`my-10 grid gap-6 grid-cols-2 md:grid-cols-6 w-full`}>
      {isMutating ? (
        <LoadingSpin className={"w-7 h-7"} />
      ) : !media || media?.length <= 0 ? (
        <span className="text-lg badge badge-neutral">{t("no_data")}</span>
      ) : (
        media?.map((img, index) => (
          <div key={index} className="h-32 relative">
            <div
              onClick={() => {
                return handleDeleteImage(img?.id ?? 0);
              }}
              className={
                "btn btn-circle btn-error btn-xs absolute -top-3 -left-1 cursor-pointer"
              }
            >
              <Trash className={"w-4 h-4 fill-white stroke-error"} />
            </div>
            <ImagePreview
              src={getMedia(img)}
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
