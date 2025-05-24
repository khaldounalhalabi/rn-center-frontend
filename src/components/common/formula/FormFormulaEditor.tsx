import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/shadcn/form";
import FormulaEditor from "@/components/common/formula/FormulaEditor";
import FormulaVariable from "@/models/FormulaVariable";

const FormFormulaEditor = ({
  name,
  defaultTemplate = undefined,
  defaultFormula = undefined,
  variables = [],
  onChange = undefined,
}: {
  name: string;
  defaultFormula?: string;
  defaultTemplate?: string;
  variables: FormulaVariable[];
  onChange?: (input: string) => void;
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <FormulaEditor
              variables={variables}
              defaultFormula={defaultFormula}
              defaultTemplate={defaultTemplate}
              onChange={(formula) => {
                field.onChange(formula);
                if (onChange) {
                  onChange(formula);
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFormulaEditor;
