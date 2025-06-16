import PayslipAdjustment from "@/models/PayslipAdjustment";
import { BaseService } from "@/services/BaseService";

class PayslipAdjustmentService extends BaseService<
  PayslipAdjustmentService,
  PayslipAdjustment
>() {
  getBaseUrl(): string {
    return `${this.role}/payslip-adjustments`;
  }
}
