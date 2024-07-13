export enum TransactionStatus {
    PENDING = "pending",
    DONE = "done",

}

const ClinicTransactionStatusArray = (): string[] => {
    return Object.values(TransactionStatus);
};

export default ClinicTransactionStatusArray