import React from "react";

const PageCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`relative`}>
      <div className={`card bg-base-100 m-2`}>
        <div className={`card-body`}>{children}</div>
      </div>
    </div>
  );
};

export default PageCard;
