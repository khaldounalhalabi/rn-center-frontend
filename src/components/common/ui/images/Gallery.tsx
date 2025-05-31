"use client";
import ImagePreview from "./ImagePreview";
import { getMedia, Media } from "@/models/Media";
import { MediaService } from "@/services/MediaService";
import { useState, useTransition } from "react";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import Trash from "@/components/icons/Trash";
import { Badge } from "@/components/ui/shadcn/badge";
import Alert from "@/components/common/ui/Alert";

const Gallery = ({ media ,sm = false}: { media: Media[] | undefined , sm?:boolean}) => {
  const t = useTranslations("components");
  const [isPending, setPending] = useState<boolean>(false);
  const [isTransitionStarted, startTransition] = useTransition();
  const isMutating: boolean = isPending || isTransitionStarted;
  let router = useRouter();

  const handleDeleteImage = (index: number) => {
    setPending(true);
    MediaService.make()
      .delete(index)
      .then((res) => {
        startTransition(router.refresh);
        setPending(false);
        return res;
      });
  };

  return (
    <div className={`my-10 grid w-full grid-cols-2 gap-6 ${sm ? "grid-cols-3" : "md:grid-cols-6"}`}>
      {isMutating ? (
        <LoadingSpin className={"h-7 w-7"} />
      ) : !media || media?.length <= 0 ? (
        <Badge variant={"secondary"}>{t("no_data")}</Badge>
      ) : (
        media?.map((img, index) => (
          <div key={index} className="relative h-32">
            <Alert
              trigger={
                <div
                  className={
                    "absolute -start-1 -top-3 z-30 p-1 bg-destructive cursor-pointer rounded-md"
                  }
                >
                  {isPending ? <LoadingSpin /> : <Trash />}
                </div>
              }
              title={t("are_you_sure")}
              description={t("delete_question")}
              onConfirm={() => {
                handleDeleteImage(img?.id ?? 0);
              }}
            />
            <ImagePreview
              src={getMedia(img)}
              className={
                "h-full w-full cursor-pointer rounded-md object-contain"
              }
              alt={""}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Gallery;
