import React, { useEffect, useState } from "react";
import Grid from "@/components/common/ui/Grid";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/common/ui/labels-and-values/Label";
import { splitFormulaToSegments } from "@/helpers/Formulas";
import FormulaVariable from "@/models/FormulaVariable";

interface SegmentData {
  segment: string;
  name: string;
}

const SegmentsInput = ({
  formula,
  onChange = undefined,
  defaultValue = undefined,
  variables = [],
}: {
  formula: string;
  onChange?: (segments: SegmentData[]) => void;
  defaultValue?: SegmentData[];
  variables: FormulaVariable[];
}) => {
  const getSegmentsData = (formula: string) => {
    const segments = splitFormulaToSegments(formula);
    return segments.map((segment, index) => {
      return {
        segment: segment,
        name: defaultValue?.[index]?.name ?? "",
      };
    });
  };

  const [segmentsData, setSegmentsData] = useState(
    defaultValue ?? getSegmentsData(formula),
  );

  useEffect(() => {
    setSegmentsData(getSegmentsData(formula));
  }, [formula]);

  const updateName = (index: number, value: string) => {
    const newFields = [...segmentsData];
    newFields[index].name = value;
    setSegmentsData(newFields);
    if (onChange) {
      onChange(segmentsData);
    }
  };

  return segmentsData.map((segment, index) => {
    let s = segment.segment;
    variables.forEach((v) => {
      const slugPattern = new RegExp(`\\b${v.slug}\\b`, "g");
      s = s.replace(slugPattern, `{{${v.name}}}`);
    });
    return (
      <Grid key={index}>
        <Label col label={"Segment"}>
          <Input disabled value={s} />
        </Label>
        <Label col label={"Label"}>
          <Input
            type={"text"}
            defaultValue={segment.name}
            onChange={(event) => {
              updateName(index, event.target.value);
            }}
          />
        </Label>
      </Grid>
    );
  });
};

export default SegmentsInput;
