"use client";
import React from "react";
import DataTable, {
    DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import {SystemOffersService} from "@/services/SystemOffersService";
import {SystemOffers} from "@/Models/SystemOffer";

const Page = () => {
    const tableData: DataTableData<SystemOffers> = {
        createUrl: `/admin/system-offer/create`,
        title: `System Offers`,
        schema: [
            {
                name: "id",
                label: `id`,
                sortable: true,
            },
            {
                name: "title",
                label: `Title`,
                sortable: true,
            },
            {
                name: "type",
                label: `Type`,
                sortable: true,
            },
            {
                name: "amount",
                label: `Amount`,
                sortable: true,
            },
            {
                label: `${("Status")}`,
                name: "status",
                sortable: true,
                render: (data) =>
                    data == "active" ? (
                        <span className={`badge badge-success`}>{("Active")}</span>
                    ) : (
                        <span className={`badge badge-error`}>{("in Active")}</span>
                    ),
            },
            {
                name: "from",
                label: `Start`,
                sortable: true,
            },
            {
                name: "to",
                label: `End`,
                sortable: true,
            },
            {
                label: `Actions`,
                render: (_undefined, data, setHidden) => (
                    <ActionsButtons
                        id={data?.id}
                        buttons={["edit", "show", "delete"]}
                        baseUrl={`/admin/system-offers`}
                        editUrl={`/admin/system-offer/${data?.id}/edit`}
                        showUrl={`/admin/system-offer/${data?.id}`}
                        setHidden={setHidden}
                    ></ActionsButtons>
                ),
            },
        ],
        api: async (page, search, sortCol, sortDir, perPage, params) =>
            await SystemOffersService.make<SystemOffersService>("admin").indexWithPagination(
                page,
                search,
                sortCol,
                sortDir,
                perPage,
                params,
            ),
    };
    return <DataTable {...tableData} />;
};

export default Page;