export enum PermissionsDoctor {
  MANGE_SCHEDULES = "manage-schedules",
  MANAGE_HOLIDAYS = "manage-holidays",
  MANAGE_SERVICE = "manage-services",
  MANAGE_OFFERS = "manage-offers",
  MANAGE_PATIENTS = "manage-patients",
  MANAGE_MEDICINES = "manage-medicines",
  MANAGE_APPOINTMENTS = "manage-appointments",
  EDIT_CLINIC_PROFILE = "edit-clinic-profile",
  MANAGE_EMPLOYEES = "manage-employees",
  ACCOUNTANT_MANAGEMENT = "accountant-management",
}

const PermissionsDoctorArray = (): string[] => {
  return Object.values(PermissionsDoctor);
};

export default PermissionsDoctorArray;
