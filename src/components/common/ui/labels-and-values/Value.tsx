"use client";
import React, { HTMLProps, ReactNode } from "react";
import { TranslateStatusOrTypeClient } from "@/helpers/TranslationsClient";
import { DaisyUiColor, DaisyUIColors } from "@/types/DaisyUiColor";

interface ValueProps extends HTMLProps<HTMLDivElement> {
  value?: any;
  color?: DaisyUiColor | string;
  children?: ReactNode;
}

export const Value: React.FC<ValueProps> = ({
  value,
  color = undefined,
  children,
  className,
  ...props
}) => {
  let showedValue = value;
  if (value === undefined || value === null) {
    showedValue = TranslateStatusOrTypeClient("no_data");
  } else if (value === 0 || Number.isNaN(value)) {
    showedValue = 0;
  } else if (value === false) {
    showedValue = "false";
  } else if (value === "") {
    showedValue = TranslateStatusOrTypeClient("no_data");
  } else if (
    typeof value == "string" &&
    (value?.includes("undefined") || value?.includes("null"))
  ) {
    showedValue = TranslateStatusOrTypeClient("no_data");
  } else if (typeof value == "string" && value.includes("NaN")) {
    showedValue = 0;
  }
  if (!color) {
    color = DaisyUIColors[Math.floor(Math.random() * DaisyUIColors.length)];
  }
  return (
    <div
      className={
        className ??
        `text-start ${colorMatcher(color)} text-xs font-normal md:text-base`
      }
      {...props}
    >
      {!children ? <span>{showedValue}</span> : children}
    </div>
  );
};

const colorMatcher = (color: string) => {
  switch (color) {
    case "primary":
      return "text-primary";
    case "primary-content":
      return "text-primary-content";
    case "secondary":
      return "text-secondary";
    case "secondary-content":
      return "text-secondary-content";
    case "accent":
      return "text-accent";
    case "accent-content":
      return "text-accent-content";
    case "neutral":
      return "text-neutral";
    case "neutral-content":
      return "text-neutral-content";
    case "base-100":
      return "text-base-100";
    case "base-200":
      return "text-base-200";
    case "base-300":
      return "text-base-300";
    case "base-content":
      return "text-base-content";
    case "info":
      return "text-info";
    case "info-content":
      return "text-info-content";
    case "success":
      return "text-success";
    case "success-content":
      return "text-success-content";
    case "warning":
      return "text-warning";
    case "warning-content":
      return "text-warning-content";
    case "error":
      return "text-error";
    case "error-content":
      return "text-error-content";
    case "pom":
      return "text-pom";
    case "title":
      return "text-title";
    case "brand-primary":
      return "text-brand-primary";
  }
};
