"use client";

import { Clinic } from "@/Models/Clinic";
import { TranslateClient } from "@/Helpers/TranslationsClient";

const Overview = ({ clinic }: { clinic: Clinic }) => {
  return (
    <>
      <div>
        <label className="text-title">
          Specialitites :
          {clinic?.specialities?.map((spec) => (
            <span key={spec?.id} className="badge badge-brand-primary">
              {TranslateClient(spec?.name)}
            </span>
          ))}
        </label>
        <label className="text-title">
          Experience :{" "}
          <span className="text-brand-primary">{clinic?.experience}</span>
        </label>
      </div>
    </>
  );
};

export default Overview;
