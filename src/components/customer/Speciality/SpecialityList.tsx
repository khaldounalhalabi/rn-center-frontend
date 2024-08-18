"use client";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { SpecialityService } from "@/services/SpecialityService";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListCards from "../ListCards";
import RoundedImage from "@/components/common/RoundedImage";
import { getMedia } from "@/Models/Media";
import TranslateServer from "@/Helpers/TranslationsServer";

const SpecialityList = () => {
  const { data, isPending, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["speciality_lists"],
      queryFn: async ({ pageParam }) => {
        return await SpecialityService.make<SpecialityService>("public").indexWithPagination(
          pageParam,
          undefined,
          undefined,
          undefined,
          6
        );
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return !lastPage.paginate?.isLast
          ? lastPage.paginate?.currentPage
            ? lastPage.paginate?.currentPage + 1
            : null
          : null;
      },
    });

  return (
    <div
      className={"p-5 md:p-10 max-h-screen  overflow-y-scroll"}
      onScroll={(e: any) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop >= clientHeight - 50 && hasNextPage) {
          fetchNextPage();
        }
      }}
    >
      <div className={"w-full h-full my-10"}>
        {isPending ? (
          <div className={"w-full h-[300px] flex justify-center items-center"}>
            <LoadingSpin className={"w-12 h-12"} />
          </div>
        ) : (
          data?.pages?.map((page) =>
            page.data?.map((spec, index) => {
              return (
                <div key={index}>
                  <ListCards
                    image={
                      <RoundedImage
                        src={getMedia(spec?.image?.[0])}
                        alt={"spec image"}
                      />
                    }
                    info={
                      <div
                        className={
                          "w-full h-full flex flex-col items-center justify-start pt-4"
                        }
                      >
                        <p
                          className={"font-semibold text-[16px] text-[#013567]"}
                        >
                          Doctors :{spec.clinics_count}
                        </p>
                      </div>
                    }
                  >
                    <div
                      className={
                        "w-full h-full flex flex-col justify-center gap-1"
                      }
                    >
                      <h2 className={"text-[#013567] text-[16px]"}>
                        {TranslateServer(spec.name)}
                      </h2>
                    </div>
                  </ListCards>
                </div>
              );
            })
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

export default SpecialityList;
