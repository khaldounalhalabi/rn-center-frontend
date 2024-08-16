export enum TransactionType {
  INCOME = "income",
  OUTCOME = "outcome",
}

const TransactionTypeArray = (): string[] => {
  return Object.values(TransactionType);
};

export default TransactionTypeArray;
