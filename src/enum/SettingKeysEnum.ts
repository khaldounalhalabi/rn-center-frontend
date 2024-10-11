export enum SettingKeysEnum {
  TermsAndServices = "terms_of_service",
  ZainCashNumber = "zain_cash_number",
  ContactNumber1 = "contact_number_1",
  ContactNumber2 = "contact_number_2",
  DaysBeforeExpirationNotification = "days_before_notify_for_expiration",
  ClinicContract = "clinic_contract",
  ZainCASHQR="zain_cash_qr"
}

export const EditorRequiredSettings: string[] = [
  SettingKeysEnum.ClinicContract,
  SettingKeysEnum.TermsAndServices,
];