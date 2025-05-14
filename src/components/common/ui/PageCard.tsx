import React, { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

interface PageCardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

const PageCard: React.FC<PageCardProps> = ({
  title , description,children
}) => {
  return (
    <Card className={"mx-5"}>
      <CardHeader>
        {title && (<CardTitle>{title}</CardTitle>)}
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default PageCard;
