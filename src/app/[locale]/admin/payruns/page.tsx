"use client";
import ActionsButtons from "@/components/common/Datatable/ActionsButtons";
import DataTable, {
  DataTableData,
  getTableQueryName,
} from "@/components/common/Datatable/DataTable";
import { NotificationHandler } from "@/components/common/helpers/NotificationHandler";
import CreatePayRunSheet from "@/components/common/payruns/CreatePayRunSheet";
import PayrunStatusColumn from "@/components/common/payruns/PayrunStatusColumn";
import ReprocessPayrunButton from "@/components/common/payruns/ReporocessPayrunButton";
import PageCard from "@/components/common/ui/PageCard";
import DownloadIcon from "@/components/icons/DownloadIcon";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Button } from "@/components/ui/shadcn/button";
import { RoleEnum } from "@/enums/RoleEnum";
import useDownload from "@/hooks/DownloadFile";
import { RealTimeEventsTypeEnum } from "@/models/NotificationPayload";
import Payrun from "@/models/Payrun";
import PayrunService from "@/services/PayrunService";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

const Page = () => {
  const t = useTranslations("payruns");
  const datatable: DataTableData<Payrun> = {
    schema: [
      {
        name: "id",
        sortable: true,
        label: "Id",
      },

      {
        name: "should_delivered_at",
        label: t("should_delivered_at"),
      },
      {
        name: "period",
        label: t("period"),
      },
      {
        name: "payment_cost",
        label: t("payment_cost"),
        sortable: true,
      },
      {
        name: "processed_users_count",
        label: t("processed_users_count"),
      },
      {
        name: "excluded_users_count",
        label: t("excluded_users_count"),
      },
      {
        name: "status",
        label: t("status"),
        sortable: true,
        render: (_stats, payrun, _setHidden, revalidate) => (
          <PayrunStatusColumn
            payrun={payrun}
            revalidate={revalidate}
            role={RoleEnum.ADMIN}
          />
        ),
      },
      {
        label: t("actions"),
        render: (_data, payrun, setHidden, revalidate) => (
          <ActionsButtons
            buttons={payrun?.can_delete ? ["show", "delete"] : ["show"]}
            baseUrl={"/admin/payruns"}
            data={payrun}
            setHidden={setHidden}
          >
            <>
              {payrun?.can_update ? (
                <ReprocessPayrunButton
                  payrun={payrun}
                  revalidate={revalidate}
                  role={RoleEnum.ADMIN}
                />
              ) : (
                <></>
              )}
              <ExportButton payrun={payrun} />
            </>
          </ActionsButtons>
        ),
      },
    ],
    api: async (page, search, sortCol, sortDir, perPage, params) =>
      await PayrunService.make().indexWithPagination(
        page,
        search,
        sortCol,
        sortDir,
        perPage,
        params,
      ),
    extraButton: (revalidate) => (
      <CreatePayRunSheet role={RoleEnum.ADMIN} revalidate={revalidate} />
    ),
  };
  const queryName = getTableQueryName(datatable);
  const queryClient = useQueryClient();
  return (
    <PageCard title={t("index_title")}>
      <NotificationHandler
        handle={(payload) => {
          if (payload.type == RealTimeEventsTypeEnum.PayrunStatusChanged) {
            toast.success(t("payrun_data_updated"));
            queryClient.invalidateQueries({
              queryKey: [queryName],
            });
          }
        }}
        isPermanent
      />
      <DataTable {...datatable} />
    </PageCard>
  );
};

export default Page;

const ExportButton = ({ payrun }: { payrun?: Payrun }) => {
  const { download, isLoading } = useDownload();
  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      onClick={() => {
        download(
          `/api/download?method=GET&url=admin/payruns/${payrun?.id}/export`,
          {
            method: "POST",
            fileExtension: "xlsx",
            customFilename: `${payrun?.period} payrun`,
          },
        );
      }}
    >
      {isLoading ? <LoadingSpin /> : <DownloadIcon />}
    </Button>
  );
};
