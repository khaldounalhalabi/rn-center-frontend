import DocumentPlus from "@/components/icons/DocumentPlus";
import Pencil from "@/components/icons/Pencil";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { RoleEnum } from "@/enums/RoleEnum";
import { ApiResponse } from "@/http/Response";
import { User } from "@/models/User";
import Vacation from "@/models/Vacation";
import { UserService } from "@/services/UserService";
import VacationService from "@/services/VacationService";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import Form from "../ui/Form";
import Grid from "../ui/Grid";
import FormDatepicker from "../ui/date-time-pickers/FormDatepicker";
import ApiSelect from "../ui/selects/ApiSelect";
import FormTextarea from "../ui/text-inputs/FormTextarea";

const VacationFormSheet = ({
  vacation,
  type,
  role,
  revalidate = undefined,
}: {
  vacation?: Vacation;
  type: "store" | "update";
  role: RoleEnum;
  revalidate?: () => void;
}) => {
  const t = useTranslations("vacations");
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: any) => {
    const service = VacationService.make(role);
    let response;

    if (type == "store") {
      response = await service.store(data);
    } else {
      response = await service.update(vacation?.id ?? 0, data);
    }

    if (response.code == 406) {
      toast(t("error"), {
        description: response?.message as string,
        dismissible:true
      });
    }

    return response;
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={type == "store" ? "default" : "secondary"}
          type="button"
          size={"icon"}
        >
          {type == "store" ? <DocumentPlus /> : <Pencil />}
        </Button>
      </SheetTrigger>
      <SheetContent sm>
        <SheetHeader>
          <SheetTitle>
            {type == "store" ? t("create_title") : t("edit_title")}
          </SheetTitle>
        </SheetHeader>
        <Form
          handleSubmit={onSubmit}
          onSuccess={() => {
            setOpen(false);
            if (revalidate) {
              revalidate();
            }
          }}
          defaultValues={vacation}
        >
          <Grid>
            {role != RoleEnum.DOCTOR && (
              <ApiSelect
                api={function (
                  page?: number,
                  search?: string,
                ): Promise<ApiResponse<User[]>> {
                  return UserService.make(role).employees(page, search);
                }}
                name={"user_id"}
                defaultValues={vacation?.user ? [vacation?.user] : []}
                getOptionLabel={(item) => (
                  <span className="w-full flex items-center gap-2">
                    <Badge variant={"secondary"}>{item?.role}</Badge>
                    {item?.full_name}
                  </span>
                )}
                optionValue="id"
                label={t("user")}
              />
            )}
            <FormDatepicker label={t("from")} name="from" />
            <FormDatepicker label={t("to")} name="to" />

            <div className="col-span-2">
              <FormTextarea name="reason" label={t("reason")} />
            </div>
          </Grid>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default VacationFormSheet;
