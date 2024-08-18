import UpdateUserDetailsForm from "@/components/common/Auth/Customer/UpdateUserDetailsForm";
import TranslateServer from "@/Helpers/TranslationsServer";
import { CustomerAuthService } from "@/services/CustomerAuthService";

const Page = async () => {
  let user = (
    await (await CustomerAuthService.make<CustomerAuthService>())?.userDetails()
  ).data;
  const defaultData = {
    ...user,
    first_name: await TranslateServer(user.first_name),
    middle_name: await TranslateServer(user.middle_name),
    last_name: await TranslateServer(user.last_name),
    address: user.address
      ? {
          ...user.address,
          name: await TranslateServer(user.address?.name),
        }
      : undefined,
    phone_numbers: [user.phones?.[0]?.phone],
  };

  return (
    <div className="p-10">
      <UpdateUserDetailsForm user={defaultData} />
    </div>
  );
};

export default Page;
