import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/shadcn/form";
import FormulaEditor from "@/components/common/formula/FormulaEditor";
import FormulaVariable from "@/models/FormulaVariable";

const FormFormulaEditor = ({
  name,
  label,
  defaultTemplate = undefined,
  defaultFormula = undefined,
  variables = [],
}: {
  name: string;
  label: string;
  defaultFormula?: string;
  defaultTemplate?: string;
  variables: FormulaVariable[];
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <FormulaEditor
              variables={variables}
              defaultFormula={defaultFormula}
              defaultTemplate={defaultTemplate}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFormulaEditor;
