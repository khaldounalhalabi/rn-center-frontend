// "use client";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import Input from "@/components/common/ui/Inputs/Input";
// import { POST } from "@/Http/Http";
// import { useRouter } from "next/navigation";
// import Grid from "@/components/common/ui/Grid";
// import Trash from "@/components/icons/Trash";
// import Form from "@/components/common/ui/Form";
// import CityArray from "@/enm/city";
// import ImageUploader from "@/components/common/ui/ImageUploader";
// import SelectPopOverFrom from "@/components/common/ui/Selects/SelectPopOverForm";
// import ApiSelect from "@/components/common/ui/Selects/ApiSelect";
// import {CityService} from "@/services/CityService";
// import {translate} from "@/Helpers/Translations";
//
// const page = () => {
//   const url: string = `${process.env.localApi}customer/register`;
//   const {
//     register,
//     formState: { errors },
//   } = useForm<any>();
//   const history = useRouter();
//
//   const [phonesNum, setPhonesNum] = useState(1);
//
//
//   const handleSubmit = async (data: any) => {
//     console.log(data)
//     return await POST(url, data).then((res) => {
//       console.log(res)
//       window.localStorage.setItem("customer", data.email);
//       res.code == 200 ? history.push(`/customer`) : false;
//       return res;
//     });
//   };
//   return (
//     <div
//       className="flex justify-center items-center p-32 w-full h-full"
//       style={{
//         background:
//           "linear-gradient(to bottom, rgba(249, 250, 251, 0.9), rgba(249, 250, 251, 0.9)), url(https://dc621.4shared.com/img/GqP7JQWBjq/s24/18e1e7686a0/overlay_4?async&rand=0.9085352286261172)",
//       }}
//     >
//       <div className="bg-base-100 shadow-xl w-full card">
//         <div className="card-body">
//           <div className="flex justify-center">
//             <h1 className="font-bold text-xl">Registration Form</h1>
//           </div>
//           <h2 className="mb-4 card-title">
//             Fill The Following Information To Create A New Account
//           </h2>
//           <Form handleSubmit={handleSubmit}>
//            <Grid md={3}>
//              <Input
//                  label={"First Name :"}
//
//                  name="first_name"
//                  type="text"
//                  placeholder="Enter Your First Name"
//              />
//              <Input
//                  label={"Middle Name :"}
//
//                  name="middle_name"
//                  type="text"
//                  placeholder="Enter Your Middle Name"
//              />
//              <Input
//                  label={"Last Name :"}
//
//                  name="last_name"
//                  type="text"
//                  placeholder="Enter Your Last Name"
//              />
//
//            </Grid>
//
//             <label className="col-span-6 label">Email :</label>
//             <Input name="email" type="email" placeholder="Enter Your Email" />
//           <Grid md={2}>
//               <Input label='Password :' name="password" type="text" placeholder="Enter Password" />
//               <Input
//                   label='Password Confirmation :'
//                   name="password_confirmation"
//                   type="text"
//                   placeholder="Confirm Password"
//               />
//               <Input
//                   label={"Mother Full Name :"}
//                   required={true}
//                   name="mother_full_name"
//                   type="text"
//                   placeholder="Enter mother full name"
//               />
//               <Input
//                   label={"Phone :"}
//                   required={true}
//                   name="phone_number"
//                   type="number"
//                   placeholder="Enter Phone Number ..."
//               />
//               <div className={`flex gap-5 p-2 items-center`}>
//                   <label className={`bg-pom p-2 rounded-md text-white`}>Gender:</label>
//                   <Input
//                       name={"gender"}
//                       label="Male"
//                       type="radio"
//                       className="radio radio-info"
//                       value={"male"}
//
//                   />
//
//                   <Input
//                       name={"gender"}
//                       label={"Female"}
//                       type="radio"
//                       className="radio radio-info"
//                       value={"female"}
//                   />
//               </div>
//               {/*<ApiSelect*/}
//               {/*    required={true}*/}
//               {/*    name={"city"}*/}
//               {/*    label={"city"}*/}
//               {/*    placeHolder={"Select City Name ..."}*/}
//               {/*    api={(page?: number | undefined, search?: string | undefined) =>*/}
//               {/*        CityService.make<CityService>().indexWithPagination(page, search)*/}
//               {/*    }*/}
//               {/*    getOptionLabel={(item) => TranslateClient(item.name)}*/}
//               {/*    optionValue={"id"}*/}
//
//               {/*/>*/}
//           </Grid>
//             <ImageUploader name={"image"} />
//
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// };
//
// export default page;

import React from "react";

const Page = () => {
  return <div></div>;
};

export default Page;