"use client";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { SpecialityService } from "@/services/SpecialityService";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";
import { Link } from "@/navigation";

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

  const arrayData = Array.isArray(data?.data) ? data.data : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  return (
    <>
      <div className={"my-8 hidden md:flex"}>
        <div
          className={
            "w-[40%] md:max-h-[250px] flex  justify-center items-center"
          }
        >
          <div className={"flex flex-col gap-5"}>
            <h2
              className={
                "font-bold md:text-[30px] lg:text-[35px]  text-[#013567]"
              }
            >
              Medical Specialties
            </h2>
            <p
              className={
                "font-extralight opacity-60 lg:text-[20px] md:text-[16px] text-[#013567]"
              }
            >
              Lorem ipsum dolor sit amet conse adipisicing elit. Expedita
            </p>

            <Link
              href={"/"}
              className={
                "bg-[#56d5d8] text-white w-[60%] lg:h-12 md:h-7 text-center  flex justify-center items-center  rounded-2xl shadow-lg transition transform hover:brightness-105"
              }
            >
              View All
            </Link>
          </div>
        </div>
        <div className={"w-[60%] flex justify-around gap-1 px-2"}>
          {arrayData?.map((e, index) => {
            return (
              <div
                key={index}
                style={{ boxShadow: "5px 7.5px 11.5px -5.5px #dddddd" }}
                className={"w-[22%] h-full rounded-xl "}
              >
                <div className={"w-full h-[70%]"}>
                  <img
                    className={"w-full h-full rounded-t-xl"}
                    src={e.image[0].file_url}
                    alt={".."}
                  />
                </div>
                <div
                  className={
                    "w-full h-[30%] gap-2 flex flex-col justify-center items-center"
                  }
                >
                  <h2
                    className={"text-[#151D48] text-center text-xs md:text-sm"}
                  >
                    {TranslateClient(e.name)}
                  </h2>
                  <p
                    className={"text-[#737791] text-center text-xs md:text-sm"}
                  >
                    {e.clinics_count} Doctor
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={"md:hidden my-6 block"}>
        <div className={"flex flex-col"}>
          <div className={"flex  px-6 justify-between"}>
            <h2 className={" text-[#151D48] text-[21px]"}>Specialties</h2>
            <Link href={"/"} className={"text-[#737791] text-[18px]"}>
              View All
            </Link>
          </div>
          <div className="  h-[23vh]">
            <div className="embla h-full" ref={emblaRef}>
              <div className="embla__container py-6">
                {data?.data.map((e, index) => (
                  <div
                    className={
                      "w-[24vw] rounded-xl border-2 border-[#F2F1F9] p-[1px] mx-4"
                    }
                    key={index}
                  >
                    <div className={"w-[23vw] h-[50%]"}>
                      <img
                        className={"w-full h-full rounded-t-xl"}
                        src={e.image[0].file_url}
                        alt={".."}
                      />
                    </div>
                    <div
                      className={
                        "w-[24vw] h-[50%] flex flex-col justify-center items-center"
                      }
                    >
                      <p className={"text-xs text-[#737791] text-center"}>
                        {e.clinics_count} Doctors
                      </p>
                      <h2
                        className={
                          "max-h-[40%] overflow-y-hidden text-xs text-center text-[#151D48]"
                        }
                      >
                        {TranslateClient(e.name)}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialityHomePageSection;
