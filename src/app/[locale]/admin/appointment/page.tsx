"use client";
import React from "react";
import { AppointmentService } from "@/services/AppointmentService";
import { RoleEnum } from "@/enum/RoleEnum";
import AppointmentsTable from "@/components/common/appointment/AppointmentsTable";

const Page = () => {
  return (
    <AppointmentsTable
      without={[]}
      api={async (page, search, sortCol, sortDir, perPage, params) =>
        await AppointmentService.make<AppointmentService>(
          RoleEnum.ADMIN,
        ).indexWithPagination(page, search, sortCol, sortDir, perPage, params)
      }
    />
  );
};

export default Page;
