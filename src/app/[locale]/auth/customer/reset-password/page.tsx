"use client";
import { Navigate } from "@/Actions/navigate";
import AuthSubmitButton from "@/components/common/Auth/Customer/AuthSubmitButton";
import Form from "@/components/common/ui/Form";
import InputLoginCustomer from "@/components/common/ui/Inputs/InputLoginCustomer";
import { CustomerAuthService } from "@/services/CustomerAuthService";

const Page = () => {
  const handleSubmit = async (data: {
    password: string;
    password_confirmation: string;
  }) => {
    return await CustomerAuthService.make<CustomerAuthService>().resetPassword(
      data,
    );
  };

  const handleSuccess = () => {
    Navigate("/auth/customer/login");
  };

  return (
    <div
      className={
        "min-w-full kodchasan tracking-5 min-h-screen content-end bg-gradient-to-b from-[#1FB8B9]  to-[#8AFEFF] md:flex md:justify-center md:items-center"
      }
    >
      <div
        className={
          "w-full md:w-[50%] max-w-[900px] md:h-full h-[85vh] flex flex-col  items-center "
        }
      >
        <h1
          className={
            "kodchasan text-center text-[20px] md:text-[25px] font-semibold text-[#f1fcfc]"
          }
        >
          One Step away
        </h1>
        <h2 className="kodchasan text-center text-[20px] md:text-[25px] font-semibold text-[#f1fcfc]">
          Enter your new password
        </h2>
        <div
          className={
            "mt-[15vh] md:mt-10 bg-[#FFFFFF] opacity-90  md:opacity-[70%] rounded-t-[30px] md:rounded-[30px] w-full h-full"
          }
        >
          <div className={"card"}>
            <div
              className={
                "card-body className={'flex flex-col md:px-40 md:py-20 items-center"
              }
            >
              <Form
                handleSubmit={handleSubmit}
                onSuccess={handleSuccess}
                className={"w-full"}
                otherSubmitButton={(isSubmitting) => (
                  <AuthSubmitButton type="submit" isSubmitting={isSubmitting}>
                    Reset password
                  </AuthSubmitButton>
                )}
                defaultButton={false}
              >
                <InputLoginCustomer
                  name={"password"}
                  label={"New Password"}
                  type={"password"}
                  labelClass={
                    "text-[#013567] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />

                <InputLoginCustomer
                  name={"password_confirmation"}
                  label={"Confirm password"}
                  type={"password"}
                  labelClass={
                    "text-[#013567] font-light text-[16px] md:text-[20px]"
                  }
                  conClass={"my-8"}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
