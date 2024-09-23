"use client";
import { User } from "@/Models/User";
import Form from "../../ui/Form";
import Grid from "../../ui/Grid";
import InputLoginCustomer from "../../ui/Inputs/InputLoginCustomer";
import Datepicker from "../../ui/Date/Datepicker";
import ApiSelect from "../../ui/Selects/ApiSelect";
import { CityService } from "@/services/CityService";
import { TranslateClient } from "@/Helpers/TranslationsClient";
import { CustomerAuthService } from "@/services/CustomerAuthService";
import { Navigate } from "@/Actions/navigate";
import AuthSubmitButton from "./AuthSubmitButton";

const UpdateUserDetailsForm = ({ user }: { user: User }) => {
  const handleSubmit = (data: {
    first_name: string;
    middle_name: string;
    last_name: String;
    birth_date: string;
    phone_numbers: string[];
    address: { name: string; city_id: number };
  }) => {
    return CustomerAuthService.make<CustomerAuthService>(
      "customer",
    ).updateUserDetails(data);
  };

  console.log(user);

  return (
    <Form
      defaultValues={user}
      handleSubmit={handleSubmit}
      onSuccess={() => {
        Navigate("/customer");
      }}
      defaultButton={false}
      otherSubmitButton={(isSubmitting) => (
        <AuthSubmitButton disabled={isSubmitting}>Update</AuthSubmitButton>
      )}
    >
      <Grid>
        <InputLoginCustomer
          label={"first name"}
          type={"text"}
          name={"first_name"}
        />
        <InputLoginCustomer
          label={"middle name"}
          type={"text"}
          name={"middle_name"}
        />
        <InputLoginCustomer
          label={"last name"}
          type={"text"}
          name={"last_name"}
        />
        <InputLoginCustomer
          label={"phone number"}
          type={"tel"}
          name={"phone_numbers[0]"}
        />

        <InputLoginCustomer
          label={"Address"}
          type={"text"}
          name={"address[name]"}
        />
      </Grid>
      <Grid>
        <Datepicker name={"birth_date"} label="birth date" />
        <ApiSelect
          name={"address.city_id"}
          label={"city"}
          placeHolder={"Select City Name ..."}
          api={(page?: number | undefined, search?: string | undefined) =>
            CityService.make<CityService>().getAllCities(page, search)
          }
          getOptionLabel={(item) => TranslateClient(item.name)}
          optionValue={"id"}
          defaultValues={user?.address?.city ? [user?.address?.city] : []}
        />
      </Grid>
    </Form>
  );
};

export default UpdateUserDetailsForm;
