import { GET } from "@/http/Http";
import MedicinePrescription from "@/models/MedicinePrescription";
import { BaseService } from "@/services/BaseService";

class MedicinePrescriptionService extends BaseService<
  MedicinePrescriptionService,
  MedicinePrescription
>() {
  getBaseUrl(): string {
    return `/${this.role}/medicine-prescriptions`;
  }

  public async toggleStatus(id: number) {
    const response = await GET<boolean>(`${this.baseUrl}/${id}/toggle-status`);
    return this.errorHandler(response);
  }
}

export default MedicinePrescriptionService;
