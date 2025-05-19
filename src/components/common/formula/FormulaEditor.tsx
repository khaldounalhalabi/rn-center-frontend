"use client";

import FormulaVariable from "@/models/FormulaVariable";
import Tooltip from "@/components/common/ui/Tooltip";
import { Badge } from "@/components/ui/shadcn/badge";
import { useEffect, useRef, useState } from "react";
import "./variables.css";

const signs = [
  "*",
  "/",
  "+",
  "-",
  "(",
  ")",
  "IF",
  "NOT",
  "AND",
  "OR",
  "<",
  "<=",
  ">",
  ">=",
  "!=",
  "<>",
  "=",
];

const FormulaEditor = ({ variables }: { variables: FormulaVariable[] }) => {
  const [template, setTemplate] = useState(
    ``,
  );
  const contentRef = useRef<HTMLDivElement>(null);

  // Save caret position as character offset inside contentEditable
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
  }, [template]);

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
    const validChars = /^[0-9+\-*/(),\s]$/; // Added comma (,) here

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
      />
      <div className="rounded-md flex flex-col gap-5 items-start border border-secondary max-h-64 overflow-y-scroll p-5 w-[20%]">
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
          "rounded-md flex flex-col gap-5 items-start border border-secondary max-h-64 overflow-y-scroll p-5 w-[15%]"
        }
      >
        {signs.map((sign, index) => (
          <Badge
            onClick={() => addChar(sign)}
            className="cursor-pointer font-bold"
          >
            {sign}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default FormulaEditor;
