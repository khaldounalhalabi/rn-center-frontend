import { Clinic } from "@/Models/Clinic";
import Gallery from "@/components/common/ui/Gallery";
import React from "react";
import Card from "@/components/common/ui/Card";

const OurWork = ({ clinic }: { clinic: Clinic }) => {
  return (
    <Card>
      <div>
        {clinic?.work_gallery?.length != 0 ? (
          <Gallery media={clinic?.work_gallery ? clinic?.work_gallery : []} />
        ) : (
          <div className="flex items-center">
            <label className="label"> {"Image"} : </label>
            <span className="text-lg badge badge-neutral">No Data</span>
          </div>
        )}
      </div>
    </Card>
  );
};
export default OurWork;
