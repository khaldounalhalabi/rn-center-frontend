import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shadcn/tooltip";
import { ReactNode } from "react";

const Tooltip = ({
  title,
  children = undefined,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <TooltipProvider>
      <ShadcnTooltip>
        <TooltipTrigger type={"button"}>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </ShadcnTooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
