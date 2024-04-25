import { Address } from "./Address";
import { Department } from "./Departments";
import { Media } from "./Media";
import { Phone } from "./Phone";

export interface Hospital {
  id: number;
  name: string;
  phones?: Phone[];
  available_departments?: Department[];
  images?: Media[];
  address?: Address;
}

export interface AddHospital {
  id?: number;
  name: string;
  phone_numbers: string[];
  available_departments?: Department[];
  photos?: Media[] | string[];
  address?: Address;
  images?: Media[];
}
