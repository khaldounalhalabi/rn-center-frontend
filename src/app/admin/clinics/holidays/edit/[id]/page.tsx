'use client'
import PageCard from "@/components/common/ui/PageCard";
import FormHolidays from "@/components/admin/holidays/formHolidays";
import React from "react";



const page = ({ params: { id } }:{ params: { id :number} })=>{



    return (
      <div>
        <div className="w-full h-24 flex justify-start items-center">
          <h2 className="ml-5 text-2xl font-medium">Edit Holidays</h2>
        </div>
        <PageCard>
          <FormHolidays type={"update"} id={id} />
        </PageCard>
      </div>
    );
}

export default page