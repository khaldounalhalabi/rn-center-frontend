import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ ...props }) => {
  return (
    <div className={`card m-3 bg-base-100 ${props.className} w-full`} {...props}>
      <div className={`card-body`}>{props.children}</div>
    </div>
  );
};

export default Card;
