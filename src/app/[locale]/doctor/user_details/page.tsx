import {User} from "@/Models/User";
import PageCard from "@/components/common/ui/PageCard";
import {Link} from "@/navigation";
import PrimaryButton from "@/components/common/ui/PrimaryButton";
import React from "react";
import {getMedia} from "@/Models/Media";
import RoundedImage from "@/components/common/RoundedImage";
import TranslateServer from "@/Helpers/TranslationsServer";
import Grid from "@/components/common/ui/Grid";
import {AuthService} from "@/services/AuthService";


const page = async ()=>{

    const data = await AuthService.make<AuthService>("doctor").GetUserDetails()
    const res :User = data.data
    console.log(res)
    return (
      <PageCard>
        <div className="flex justify-between items-center  w-full h-24">
          <h2 className="card-title ">Name : {' '}
            {await TranslateServer(res.first_name)}{" "}
            {await TranslateServer(res.middle_name)}{" "}
            {await TranslateServer(res.last_name)}
          </h2>

          <Link href={`/doctor/user_details/edit`}>
            <PrimaryButton type={"button"}>Edit</PrimaryButton>
          </Link>
        </div>
        <hr />
        <div className="w-full flex my-4 h-40">
          <div className={"w-1/2  flex flex-col h-full justify-between"}>
            <RoundedImage
              src={getMedia(res?.image?.[0] ?? undefined)}
              alt={"doctor-profile"}
              className={"w-24 h-24"}
            />

            <h2>Email : <span className='badge badge-accent'>{res?.email}</span></h2>
          </div>
          <div className="w-1/2  flex flex-col h-full justify-between">
              <h2>Birth Date : <span className='badge badge-outline'>{res?.birth_date}</span></h2>
              <h2 >Gender : <span className='badge ml-3 mt-1 badge-warning'>{res?.gender}</span></h2>
          </div>
        </div>
          <hr/>
          <div className={'w-full  my-4'}>
            <div className={'h-2/3 flex flex-col justify-between'}>
                <Grid md={'2'} className={' justify-between h-52'}>
                    <h2>Age : <span className='badge badge-info'>{res?.age}</span></h2>
                    <h2 >Blood Group : <span className='badge ml-3 mt-1 badge-warning'>{res?.blood_group ?? "No Data"}</span></h2>
                </Grid>
            </div>

          </div>
      </PageCard>
    );
}

export default page