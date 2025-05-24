import PayslipStatusEnum from "@/enums/PayslipStatusEnum";
import { User } from "@/models/User";
import Formula from "@/models/Formula";
import PayslipAdjustment from "@/models/PayslipAdjustment";
import Payrun from "@/models/Payrun";

interface Payslip {
  id: number;
  payrun_id: number;
  payrun?:Payrun;
  user_id: number;
  formula_id: number;
  paid_days: number;
  gross_pay: number;
  net_pay: number;
  status: PayslipStatusEnum;
  error?: PayslipError[];
  edited_manually: boolean;
  details?: {
    earnings: { label: string; value: number; errors?: PayslipError[] }[];
    deductions: { label: string; value: number; errors?: PayslipError[] }[];
    variables_values?: {
      [k: string]: {
        label: string;
        value: string;
      };
    }[];
  };
  user?: User;
  formula?: Formula;
  payslip_adjustments?: PayslipAdjustment[];
  total_benefits: number;
  total_deductions: number;
  can_update?: boolean;
  can_download?: boolean;
}

interface PayslipError {
  flag: string;
  message: string;
}

export default Payslip;
