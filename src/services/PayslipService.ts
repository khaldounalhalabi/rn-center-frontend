import { BaseService } from "@/services/BaseService";
import Payslip from "@/models/Payslip";

class PayslipService extends BaseService<PayslipService, Payslip>() {
  getBaseUrl(): string {
    return `${this.role}/payslips`;
  }
}