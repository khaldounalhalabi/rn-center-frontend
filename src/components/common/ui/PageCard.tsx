import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import React, { ReactNode } from "react";

interface PageCardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode | (() => ReactNode);
}

const PageCard: React.FC<PageCardProps> = ({
  title,
  description,
  children,
  actions = undefined,
}) => {
  return (
    <Card className={"mx-5"}>
      <CardHeader>
        {title && (
          <CardTitle className={"text-xl flex flex-row w-full justify-between"}>
            {title}{" "}
            {actions && (
              <div className={"flex justify-end items-center"}>
                {typeof actions == "function" ? actions() : actions}
              </div>
            )}
          </CardTitle>
        )}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default PageCard;
