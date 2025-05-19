import { BaseService } from "@/services/BaseService";
import FormulaVariable from "@/models/FormulaVariable";
import { ApiResponse } from "@/http/Response";
import { GET } from "@/http/Http";

class FormulaVariableService extends BaseService<
  FormulaVariableService,
  FormulaVariable
>() {
  getBaseUrl(): string {
    return `${this.role}/formula-variables`;
  }

  async all(): Promise<ApiResponse<FormulaVariable[]>> {
    const response = await GET<FormulaVariable[]>(`${this.baseUrl}`);
    return this.errorHandler(response);
  }
}

export default FormulaVariableService;
