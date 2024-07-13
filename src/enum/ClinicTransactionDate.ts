
export enum DateFilter {
    LAST_WEEK = "Last Week",
    LAST_MONTH = "Last Month",
    LAST_YEAR = "Last Year",
    CURRENT_MONTH = "Current Month",
    CURRENT_YEAR = "Current Year",
    CUSTOM_DATE = "Custom Date"
}


const ClinicTransactionDate = (): string[] => {
    return Object.values(DateFilter);
};

export default ClinicTransactionDate