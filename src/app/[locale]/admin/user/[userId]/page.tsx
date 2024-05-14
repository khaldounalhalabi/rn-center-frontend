import PageCard from "@/components/common/ui/PageCard";
import React from "react";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import { Link } from "@/navigation";
import Grid from "@/components/common/ui/Grid";
import { UsersService } from "@/services/UsersService";
import { User } from "@/Models/User";
import { translate } from "@/Helpers/Translations";
import { Phone } from "@/Models/Phone";
import Gallery from "@/components/common/ui/Gallery";

const page = async ({ params: { userId } }: { params: { userId: number } }) => {
  const data = await UsersService.make<UsersService>().show(userId);
  const res: User = data?.data;
  const tagsArray = res?.tags.split(",");

  return (
    <PageCard>
      <div className="flex justify-between items-center w-full h-24">
        <h2 className="card-title">User Details</h2>
        <Link href={`/admin/user/${userId}/edit`}>
          <PrimaryButton type={"button"}>Edit</PrimaryButton>
        </Link>
      </div>
      <Grid md={2} gap={5}>
        <label className="label justify-start text-xl">
          Name :{" "}
          <span className="ml-2 badge badge-info  ">
            {translate(res?.first_name)} {translate(res?.middle_name)}{" "}
            {translate(res?.last_name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          Email :{" "}
          <span className="ml-2 badge badge-neutral  ">{res.email}</span>
        </label>
        <label className="label justify-start text-xl">
          Birth Date :{" "}
          <span className="ml-2 badge badge-outline  ">{res.birth_date}</span>
        </label>
        <label className="label justify-start text-xl">
          Age : <span className="ml-2 badge badge-accent  ">{res.age}</span>
        </label>
        <label className="label justify-start text-xl">
          Address :{" "}
          <span className="ml-2 badge badge-success  ">
            {translate(res.address.name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          City :{" "}
          <span className="ml-2 badge badge-ghost  ">
            {translate(res?.address.city?.name)}
          </span>
        </label>
        <label className="label justify-start text-xl">
          gender :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.gender}</span>
        </label>
        <label className="label justify-start text-xl">
          blood_group :{" "}
          <span className="ml-2 badge badge-accent  ">{res?.blood_group}</span>
        </label>
        <label className="label justify-start text-xl">
          Is Blocked :{" "}
          {res?.is_blocked ? (
            <span className="ml-2 badge badge-error">Blocked</span>
          ) : (
            <span className="ml-2 badge badge-success">Not Blocked</span>
          )}
        </label>
        <label className="label justify-start text-xl">
          Is Archived :{" "}
          {res?.is_archived ? (
            <span className="ml-2 badge badge-neutral">Archived</span>
          ) : (
            <span className="ml-2 badge badge-warning">Not Archived</span>
          )}
        </label>
      </Grid>
      <label className="label justify-start text-xl">
        Tags :{" "}
        {tagsArray ? (
          tagsArray.map((e, index) => (
            <span
              key={index}
              className="rtl:mr-1 ltr:ml-1 text-lg badge badge-neutral"
            >
              {e}
            </span>
          ))
        ) : (
          <span className="text-lg badge badge-neutral">No Data</span>
        )}
      </label>
      <label className="label justify-start text-xl">
        Phone :{" "}
        {res.phones?.slice(0, 2).map((item: Phone, index) => {
          return (
            <span className="ml-2 badge badge-accent  " key={item.id}>
              {" "}
              {item.phone} {index != 0 && index != 2 ? "/" : ""}
            </span>
          );
        })}
      </label>
      <div className={"w-full"}>
        {res?.image?.length != 0 ? (
          <Gallery media={res?.image ? res?.image : [""]} />
        ) : (
          <div className="flex justify-between items-center">
            <label className="label text-xl"> Image : </label>
            <span className="text-lg badge badge-neutral">No Data</span>
          </div>
        )}
      </div>
    </PageCard>
  );
};

export default page;
