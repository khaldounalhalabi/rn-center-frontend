import { SpecialityService } from "@/services/SpecialityService";
import TranslateServer from "@/Helpers/TranslationsServer";
import { getMedia } from "@/Models/Media";

const SpecialityHomePageSection = async () => {
  const data = await SpecialityService.make<SpecialityService>(
    "public",
  ).indexWithPagination(1, undefined, undefined, undefined, 6);
  const arrayData = Array.isArray(data?.data) ? data.data : [];
  return (
    <>
      <div id={'specialities'} className={"my-8 flex px-[13%] w-full"}>
        <div
          className={
            "w-full grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-3  grid-cols-2 gap-4"
          }
        >
          {arrayData?.map(async (speciality, index) => {
            return (
              <div
                key={index}
                className={"h-[210px] flex flex-col gap-1 p-6 rounded-xl border border-gray-200"}
              >
                <div className={"w-full h-[65%]"}>
                  <img
                    className={"w-full h-full rounded-t-xl object-contain"}
                    src={getMedia(speciality.image?.[0])}
                    alt={".."}
                  />
                </div>
                <div
                  className={
                    "w-full h-[35%] gap-1 flex flex-col justify-start items-start"
                  }
                >
                  <p
                    className={"text-[#737791] text-start text-xs md:text-sm"}
                  >
                    {speciality.clinics_count ?? 0} Doctor
                  </p>
                  <h2
                    className={"text-[#151D48] text-start text-xs md:text-sm"}
                  >
                    {await TranslateServer(speciality.name)}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SpecialityHomePageSection;