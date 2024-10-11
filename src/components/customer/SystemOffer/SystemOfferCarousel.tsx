"use client";
import { SystemOffersService } from "@/services/SystemOffersService";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "./embla.css";

const SystemOfferCarousel = () => {
  const { data, isPending, isLoading } = useQuery({
    queryKey: ["system_offers_carousel"],
    queryFn: async () => {
      return await SystemOffersService.make<SystemOffersService>(
        "public",
      ).indexWithPagination(1, undefined, undefined, undefined, 5);
    },
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  return (
    <div className="my-4  h-[23vh] md:h-[25vh] xl:h-[28vh]  ">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container">
          {isLoading ? (
            <>
              <div
                className={
                  "skeleton mx-2 w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw]"
                }
              ></div>
              <div
                className={
                  "skeleton mx-2 w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw] "
                }
              ></div>
              <div
                className={
                  "skeleton mx-2 w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw] md:block hidden"
                }
              ></div>
              <div
                className={
                  "skeleton mx-2 w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw] md:block hidden"
                }
              ></div>
            </>
          ) : (
            data?.data.map((offer, index) => (
              <div
                className="mx-2 w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw]"
                key={index}
              >
                <div
                  className={
                    "  w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw]               h-[23vh] md:h-[25vh] xl:h-[28vh] "
                  }
                >
                  <img
                    className={"rounded-3xl h-full w-full"}
                    src={offer.image[0].file_url}
                    alt={offer.title}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemOfferCarousel;