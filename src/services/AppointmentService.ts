import {BaseService} from "@/services/Contracts/BaseService";
import {Appointment} from "@/Models/Appointment";

export class AppointmentService extends BaseService<Appointment>{
    public baseUrl = '/appointments';
}