export const splitFormulaToSegments = (formula: string) => {
  const result: string[] = [];
  let buffer: string[] = [];
  let depth = 0;
  let inCondition = false; // Tracks whether we are inside an IF condition or similar structure
  let ifDepth = 0; // Tracks depth for IF-specific structures

  for (let i = 0; i < formula.length; i++) {
    const char = formula[i];

    // Detect IF expressions and manage their depth
    if (!inCondition && formula.substring(i, i + 2) === "IF") {
      inCondition = true;
      ifDepth++;
      buffer.push("IF");
      i++; // Skip 'F' in 'IF'
    } else if (inCondition) {
      buffer.push(char);

      if (char === "(") {
        ifDepth++;
      } else if (char === ")") {
        ifDepth--;
      }

      if (ifDepth === 0) {
        inCondition = false;
      }
    } else if (char === "(") {
      depth++;
      buffer.push(char);
    } else if (char === ")") {
      depth--;
      buffer.push(char);
    } else if ((char === "+" || char === "-") && depth === 0) {
      result.push(buffer.join("").trim());
      buffer = [char];
    } else {
      buffer.push(char);
    }
  }

  if (buffer.length > 0) {
    result.push(buffer.join("").trim());
  }

  return result;
};

