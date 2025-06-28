import { Revalidate } from "@/actions/Revalidate";
import DocumentPlus from "@/components/icons/DocumentPlus";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import useUser from "@/hooks/UserHook";
import PatientStudyService from "@/services/PatientStudyService";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Form from "../ui/Form";
import ImageUploader from "../ui/images/ImageUploader";
import FormInput from "../ui/inputs/FormInput";

const PatientStudyForm = ({ customerId }: { customerId: number }) => {
  const { role } = useUser();
  const [open, setOpen] = useState(false);
  const t = useTranslations("patient_studies");
  const onSubmit = (data: any) => {
    data.customer_id = customerId;
    return PatientStudyService.make(role).store(data);
  };

  const onSuccess = async () => {
    await Revalidate();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size={"icon"} type="button">
          <DocumentPlus />
        </Button>
      </SheetTrigger>
      <SheetContent sm>
        <SheetHeader>
          <SheetTitle>{t("create_title")}</SheetTitle>
        </SheetHeader>
        <Form handleSubmit={onSubmit} onSuccess={onSuccess}>
          <FormInput label={t("title")} name="title" type="text" />
          <ImageUploader
            name="dicom_files"
            isMultiple
            acceptedFileTypes={[
              "application/dicom",
              "application/dcm",
              "application/DCM",
              "application/octet-stream",
              "application/dicom+xml",
              "video/mpeg",
              "image/gif",
              "image/dcm",
              "image/DCM",
              "image/dicom",
              "image/dicom+jpx",
              "video/mpeg",
              "video/mp4",
              "*/dcm",
              "*/DCM",
              ".dicom",
              ".dcm",
              ".DCM",
              "image/jpeg",
              "application/pdf",
              "application/dicom+json",
              "application/dicom",
              "application/dicom+json",
              "application/dicom+xml",
              'multipart/related; type="application/dicom"',
              "image/dicom-rle",
              "image/jpeg",
              "image/jp2",
              "image/png",
              "image/gif",
              "video/mpeg",
              "video/mp4",
              "application/DICOM",
              "application/DICOM+xml",
              "image/DICOM",
              "image/DICOM+jpx",
              ".DICOM",
              "application/DICOM+json",
              "application/DICOM",
              "application/DICOM+json",
              "application/DICOM+xml",
              'multipart/related; type="application/DICOM"',
              "image/DICOM-rle",
              "application/zip",
            ]}
          />
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default PatientStudyForm;
