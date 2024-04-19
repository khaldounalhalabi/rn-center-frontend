import { Department } from "./Departments";
import { Media } from "./Media";
import { Phone } from "./Phone";

export interface Hospital {
  id: number;
  name: string;
  phones?: Phone[];
  available_departments?: Department[];
  images?: Media[];
}

export interface AddHospital {
  id?: number;
  name: string;
  phone_numbers: string[];
  available_departments?: Department[] | number[];
  images?: Media[] | string[];
}
