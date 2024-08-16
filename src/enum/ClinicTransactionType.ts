export enum TransactionType {
  INCOME = "income",
  OUTCOME = "outcome",
  SYSTEM_DEBT = "system_debt",
  DEBT_TO_ME = "debt_to_me",
}

const ClinicTransactionTypeArray = (): string[] => {
  return Object.values(TransactionType);
};

export default ClinicTransactionTypeArray;
