import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { getMedia } from "@/Models/Media";
import { SpecialityService } from "@/services/SpecialityService";
import { useQuery } from "@tanstack/react-query";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";

const SpecialityHomePageSection = () => {
  const { data, isPending } = useQuery({
    queryKey: ["specialities_cards"],
    queryFn: async () =>
      SpecialityService.make<SpecialityService>("public").indexWithPagination(
        1,
        undefined,
        undefined,
        undefined,
        4
      ),
  });

  const options: EmblaOptionsType = {
    align: "start",
    dragFree: true,
    loop: true,
  };
  const slides_count = 5;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  return (
    <div className="w-full flex items-center">
      <div className="hidden lg:flex flex-col items-start h-full w-1/3 max-w-[30%]">
        <h2 className="text-3xl text-[#013567] mb-1">Medical</h2>
        <h2 className="text-3xl text-[#013567] mb-1">Specialities</h2>
        <p className="mb-1 text-lg text-[#013567]">
          Lorem ipsum dolor sit amet conse adipisicing elit. Expedita
        </p>
        <AuthSubmitButton className="my-1">View All</AuthSubmitButton>
      </div>
      {isPending ? (
        <div className="my-10 w-full flex items-center gap-1 justify-between">
          <div className="skeleton lg:h-52 h-[35%] w-[25%]"></div>
          <div className="skeleton lg:h-52 h-[35%] w-[25%]"></div>
          <div className="skeleton lg:h-52 h-[35%] w-[25%]"></div>
          <div className="skeleton lg:h-52 h-[35%] w-[25%]"></div>
        </div>
      ) : (
        <section className="spec_embla">
          <div className="spec_embla__viewport" ref={emblaRef}>
            <div className="spec_embla__container h-full">
              {data?.data?.map((spec) => (
                <div className="spec_embla__slide h-full">
                  <div className="spec_embla__slide__number">
                    <div className="card bg-base-100 shadow-xl">
                      <img
                        src={getMedia(spec.image?.[0])}
                        className="h-2/3 w-full"
                      />
                      <div className="card-body">
                        <h2 className="card-title">
                          {TranslateClient(spec.name)}
                        </h2>
                        <p>{spec.clinics_count ?? 0}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SpecialityHomePageSection;
