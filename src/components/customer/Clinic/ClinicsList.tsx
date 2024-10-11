"use client";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { ClinicsService } from "@/services/ClinicsService";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { getMedia } from "@/Models/Media";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import React, { ChangeEvent, useState } from "react";
import { Link } from "@/navigation";
import LocationIcon from "@/components/icons/LocationIcon";
import FireIcon from "@/components/icons/FireIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import { FilterTowIcon } from "@/components/icons/FilterTowIcon";
import Overview from "@/components/common/Overview";
import { cities } from "@/constants/Cities";

const ClinicsList = () => {
  const [params, setParams] = useState<Record<string, any>>({});
  const [search, setSearch] = useState("");
  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["Clinic-customer", params],
      queryFn: async ({ pageParam }) =>
        await ClinicsService.make<ClinicsService>("public").indexWithPagination(
          pageParam,
          undefined,
          undefined,
          undefined,
          6,
          params,
        ),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return !lastPage.paginate?.is_last
          ? lastPage.paginate?.current_page
            ? lastPage.paginate?.current_page + 1
            : null
          : null;
      },
      placeholderData: keepPreviousData,
    });
  let [isOpenSearch, setIsOpenSearch] = useState(false);

  function closeModalSearch() {
    setIsOpenSearch(false);
  }

  function openModalSearch() {
    setIsOpenSearch(true);
  }

  let [isOpenFilter, setIsOpenFilter] = useState(false);

  function closeModalFilter() {
    setIsOpenFilter(false);
  }

  function openModalFilter() {
    setIsOpenFilter(true);
  }

  return (
    <div
      className={`py-5 px-1 max-h-screen md:p-10 overflow-y-scroll`}
      onScroll={(e: any) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop === clientHeight && hasNextPage) {
          fetchNextPage();
        }
      }}
    >
      <div className={`flex items-center justify-between px-4 w-full`}>
        <h1
          className={`text-lg md:text-2xl  text-[#151D48] flex items-center justify-between gap-4`}
        >
          Dental
        </h1>
        <div className={"flex gap-4"}>
          <SearchIcon className={"w-6 h-6"} onClick={openModalSearch} />
          <FilterTowIcon className={"w-6 h-6"} onClick={openModalFilter} />
        </div>
      </div>
      <Overview isOpen={isOpenFilter} closeModal={closeModalFilter}>
        <h2 className={"card-title"}>Filter</h2>
        <label className="label">
          City :
          <select
            className="select-bordered select"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              setParams({ ...params, city_name: e.target.value });
              closeModalFilter();
            }}
          >
            {cities.map((city, index) => (
              <option
                key={index}
                value={city.name}
                selected={params?.city_name == city.name}
              >
                {TranslateClient(city.name)}
              </option>
            ))}
          </select>
        </label>
      </Overview>
      <Overview isOpen={isOpenSearch} closeModal={closeModalSearch}>
        <h2 className={"card-title"}>Search</h2>
        <div>
          <input
            className="block kodchasan py-2.5 px-0 w-full   bg-transparent border-0 border-b-2 border-[#c1d5df] appearance-none  focus:outline-none focus:ring-0 focus:border-[#1FB8B9]  peer"
            type={"text"}
            placeholder={"Search..."}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="inline-flex mt-4 justify-center bg-blue-100 hover:bg-blue-200 px-4 py-2 border border-transparent rounded-md font-medium text-blue-900 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => {
            setParams({ search: search });
            closeModalSearch();
          }}
        >
          Search
        </button>
      </Overview>
      <div className={"w-full my-10 flex flex-col sm:flex-row flex-wrap"}>
        {isPending ? (
          <div className={"w-full h-[300px] flex justify-center items-center"}>
            <LoadingSpin className={"w-12 h-12"} />
          </div>
        ) : (
          data?.pages.map((page) =>
            page?.data?.map((e, index) => {
              return (
                <div
                  className="h-[34vh] my-4 w-full sm:w-1/2 xl:w-1/3"
                  key={index}
                >
                  <Link
                    href={`/customer/clinics/${e.id}`}
                    className={"block h-full relative mx-4 cursor-pointer"}
                  >
                    <div className={"w-full h-[50%]"}>
                      <img
                        className={"w-full h-full rounded-t-xl"}
                        src={
                          e.user?.image?.[0]
                            ? getMedia(e.user?.image?.[0])
                            : "/no-clinic-image.png"
                        }
                        alt={".."}
                      />
                    </div>
                    <div
                      className={
                        "w-full h-[50%] flex  shadowCard  rounded-b-2xl"
                      }
                    >
                      <div
                        className={
                          "w-[60%] pl-2 text-nowrap flex flex-col justify-around"
                        }
                      >
                        <h2
                          className={
                            "overflow-hidden h-[30%] text-[17px] text-[#151D48] w-full"
                          }
                        >
                          {TranslateClient(e.name)}
                        </h2>
                        <h3
                          className={
                            "overflow-hidden h-[30%] text-[12px] text-[#737791] w-full"
                          }
                        >
                          Dr.{TranslateClient(e?.user?.first_name)}{" "}
                          {TranslateClient(e?.user?.middle_name)}
                        </h3>
                        <div
                          className={
                            "h-[30%] text-ellipsis overflow-hidden flex gap-1"
                          }
                        >
                          <LocationIcon />
                          <span className={"text-[11px] w-0 text-[#737791]"}>
                            {TranslateClient(e?.user?.address?.name)}
                          </span>
                        </div>
                      </div>
                      <div
                        className={
                          "w-[40%] flex flex-col justify-around items-center"
                        }
                      >
                        <div
                          className={
                            "bg-[#2ECBCC] rounded-xl w-[60%] h-[20px] flex justify-center items-center"
                          }
                        >
                          <h2
                            className={
                              "font-semibold text-white text-[9px] md:text-[12px] xl:text-[15px]"
                            }
                          >
                            {TranslateClient(e.specialities?.[0]?.name)}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="absolute flex text-[#30ACC2] gap-1 justify-center items-center w-[30%] h-10 bg-white rounded-2xl top-1/2 right-[20%] transform translate-x-1/2 -translate-y-1/2">
                      <h2 className={"text-[14px]"}>
                        {e.appointment_cost.toLocaleString()}
                      </h2>
                      <span className={"text-[9px]"}>IQD</span>
                    </div>
                    <div className={"absolute top-3 left-3"}>
                      <FireIcon />
                    </div>
                  </Link>
                </div>
              );
            }),
          )
        )}
        {isFetchingNextPage && (
          <div className={`flex items-center justify-center`}>
            <LoadingSpin className={`w-12 h-12`} />
          </div>
        )}
      </div>
    </div>
  );
};
export default ClinicsList;
