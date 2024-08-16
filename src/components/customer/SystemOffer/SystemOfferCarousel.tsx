"use client";
import { SystemOffersService } from "@/services/SystemOffersService";
import { useInfiniteQuery } from "@tanstack/react-query";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";
import { getMedia } from "@/Models/Media";

const SystemOfferCarousel = () => {
  const { data, fetchNextPage, hasNextPage, isPending } = useInfiniteQuery({
    queryKey: ["system_offers_carousel"],
    queryFn: async ({ pageParam }) =>
      await SystemOffersService.make<SystemOffersService>(
        "public",
      ).indexWithPagination(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return !lastPage.paginate?.isLast
        ? lastPage.paginate?.currentPage
          ? lastPage.paginate?.currentPage + 1
          : null
        : null;
    },
  });
  const options: EmblaOptionsType = {
    align: "start",
    dragFree: true,
    loop: true,
  };
  const slides_count = 5;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <div className="md:max-h-[30vh] w-full !overflow-hidden">
      <section className="embla md:max-h-[30vh]">
        <div className="embla__viewport md:max-h-[30vh]" ref={emblaRef}>
          <div className="embla__container">
            {isPending && (
              <div className="embla__slide">
                <div className="embla__slide__number">
                  <div className="card cursor-pointer bg-base-100 w-52 md:w-full h-full shadow-xl">
                    <div className="skeleton w-full h-52"></div>
                  </div>
                </div>
              </div>
            )}
            {isPending && (
              <div className="embla__slide">
                <div className="embla__slide__number">
                  <div className="card cursor-pointer bg-base-100 w-52 md:w-full h-full shadow-xl">
                    <div className="skeleton w-full h-52"></div>
                  </div>
                </div>
              </div>
            )}
            {isPending && (
              <div className="embla__slide">
                <div className="embla__slide__number">
                  <div className="card cursor-pointer bg-base-100 w-52 md:w-full h-full shadow-xl">
                    <div className="skeleton w-full h-52"></div>
                  </div>
                </div>
              </div>
            )}
            {isPending && (
              <div className="embla__slide">
                <div className="embla__slide__number">
                  <div className="card cursor-pointer bg-base-100 w-52 md:w-full h-full shadow-xl">
                    <div className="skeleton w-full h-52"></div>
                  </div>
                </div>
              </div>
            )}
            {data?.pages.map((page) =>
              page.data.map((offer) => (
                <div key={offer.id} className="embla__slide">
                  <div className="embla__slide__number">
                    <img
                      className="h-full w-full"
                      src={getMedia(offer?.image?.[0])}
                      draggable={false}
                    />
                  </div>
                </div>
              )),
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SystemOfferCarousel;
