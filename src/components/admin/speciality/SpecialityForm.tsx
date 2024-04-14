'use client'
import Form from "@/components/common/ui/Form";
import TranslatableInput from "@/components/common/ui/Inputs/TranslatableInput";
import React from "react";
import {AddSpeciality} from "@/Models/Speciality";
import TextArea from "@/components/common/ui/TextArea";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import {navigate} from "@/Actions/navigate";
import {SpecialityService} from "@/services/SpecialityService";
import InputTags from "@/components/common/ui/InputTags";

const SpecialityForm = ({
  defaultValues = undefined,
  id,
  type = "store",
}: {
  defaultValues?: AddSpeciality;
  id?: number;
  type?: "store" | "update";
}) => {
  const handleSubmit = async (data: any) => {
    console.log(data);
    return await SpecialityService.make().store(data)
  };
  const onSuccess = () => {
    navigate(`/admin/clinics/speciality`);
  };
  const array = defaultValues?.tags.split(',')
  return (
    <Form
      handleSubmit={handleSubmit}
      onSuccess={onSuccess}
      defaultValues={defaultValues}
    >
        <div>
          <TranslatableInput
              locales={["en", "ar"]}
              type={"text"}
              placeholder={"John"}
              label={"Speciality Name"}
              name={"name"}
          />
        </div>
      <div className='my-3'>
        <InputTags name={'tags'} label={'Tags : '} />
      </div>
      <div className='my-3'>
        <TextArea name={'description'} label={'Description : '} defaultValue={array?array:[]}/>
      </div>
      <div className="flex justify-center my-3">
        <PrimaryButton type={"submit"}>Submit</PrimaryButton>
      </div>
    </Form>
  );
};

export default SpecialityForm;
