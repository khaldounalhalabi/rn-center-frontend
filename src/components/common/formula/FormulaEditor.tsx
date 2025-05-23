"use client";

import FormulaVariable from "@/models/FormulaVariable";
import Tooltip from "@/components/common/ui/Tooltip";
import { Badge } from "@/components/ui/shadcn/badge";
import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const signs = [
  { string: "*", description: "50 * 5" },
  { string: "/", description: "100 / 10" },
  { string: "+", description: "10 + 5" },
  { string: "-", description: "10 - 5" },
  { string: "(", description: "(" },
  { string: ")", description: ")" },
  {string: "IF" , description: "IF( 50 > 5 , 50 , 10)"},
  {string: "NOT" , description: "NOT(50 < 5)"},
  {string: "AND" , description: "AND(50 > 5 , 80 > 8)"},
  {string: "OR" , description: "OR(50 < 80 , 80 < 5)"},
  {string: "<" , description: "5 < 8"},
  {string: "<=" , description: "5 <= 10"},
  {string: ">" , description: "5 > 10"},
  {string: ">=" , description: "5 >= 10"},
  {string: "!=" , description: "5 != 10"},
  {string: "<>" , description: "5 <> 10"},
  {string: "=" , description: "5 = 10"},
];

const FormulaEditor = ({
  variables,
  defaultFormula = undefined,
  defaultTemplate = undefined,
  onChange = undefined,
}: {
  variables: FormulaVariable[];
  defaultTemplate?: string;
  defaultFormula?: string;
  onChange?: (formula: string) => void;
}) => {
  const t = useTranslations("formulas");
  const [template, setTemplate] = useState(
    parseHtmlTemplateToFormulaTemplate(variables, defaultTemplate ?? ""),
  );
  const [formula, setFormula] = useState(
    defaultFormula ? defaultFormula : parseTemplateToFormula(variables, template),
  );
  const contentRef = useRef<HTMLDivElement>(null);

  const saveCaretPosition = (): number | null => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;

    const range = sel.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(contentRef.current!);
    preRange.setEnd(range.endContainer, range.endOffset);

    return preRange.toString().length;
  };

  // Restore caret position from character offset
  const restoreCaretPosition = (chars: number | null) => {
    if (chars === null || !contentRef.current) return;

    const node = contentRef.current;
    let currentChar = 0;
    let range = document.createRange();
    let found = false;

    const traverseNodes = (n: Node) => {
      if (found) return;

      if (n.nodeType === Node.TEXT_NODE) {
        const textLength = n.textContent?.length || 0;
        if (currentChar + textLength >= chars) {
          range.setStart(n, chars - currentChar);
          range.collapse(true);
          found = true;
        } else {
          currentChar += textLength;
        }
      } else {
        n.childNodes.forEach(traverseNodes);
      }
    };

    traverseNodes(node);

    if (found) {
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  };

  const setCaretToEnd = () => {
    if (contentRef.current) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(contentRef.current);
      range.collapse(false); // Move caret to the end
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = template;
      setCaretToEnd(); // Ensure caret moves to the end after any update
    }

    setFormula(parseTemplateToFormula(variables, template));
  }, [template]);

  useEffect(() => {
    if (onChange) {
      onChange(formula);
    }
  }, [formula]);

  const handleInput = () => {
    const caretPos = saveCaretPosition();

    if (contentRef.current) {
      setTemplate(contentRef.current.innerHTML);

      // Wait for React to apply the new state & DOM update, then restore caret
      window.requestAnimationFrame(() => {
        restoreCaretPosition(caretPos);
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const validChars = /^[0-9+\-*/(),><=!\s]$/;

    if (
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.ctrlKey ||
      event.metaKey
    ) {
      return; // Allow navigation and deletion keys
    }

    if (event.key.length === 1 && !validChars.test(event.key)) {
      event.preventDefault(); // Prevent invalid characters
    }
  };

  const addChar = (char: FormulaVariable | string) => {
    if (typeof char != "string") {
      char = `{{${char.name}}}`;
    }
    const updatedTemplate = template + char;
    const caretPos = (saveCaretPosition() ?? 0) + char.length;

    if (contentRef.current) {
      window.requestAnimationFrame(() => {
        restoreCaretPosition(caretPos);
      });
    }
    setTemplate(updatedTemplate);
  };

  return (
    <div className="max-h-64 w-full gap-2 flex items-start">
      <div
        ref={contentRef}
        contentEditable
        className="border p-4 rounded-md bg-background text-primary overflow-auto focus:outline-none w-[65%] max-h-64 h-64"
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        suppressContentEditableWarning={true}
        spellCheck={false}
        dir={"ltr"}
      />
      <div className="relative rounded-md flex flex-col gap-5 items-start border border-secondary max-h-64 overflow-y-scroll p-1 w-[20%]">
        <div className={"bg-primary text-secondary p-1 w-full font-extrabold rounded-md sticky top-0"}>{t("variables")}</div>
        {variables.map((variable, index) => (
          <Tooltip title={variable?.description ?? ""} key={index}>
            <Badge
              onClick={() => addChar(variable)}
              className="cursor-pointer font-bold"
            >
              {variable.name}
            </Badge>
          </Tooltip>
        ))}
      </div>
      <div
        className={
          "relative rounded-md flex flex-col gap-5 items-start border border-secondary max-h-64 overflow-y-scroll p-1 w-[15%]"
        }
      >
        <div className={"bg-primary text-secondary p-1 w-full font-extrabold rounded-md sticky top-0"}>{t("signs")}</div>
        {signs.map((sign, index) => (
          <Tooltip title={sign.description}>
            <Badge
            onClick={() => addChar(sign.string)}
            className="cursor-pointer font-bold"
            key={index}
          >
            {sign.string}
          </Badge>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

const parseTemplateToFormula = (
  variables: FormulaVariable[],
  template: string,
) => {
  if (template.length == 0) {
    return "";
  }

  let formula = template;
  variables.forEach((variable) => {
    const templateVariable = `{{${variable.name}}}`;
    formula = formula.replaceAll(templateVariable, variable.slug);
  });

  return stripHtml(formula);
};

const stripHtml = (input: string) => {
  let text = input.replace(/<\/?[^>]+(>|$)/g, "");

  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

const parseHtmlTemplateToFormulaTemplate = (
  variables: FormulaVariable[],
  htmlTemplate: string,
) => {
  if (htmlTemplate.length == 0) {
    return "";
  }
  let template = htmlTemplate;
  variables.forEach((variable) => {
    template = template.replaceAll(
      `<var attr-description='${variable.description}' attr-label='${variable.name}'>${variable.slug}</var>`,
      `{{${variable.name}}}`,
    );
  });

  return template;
};

export default FormulaEditor;
