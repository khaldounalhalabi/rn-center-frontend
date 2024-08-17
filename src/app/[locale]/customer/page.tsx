import SpecialityHomePageSection from "@/components/customer/Speciality/SpecialityHomePageSection";
import SystemOfferCarousel from "@/components/customer/SystemOffer/SystemOfferCarousel";
import ClinicCarousel from "@/components/customer/Clinic/ClinicCarousel";

const Home = () => {
  return (
    <div className="h-full p-5 md:p-10">
      <SystemOfferCarousel />
      <SpecialityHomePageSection />
      <ClinicCarousel />
    </div>
  );
};

export default Home;
