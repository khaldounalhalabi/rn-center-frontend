"use client";
import { Revalidate } from "@/actions/Revalidate";
import LoadingSpin from "@/components/icons/LoadingSpin";
import { Button } from "@/components/ui/shadcn/button";
import MedicinePrescriptionStatusEnum from "@/enums/MedicinePrescriptionStatusEnum";
import useUser from "@/hooks/UserHook";
import MedicinePrescription from "@/models/MedicinePrescription";
import MedicinePrescriptionService from "@/services/MedicinePrescriptionService";
import { ClipboardCheck, Undo } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ToggleMedicinePrescriptionStatusButton = ({
  medicinePrescription,
}: {
  medicinePrescription: MedicinePrescription;
}) => {
  const { role } = useUser();
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    await MedicinePrescriptionService.make(role)
      .toggleStatus(medicinePrescription.id)
      .then((res) => {
        if (typeof res?.message == "string") {
          toast.success(res?.message);
        }
      });
    await Revalidate();
    setLoading(false);
  };
  return (
    <Button
      type={"button"}
      size={"icon"}
      variant={
        medicinePrescription?.status == MedicinePrescriptionStatusEnum.NOT_GIVEN
          ? "success"
          : "destructive"
      }
      onClick={handleClick}
      disabled={
        (medicinePrescription?.medicine?.quantity ?? 0) <= 0 &&
        medicinePrescription.status == MedicinePrescriptionStatusEnum.NOT_GIVEN
      }
    >
      {loading ? (
        <LoadingSpin />
      ) : medicinePrescription.status ==
        MedicinePrescriptionStatusEnum.NOT_GIVEN ? (
        <ClipboardCheck />
      ) : (
        <Undo />
      )}
    </Button>
  );
};

export default ToggleMedicinePrescriptionStatusButton;
