"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shadcn/tooltip";
import { Badge } from "@/components/ui/shadcn/badge";

const FormulaTemplateViewer = ({ formula }: { formula: string }) => {
  const parseString = (str: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/html");
    const nodes = doc.body.childNodes;
    return Array.from(nodes).map((node, index) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "VAR") {
        const element = node as HTMLElement;
        const label = element.getAttribute("attr-label") || "Unknown";
        const description = element.getAttribute("attr-description") || "";
        // const content = element.textContent || "";

        return (
          <TooltipProvider>
            <Tooltip key={index}>
              <TooltipTrigger>
                <Badge className="mx-1 cursor-pointer" variant="secondary">
                  {label}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      } else if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent || "";

        // Split text content into signs and other characters
        const parts = textContent.split(/([\+\-\*\/=])/);

        return parts.map((part, partIndex) => {
          const isSign = /[\+\-\*\/=]/.test(part);
          return isSign ? (
            <span key={`${index}-${partIndex}`} className="font-extrabold mx-1">
              {part == "*" ? "x" : part}
            </span>
          ) : (
            <span key={`${index}-${partIndex}`} className="text-primary">
              {part}
            </span>
          );
        });
      }
      return null;
    });
  };

  return (
    <div className="flex flex-wrap items-center">{parseString(formula)}</div>
  );
};

export default FormulaTemplateViewer;
