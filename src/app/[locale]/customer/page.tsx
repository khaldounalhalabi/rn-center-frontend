"use client";
import SystemOfferCarousel from "@/components/customer/SystemOffer/SystemOfferCarousel";
const Home = () => {
  return (
    <div className="m-10">
      <div className="md:max-h-[30%] w-full !overflow-hidden">
        <SystemOfferCarousel />
      </div>
      <div>
        <h1>Hello</h1>
      </div>
    </div>
  );
};

export default Home;
