"use client";
import OfferCard from "@/components/admin/OfferCard";
import { SystemOffersService } from "@/services/SystemOffersService";
import { useInfiniteQuery } from "@tanstack/react-query";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const SystemOfferCarousel = () => {
  const { data, fetchNextPage, hasNextPage, isPending } = useInfiniteQuery({
    queryKey: ["system_offers_carousel"],
    queryFn: async ({ pageParam }) =>
      await SystemOffersService.make<SystemOffersService>(
        "public"
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
  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlaySpeed={3000}
      centerMode={false}
      className="w-full h-[30%]"
      containerClass="w-full h-[30%]"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite={false}
      itemClass="mx-5"
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 720,
          },
          items: 2.5,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1.3,
        },
        tablet: {
          breakpoint: {
            max: 719,
            min: 464,
          },
          items: 1.3,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      slidesToSlide={1}
      swipeable
      beforeChange={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
    >
      {isPending && (
        <div className="card cursor-pointer bg-base-100 w-52 md:w-full h-full shadow-xl">
          <div className="skeleton w-full h-52"></div>
        </div>
      )}
      {isPending && (
        <div className="card cursor-pointer bg-base-100 w-52 md:w-full h-full shadow-xl">
          <div className="skeleton w-full h-52"></div>
        </div>
      )}
      {isPending && (
        <div className="card cursor-pointer bg-base-100 w-52 md:w-full h-full shadow-xl">
          <div className="skeleton w-full h-52"></div>
        </div>
      )}
      {isPending && (
        <div className="card cursor-pointer bg-base-100 w-52 md:w-full h-full shadow-xl">
          <div className="skeleton w-full h-52"></div>
        </div>
      )}
      {data?.pages.map((page) =>
        page.data.map((offer) => <OfferCard image={offer.image?.[0]} />)
      )}
    </Carousel>
  );
};

export default SystemOfferCarousel;
