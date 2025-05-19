import { BaseService } from "@/services/BaseService";
import Formula from "@/models/Formula";

class FormulaService extends BaseService<FormulaService, Formula>() {
  getBaseUrl(): string {
    return `${this.role}/formulas`;
  }
}

export default FormulaService;
