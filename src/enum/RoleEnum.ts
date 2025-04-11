export enum RoleEnum {
  ADMIN = "admin",
  CUSTOMER = "customer",
  DOCTOR = "doctor",
  SECRETARY = "secretary",
}

const Roles = (): string[] => {
  return Object.values(RoleEnum);
};

export default Roles;
