import React from "react";
import Grid from "@/components/common/ui/Grid";

const Page = () => {
  return (
    <>
      <Grid md={2}  className={"w-[100%] h-[100vh] my-3"}>
        <div className={"w-full bg-red-700"}></div>
        <div className={"w-full bg-blue-700"}></div>
        <div className={"w-full bg-green-700"}></div>
      </Grid>
    </>
  );
};

export default Page;
