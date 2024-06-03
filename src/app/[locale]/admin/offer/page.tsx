"use client";
import React from "react";
import DataTable, {
    DataTableData,
} from "@/components/common/Datatable/DataTable";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import {OffersService} from "@/services/OffersService";
import {Offers} from "@/Models/Offers";

const Page = () => {
    const tableData: DataTableData<Offers> = {
        createUrl: `/admin/offer/create`,
        title: `Offers`,
        schema: [
            {
                name: "id",
                label: `id`,
                sortable: true,
            },
            {
                name: "clinic.name",
                label: `Clinic`,
                sortable: true,
                translatable: true,
            },
            {
                name: "title",
                label: `Title`,
                sortable: true,
                translatable: true,
            },
            {
                name: "value",
                label: `Value`,
                sortable: true,
                render: (_value, offer) => {
                    return (
                        <div className={`flex flex-col items-start`}>
                            {offer?.type == "percentage" ? (
                                <span>{offer?.value} {" "}<span className="badge badge-neutral">%</span></span>
                            ):offer?.type == "fixed" ? (
                                <span>{offer?.value} {" "}<span className="badge badge-warning">IQD</span></span>
                            ):<span className="badge badge-warning">No Data</span>}
                        </div>
                    );
                },
            },
            {
                name: "type",
                label: `Type`,
                sortable: true,
            },
            {
                name: "is_active",
                sortable: true,
                label: "is Active",
                render: (_is_active, offer) => {
                    return (
                        <div className={`flex flex-col items-start`}>
                            {offer?.is_active ? (
                                <span className="badge badge-neutral">Active</span>
                            ) : (
                                <span className="badge badge-warning">Not Active</span>
                            )}
                        </div>
                    );
                },
            },
            {
                label: `Actions`,
                render: (_undefined, data, setHidden) => (
                    <ActionsButtons
                        id={data?.id}
                        buttons={["edit", "show","delete"]}
                        baseUrl={`/admin/offers`}
                        editUrl={`/admin/offer/${data?.id}/edit`}
                        showUrl={`/admin/offer/${data?.id}`}
                        setHidden={setHidden}
                    >
                    </ActionsButtons>
                ),
            },
        ],
        api: async (page, search, sortCol, sortDir, perPage, params) =>
            await OffersService.make<OffersService>("admin").indexWithPagination(
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