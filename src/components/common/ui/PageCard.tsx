import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { CardActions } from "@mui/material";

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
        {title && <CardTitle className={"text-xl"}>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
        {actions && (
          <CardActions className={"justify-end"}>
            {typeof actions == "function" ? actions() : actions}
          </CardActions>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default PageCard;
