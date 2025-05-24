import { BaseService } from "@/services/BaseService";
import PayslipAdjustment from "@/models/PayslipAdjustment";

class PayslipAdjustmentService extends BaseService<
  PayslipAdjustmentService,
  PayslipAdjustment
>() {
  getBaseUrl(): string {
    return `${this.role}/payslip-adjustments`;
  }
}
