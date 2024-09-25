import { Value } from "@/components/common/ui/LabelsValues/Value";
import { Label } from "@/components/common/ui/LabelsValues/Label";

export const LabelValue = ({
  label,
  value,
  color = "primary",
  col = false,
}: {
  label: string | any;
  value: any;
  color: DaisyUiColor;
  col?: boolean;
}) => {
  return (
    <Label col={col} label={label}>
      <Value color={color} value={value} />
    </Label>
  );
};
