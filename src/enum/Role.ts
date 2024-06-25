export enum Role {
  ADMIN = "admin",
  CUSTOMER = "customer",
  DOCTOR = "doctor",
  CLINIC_EMPLOYEE = "clinic-employee"
}

const Roles = (): string[] => {
  return Object.values(Role);
};

export default Roles;