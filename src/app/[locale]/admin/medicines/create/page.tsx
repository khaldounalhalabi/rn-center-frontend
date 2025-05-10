import PageCard from "@/components/common/ui/PageCard";
import MedicineForm from "@/components/common/medicine/MedicineForm";

const Page = () => {
  return (
    <PageCard>
      <h1 className={"card-title"}></h1>
      <MedicineForm type={"store"} />
    </PageCard>
  );
};

export default Page;
