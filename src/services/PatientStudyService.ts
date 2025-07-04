import PatientStudy from "@/models/PatientStudy";
import { BaseService } from "./BaseService";

export default class PatientStudyService extends BaseService<
  PatientStudyService,
  PatientStudy
>() {
  public getBaseUrl(): string {
    return `/${this.role}/patient-studies`;
  }
}
