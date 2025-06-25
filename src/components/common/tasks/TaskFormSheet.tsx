import DocumentPlus from "@/components/icons/DocumentPlus";
import Pencil from "@/components/icons/Pencil";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import Task from "@/models/Task";
import { useTranslations } from "next-intl";
import { useState } from "react";
import TaskForm from "./TaskForm";

const TaskFromSheet = ({
  task,
  type,
  revalidate,
}: {
  task?: Task;
  type: "store" | "update";
  revalidate?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("tasks");
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
        <TaskForm
          type={type}
          task={task}
          onSuccess={async () => {
            if (revalidate) {
              await revalidate();
            }
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default TaskFromSheet;
