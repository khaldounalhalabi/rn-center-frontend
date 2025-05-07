import React from "react";

interface PageCardProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageCard: React.FC<PageCardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`relative m-2 ${className}`} {...props}>
      <div className={`card bg-base-100`}>
        <div className={`card-body`}>{children}</div>
      </div>
    </div>
  );
};

export default PageCard;
