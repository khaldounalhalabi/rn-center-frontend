import Eye from "@/components/icons/Eye";
import LoadingSpin from "@/components/icons/LoadingSpin";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/shadcn/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import TaskStatusEnum from "@/enums/TaskStatusEnum";
import useOpenByQuery from "@/hooks/OpenByQueryParamHook";
import useUser from "@/hooks/UserHook";
import Task from "@/models/Task";
import { TaskCommentService } from "@/services/TaskCommentService";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Grid from "../ui/Grid";
import Tooltip from "../ui/Tooltip";
import { Label } from "../ui/labels-and-values/Label";
import { LabelValue } from "../ui/labels-and-values/LabelValue";
import TranslatableEnum from "../ui/labels-and-values/TranslatableEnum";
import { Value } from "../ui/labels-and-values/Value";
import { getVariantByStatus } from "./TaskStatusColumn";

const ShowTaskSheet = ({
  task,
  revalidate,
}: {
  task?: Task;
  revalidate?: () => void;
}) => {
  const t = useTranslations("tasks");
  const { role } = useUser();
  const [comment, setComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [open, setOpen] = useOpenByQuery("task_id", task?.id ?? 0);

  const revalidateData = async () => {
    if (revalidate) {
      await revalidate();
    }
  };

  // Add comment
  const addCommentMutation = useMutation({
    mutationFn: async (comment: string) => {
      if (!task) throw new Error("No task");
      const res = await TaskCommentService.make(role).store({
        task_id: task.id,
        comment,
      });
      return res.data;
    },
    onSuccess: async () => {
      await revalidateData();
      setComment("");
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: async ({ id, comment }: { id: number; comment: string }) => {
      const res = await TaskCommentService.make(role).update(id, { comment });
      return res.data;
    },
    onSuccess: async () => {
      await revalidateData();
      setEditingId(null);
      setEditingValue("");
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (id: number) => {
      await TaskCommentService.make(role).delete(id);
      return id;
    },
    onSuccess: async () => {
      await revalidateData();
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} type="button">
          <Eye />
        </Button>
      </SheetTrigger>
      <SheetContent sm>
        <SheetHeader>
          <SheetTitle>{task?.title}</SheetTitle>
          <SheetDescription>{task?.description}</SheetDescription>
        </SheetHeader>
        <Grid>
          <LabelValue label={t("due_date")} value={task?.due_date} />
          <Label label={t("status")}>
            <Value
              value={
                <Badge
                  variant={getVariantByStatus(
                    task?.status ?? TaskStatusEnum.PENDING,
                  )}
                >
                  <TranslatableEnum value={task?.status} />
                </Badge>
              }
            />
          </Label>
          <LabelValue label={t("label")} value={task?.label} />
          <LabelValue label={t("user")} value={task?.user?.full_name} />
          <Label className="md:col-span-2" label={t("users")}>
            <Value>
              <div className="flex flex-wrap items-center gap-3">
                {task?.users?.map((user, index) => (
                  <Tooltip title={user?.full_name ?? "User"} key={index}>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {user?.first_name.charAt(0)}
                        {user?.last_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Tooltip>
                ))}
              </div>
            </Value>
          </Label>
        </Grid>
        {/* --- Comments Section --- */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">{t("task_comments")}</h3>
          <div className="space-y-4">
            {task?.task_comments?.length ? (
              task.task_comments.map((c, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 border-b pb-2 last:border-b-0"
                >
                  <Tooltip title={c.user?.full_name || "User"}>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {c.user?.first_name?.charAt(0)}
                        {c.user?.last_name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </Tooltip>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {c.user?.full_name || "Unknown User"}
                      </span>
                      {c.can_update && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setEditingId(c.id);
                            setEditingValue(c.comment);
                          }}
                          disabled={loadingId === c.id}
                        >
                          {t("edit")}
                        </Button>
                      )}
                      {c.can_delete && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              disabled={loadingId === c.id}
                            >
                              {t("delete")}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {t("delete_alert_title")}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {t("delete_alert")}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                {t("cancel")}
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={async () => {
                                  setLoadingId(c.id);
                                  await deleteCommentMutation.mutateAsync(c.id);
                                  setLoadingId(null);
                                }}
                                disabled={deleteCommentMutation.isPending}
                              >
                                {t("delete")}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      )}
                    </div>
                    {/* Comment text or edit input */}
                    {editingId === c.id ? (
                      <form
                        className="flex gap-2 mt-1"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          setLoadingId(c.id);
                          await editCommentMutation.mutateAsync({
                            id: c.id,
                            comment: editingValue,
                          });
                          setLoadingId(null);
                        }}
                      >
                        <Input
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          className="flex-1"
                          autoFocus
                        />
                        <Button
                          type="submit"
                          size="sm"
                          disabled={editCommentMutation.isPending}
                        >
                          {editCommentMutation.isPending ? (
                            <LoadingSpin />
                          ) : (
                            t("save")
                          )}
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingId(null)}
                        >
                          {t("cancel")}
                        </Button>
                      </form>
                    ) : (
                      <div className="text-sm mt-1 whitespace-pre-line">
                        {c.comment}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground text-sm">
                {t("no_comments")}
              </div>
            )}
          </div>
          {/* Add comment form */}
          {task?.can_comment && (
            <form
              className="flex gap-2 mt-4"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!comment.trim()) return;
                await addCommentMutation.mutateAsync(comment);
              }}
            >
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t("add_a_comment")}
                disabled={addCommentMutation.isPending}
              />
              <Button
                type="submit"
                disabled={addCommentMutation.isPending || !comment.trim()}
              >
                {addCommentMutation.isPending ? (
                  <LoadingSpin className="w-4 h-4 animate-spin" />
                ) : (
                  t("add")
                )}
              </Button>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShowTaskSheet;
