"use client";
import SpecialityHomePageSection from "@/components/customer/Speciality/SpecialityHomePageSection";
import SystemOfferCarousel from "@/components/customer/SystemOffer/SystemOfferCarousel";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import ClinicCarousel from "@/components/customer/Clinic/ClinicCarousel";

const Home = () => {
  return (
    <>
      <SystemOfferCarousel />
      <SpecialityHomePageSection />
        <ClinicCarousel />
    </>
  );
};

export default Home;