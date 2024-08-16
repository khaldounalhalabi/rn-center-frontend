"use client";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import SystemOfferCarousel from "@/components/customer/SystemOffer/SystemOfferCarousel";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { getMedia } from "@/Models/Media";
import { SpecialityService } from "@/services/SpecialityService";
import { useQuery } from "@tanstack/react-query";
const Home = () => {
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
  console.log(data);

  return (
    <div className="m-10 flex-col">
      <div className="my-10 md:max-h-[30%] w-full !overflow-hidden">
        <SystemOfferCarousel />
      </div>
      <div className="max-h-[40%] flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h2 className="text-3xl text-[#013567] mb-1">Medical</h2>
          <h2 className="text-3xl text-[#013567] mb-1">Specialities</h2>
          <p className="mb-1 text-lg text-[#013567]">
            Lorem ipsum dolor sit amet conse adipisicing elit. Expedita
          </p>
          <AuthSubmitButton className="my-1">View All</AuthSubmitButton>
        </div>
        {isPending ? (
          <div className="my-10 w-full flex items-center justify-between">
            <div className="skeleton md:h-52 h-48 w-36"></div>
            <div className="skeleton md:h-52 h-48 w-36"></div>
            <div className="skeleton md:h-52 h-48 w-36"></div>
            <div className="skeleton md:h-52 h-48 w-36"></div>
          </div>
        ) : (
          data?.data?.map((spec) => (
            <div className="card bg-base-100 h-48 w-36 shadow-xl">
              <figure className="h-2/3">
                <img src={getMedia(spec.image?.[0])} alt="Shoes" />
              </figure>
              <div className="w-full h-1/3 flex flex-col items-center overflow-hidden mt-1">
                <p className="text-center text-sm">{TranslateClient(spec.name)}</p>
                <p className="text-center text-sm">{spec?.clinics_count ?? 0}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
