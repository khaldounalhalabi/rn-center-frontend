"use client";
import Form from "@/components/common/ui/Form";
import React from "react";
import Grid from "@/components/common/ui/Grid";
import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
import { ClinicsService } from "@/services/ClinicsService";
import { Clinic } from "@/Models/Clinic";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { Navigate } from "@/Actions/navigate";
import { PatientProfiles } from "@/Models/PatientProfiles";
import { PatientProfilesService } from "@/services/PatientProfilesService";
import { CustomerService } from "@/services/CustomerService";
import { Customer } from "@/Models/Customer";
import Textarea from "@/components/common/ui/textArea/Textarea";
import OtherDataInput from "@/components/admin/patient-profiles/OtherDataInput";
import PageCard from "@/components/common/ui/PageCard";
import ImageUploader from "@/components/common/ui/ImageUploader";
import Gallery from "@/components/common/ui/Gallery";

const PatientProfilesForm = ({
  defaultValues = undefined,
  id,
  type = "store",
  patientId = undefined,
}: {
  defaultValues?: PatientProfiles;
  id?: number;
  type?: "store" | "update";
  patientId?: number;
}) => {
  const handleSubmit = async (data: any) => {
    const dataSend = patientId
      ? {
          ...data,
          customer_id: patientId,
        }
      : data;

    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      return PatientProfilesService.make<PatientProfilesService>("admin")
        .update(defaultValues?.id ?? id, dataSend)
        .then((res) => {
          console.log(res);
          return res;
        });
    } else {
      return await PatientProfilesService.make<PatientProfilesService>("admin")
        .store(dataSend)
        .then((res) => {
          console.log(res);
          return res;
        });
    }
  };
  const onSuccess = () => {
    Navigate(
      patientId ? `/admin/patients/${patientId}` : `/admin/patient-profiles`,
    );
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <PageCard>
        <h2 className="card-title">
          {type == "update" ? "Edit" : "Add"} Patient Profiles
        </h2>
        <Grid md={"2"}>
          <ApiSelect
            required={true}
            placeHolder={"Select Clinic name ..."}
            name={"clinic_id"}
            api={(page, search) =>
              ClinicsService.make<ClinicsService>().setHeaders({ filtered: true }).indexWithPagination(
                page,
                search,
              )
            }
            defaultValues={defaultValues?.clinic ? [defaultValues?.clinic] : []}
            label={"Clinic Name"}
            optionValue={"id"}
            getOptionLabel={(data: Clinic) => TranslateClient(data.name)}
          />
          {!patientId ? (
            <ApiSelect
              required={true}
              placeHolder={"Select Customer name ..."}
              name={"customer_id"}
              api={(page, search) =>
                CustomerService.make<CustomerService>().indexWithPagination(
                  page,
                  search,
                )
              }
              defaultValues={
                defaultValues?.customer ? [defaultValues?.customer] : []
              }
              label={"Customer Name"}
              optionValue={"id"}
              getOptionLabel={(data: Customer) => (
                <p>
                  {TranslateClient(data.user?.first_name)}{" "}
                  {TranslateClient(data.user?.middle_name)}{" "}
                  {TranslateClient(data.user?.last_name)}{" "}
                </p>
              )}
            />
          ) : (
            ""
          )}
        </Grid>
      </PageCard>
      <PageCard>
        <OtherDataInput
          defaultValues={defaultValues?.other_data ?? undefined}
        />
      </PageCard>
      <PageCard>
        <h2 className="card-title">Description :</h2>
        <Textarea
          name={"medical_condition"}
          required={true}
          label={"Medical Condition"}
        />
        <Textarea name={"note"} label={"Note"} />
        {type == "update" ? (
          <div className={"col-span-2"}>
            {defaultValues?.images?.length != 0 ? (
              <Gallery
                media={defaultValues?.images ? defaultValues?.images : [""]}
              />
            ) : (
              <div className="flex items-center">
                <label className="label"> {"Image"} : </label>
                <span className="text-lg badge badge-neutral">{"No Data"}</span>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
        <ImageUploader name={"images"} isMultiple={true} label={'Images'}/>
      </PageCard>
    </Form>
  );
};

export default PatientProfilesForm;