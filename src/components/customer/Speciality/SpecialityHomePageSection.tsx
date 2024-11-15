import {SpecialityService} from "@/services/SpecialityService";
import TranslateServer from "@/Helpers/TranslationsServer";
const SpecialityHomePageSection = async () => {
    const data = await SpecialityService.make<SpecialityService>("public").indexWithPagination(1, undefined, undefined, undefined, 6)
    const arrayData = Array.isArray(data?.data) ? data.data : [];
    return (
        <>
            <div className={"my-8 flex"}>
                <div className={"w-full grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-3  grid-cols-2 gap-4 px-8"}>
                    {arrayData?.map((e, index) => {
                            return (
                                <div
                                    key={index}
                                    style={{boxShadow: "5px 7.5px 11.5px -5.5px #dddddd"}}
                                    className={"w-full h-[210px] rounded-xl "}
                                >
                                    <div className={"w-full h-[70%]"}>
                                        <img
                                            className={"w-full h-full rounded-t-xl"}
                                            src={
                                                e?.image?.[0]
                                                    ? e?.image[0]?.file_url
                                                    : "/no-clinic-image.png"
                                            }
                                            alt={".."}
                                        />
                                    </div>
                                    <div
                                        className={
                                            "w-full h-[30%] gap-2 flex flex-col justify-center items-center"
                                        }
                                    >
                                        <h2
                                            className={
                                                "text-[#151D48] text-center text-xs md:text-sm"
                                            }
                                        >
                                            { TranslateServer(e.name)}
                                        </h2>
                                        <p
                                            className={
                                                "text-[#737791] text-center text-xs md:text-sm"
                                            }
                                        >
                                            {e.clinics_count} Doctor
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
};

export default SpecialityHomePageSection;