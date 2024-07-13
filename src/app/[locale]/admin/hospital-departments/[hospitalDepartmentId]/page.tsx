import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import TranslateServer from "@/Helpers/TranslationsServer";
import { AvailableDepartmentService } from "@/services/AvailableDepartmentService";
import { AvailableDepartment } from "@/Models/AvailableDepartment";

const page = async ({
  params: { hospitalDepartmentId },
}: {
  params: { hospitalDepartmentId: number };
}) => {
  const data =
    await AvailableDepartmentService.make<AvailableDepartmentService>().show(
      hospitalDepartmentId,
    );
  const res: AvailableDepartment = data?.data;
  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">Available Department Details</h2>
        <Link href={`/admin/hospital-departments/${hospitalDepartmentId}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>

      <Grid md={"2"} gap={"2"}>
        <label className="label">
          Name
          <span className="bg-base-200 px-2 rounded-xl text-lg">
            {await TranslateServer(res?.name)}
          </span>
        </label>
      </Grid>

      <div className="w-full">
        <label className="label">Description :</label>
        <textarea
          className="w-full p-2"
          disabled={true}
          defaultValue={await TranslateServer(res?.description)}
        ></textarea>
      </div>
    </PageCard>
  );
};

export default page;