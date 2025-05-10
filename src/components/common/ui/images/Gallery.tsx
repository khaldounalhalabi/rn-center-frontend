"use client";
import ImagePreview from "./ImagePreview";
import { getMedia, Media } from "@/models/Media";
import { MediaService } from "@/services/MediaService";
import { swal } from "@/helpers/UIHelpers";
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
    <div className={`my-10 grid w-full grid-cols-2 gap-6 md:grid-cols-6`}>
      {isMutating ? (
        <LoadingSpin className={"h-7 w-7"} />
      ) : !media || media?.length <= 0 ? (
        <span className="badge badge-neutral text-lg">{t("no_data")}</span>
      ) : (
        media?.map((img, index) => (
          <div key={index} className="relative h-32">
            <div
              onClick={() => {
                return handleDeleteImage(img?.id ?? 0);
              }}
              className={
                "btn btn-circle btn-error btn-xs absolute -left-1 -top-3 cursor-pointer"
              }
            >
              <Trash className={"h-4 w-4 fill-white stroke-error"} />
            </div>
            <ImagePreview
              src={getMedia(img)}
              className={
                "h-full w-full cursor-pointer rounded-md object-contain"
              }
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Gallery;
