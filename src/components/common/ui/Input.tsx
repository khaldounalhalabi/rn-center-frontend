"use client";

import React from "react";

interface prop extends React.InputHTMLAttributes<HTMLInputElement> {
  container: string;
  register: any;
  options: any;
}

const Input = (props: prop) => {
  return (
    <input
      className={props.className}
      id={props.id}
      placeholder={props.placeholder}
      type={props.type}
      {...props.register(props.id, props.options)}
    />
  );
};

export default Input;
