import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card: React.FC<CardProps> = ({ ...props }) => {
  return (
    <div className={`card bg-base-100 ${props.className}`} {...props}>
      <div className={`card-body`}>{props.children}</div>
    </div>
  );
};

export default Card;
