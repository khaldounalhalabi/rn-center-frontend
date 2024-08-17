import { useQuery } from "@tanstack/react-query";
import { ClinicsService } from "@/services/ClinicsService";
import { Link } from "@/navigation";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import LocationIcon from "@/components/icons/LocationIcon";
import {Clinic} from "@/Models/Clinic";
import {isArray} from "util";
import FireIcon from "@/components/icons/FireIcon";

const ClinicCarousel = () => {
  const { data, isPending } = useQuery({
    queryKey: ["clinic_cards"],
    queryFn: async () =>
      ClinicsService.make<ClinicsService>("public").indexWithPagination(
        1,
        undefined,
        undefined,
        undefined,
        4,
      ),
  });

  const arrayData = Array.isArray(data?.data) ? data.data : [];

  console.log(arrayData);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className={"my-6"}>
      <div className={"flex flex-col"}>
        <div className={"flex  px-6 justify-between"}>
          <h2 className={" text-[#151D48] text-[21px]"}>Clinics</h2>
          <Link href={"/"} className={"text-[#737791] text-[18px]"}>
            View All
          </Link>
        </div>

        <div className="h-[24vh] sm:h-[34vh]">
          <div className="embla h-full" ref={emblaRef}>
            <div className="embla__container py-6">
              {data?.data.map((e:Clinic, index) => (
                <div
                  className={"w-[63vw] sm:w-[33vw] lg:w-[30vw] rounded-xl relative mx-4"}
                  key={index}
                  style={{ boxShadow: "5px 7.5px 11.5px -5.5px #dddddd" }}
                >
                  <div className={"w-[63vw] sm:w-[33vw] lg:w-[30vw] h-[50%]"}>
                    <img
                      className={"w-full h-full rounded-t-xl"}
                      src={
                        "https://dc613.4shared.com/img/T_vFxLhdfa/s24/190c769d828/bgLogIn?async&rand=0.737498839733479"
                      }
                      alt={".."}
                    />
                  </div>
                  <div
                    className={
                      "w-full h-[50%] flex "
                    }
                  >
                    <div className={"w-[60%] pl-2 text-nowrap flex flex-col justify-around"}>
                      <h2
                        className={"overflow-hidden h-[30%] text-[17px] text-[#151D48] w-full"}
                      >
                        {TranslateClient(e.name)}
                      </h2>
                      <h3 className={'overflow-hidden h-[30%] text-[12px] text-[#737791] w-full'}>
                        Dr.{TranslateClient(e?.user?.first_name)}{" "}
                        {TranslateClient(e?.user?.middle_name)}
                      </h3>
                      <div className={'h-[30%] text-ellipsis overflow-hidden flex gap-1'}>
                        <LocationIcon />
                        <span className={'text-[11px] w-0 text-[#737791]'}>{TranslateClient(e?.user?.address?.name)}</span>
                      </div>
                    </div>
                    <div className={'w-[40%] flex flex-col justify-around items-center'}>
                      <div className={'bg-[#2ECBCC] rounded-xl w-[60%] h-[20px] flex justify-center items-center'}>
                        <h2 className={'font-semibold text-white text-[9px]'}>{'Medicine'}</h2>
                      </div>
                    </div>
                  </div>
                  <div className='absolute flex text-[#30ACC2] gap-1 justify-center items-center w-[30%] h-10 bg-white rounded-2xl top-1/2 right-[20%] transform translate-x-1/2 -translate-y-1/2'>
                    <h2 className={'text-[14px]'}>{e.appointment_cost.toLocaleString()}</h2>
                    <span className={'text-[9px]'}>IQD</span>
                  </div>
                  <div className={'absolute top-3 left-3'}>
                    <FireIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClinicCarousel