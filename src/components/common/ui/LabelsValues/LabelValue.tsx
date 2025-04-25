import { Value } from "@/components/common/ui/LabelsValues/Value";
import { Label } from "@/components/common/ui/LabelsValues/Label";
import { DaisyUiColor, DaisyUIColors } from "@/types/DaisyUiColor";

export const LabelValue = ({
  label,
  value,
  color = undefined,
  col = false,
}: {
  label: string | any;
  value: any;
  color?: DaisyUiColor;
  col?: boolean;
}) => {
  if (!color) {
    color = DaisyUIColors[Math.floor(Math.random() * DaisyUIColors.length)];
  }
  return (
    <Label col={col} label={label}>
      <Value color={color} value={value} />
    </Label>
  );
};
