import { BaseService } from "@/services/BaseService";
import Payrun from "@/models/Payrun";
import PayrunStatusEnum from "@/enums/PayrunStatusEnum";
import { GET, POST } from "@/http/Http";

class PayrunService extends BaseService<PayrunService, Payrun>() {
  getBaseUrl(): string {
    return `${this.role}/payruns`;
  }

  public toggleStatus = async (id: number, status: PayrunStatusEnum) => {
    const response = await POST<Payrun>(`${this.baseUrl}/${id}/toggle-status`, {
      status: status,
    });

    return this.errorHandler(response);
  };

  public async reprocessPayrun(id: number) {
    const response = await GET<Payrun>(`${this.baseUrl}/${id}/reprocess`);
    return this.errorHandler(response);
  }
}

export default PayrunService;
