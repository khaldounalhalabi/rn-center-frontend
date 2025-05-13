import { ApiResponse } from "@/http/Response";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";
import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/shadcn/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shadcn/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

const TablePaginator = ({
  data,
  setPage,
}: {
  data: ApiResponse<any> | undefined;
  placeholderData: boolean;
  page: number;
  setPage: (value: ((prevState: number) => number) | number) => void;
}) => {
  const t = useTranslations("table");
  const locale = useLocale();

  return (
    <div className="flex justify-end px-4 mt-2">
      <ol className={`flex items-center justify-end gap-1`}>
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setPage((old) => Math.max(old - 1, 0))}
                  disabled={data?.paginate?.is_first ?? true}
                  size={"icon"}
                >
                  {locale == "ar" ? <ChevronRight /> : <ChevronLeft />}
                </Button>
              </TooltipTrigger>
              <TooltipContent className={"bg-foreground text-background text-sm p-2 rounded-md"}>
                <p>{t("prevPage")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size={"icon"}
                  type={"button"}
                  onClick={() => {
                    if (!data?.paginate?.is_last) {
                      setPage((old) => old + 1);
                    }
                  }}
                  disabled={data?.paginate?.is_last ?? true}
                >
                  {locale == "ar" ? <ChevronLeft /> : <ChevronRight />}
                </Button>
              </TooltipTrigger>
              <TooltipContent className={"bg-foreground text-background text-sm p-2 rounded-md"}>
                <p>{t("nextPage")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ol>
    </div>
  );
};

export default TablePaginator;
