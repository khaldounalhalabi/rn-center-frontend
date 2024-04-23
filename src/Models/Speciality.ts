export interface Speciality {
  id: number;
  name: string;
  description: string;
  tags: string;
}

export interface AddSpeciality {
  id?: number;
  name: string;
  description: string;
  tags: string;
}
