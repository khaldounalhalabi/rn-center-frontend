"use client";
import Form from "@/components/common/ui/Form";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import { navigate } from "@/Actions/navigate";
import Grid from "@/components/common/ui/Grid";
import { CategoryService } from "@/services/CategoryService";
import { ServiceCategory } from "@/Models/ServiceCategory";

const CategoryForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: ServiceCategory;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    if (
      type === "update" &&
      (defaultValues?.id != undefined || id != undefined)
    ) {
      console.log(data);
      return CategoryService.make<CategoryService>("admin")
        .update(defaultValues?.id ?? id, data)
        .then((res) => {
          return res;
        });
    } else {
      return await CategoryService.make<CategoryService>("admin").store(data);
    }
  };
  const onSuccess = () => {
    navigate(`/admin/category`);
  };

  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
      <Grid md={"2"}>
        <TranslatableInput
          locales={["en", "ar"]}
          type={"text"}
          placeholder={"John"}
          label={"ServiceCategory Name"}
          name={"name"}
        />
      </Grid>

      <div className="flex justify-center my-3">
        <PrimaryButton type={"submit"}>Submit</PrimaryButton>
      </div>
    </Form>
  );
};

export default CategoryForm;
