import { BaseService } from "@/services/BaseService";
import Payslip from "@/models/Payslip";
import { GET, POST } from "@/http/Http";
import PayslipStatusEnum from "@/enums/PayslipStatusEnum";

class PayslipService extends BaseService<PayslipService, Payslip>() {
  getBaseUrl(): string {
    return `${this.role}/payslips`;
  }

  public async getByPayrun(
    payrunId: number,
    page: number = 0,
    search?: string,
    sortCol?: string,
    sortDir?: string,
    per_page?: number,
    params?: object,
  ) {
    const response = await GET<Payslip[]>(
      `${this.role}/payruns/${payrunId}/payslips`,
      {
        page: page,
        search: search,
        sort_col: sortCol,
        sort_dir: sortDir,
        per_page: per_page,
        ...params,
      },
      this.headers,
    );
    return this.errorHandler(response);
  }

  public async toggleStatus(payslipId: number, status: PayslipStatusEnum) {
    const response = await POST<PayslipStatusEnum>(
      `/admin/payslips/${payslipId}/toggle-status`,
      {
        status: status,
      },
    );
    return this.errorHandler(response);
  }
}

export default PayslipService;