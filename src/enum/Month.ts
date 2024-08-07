
export enum MonthsEnum {
    JANUARY= 'January',
    FEBRUARY= 'February',
    MARCH= 'March',
    APRIL= 'April',
    MAY= 'May',
    JUNE= 'June',
    JULY= 'July',
    AUGUST= 'August',
    SEPTEMBER= 'September',
    OCTOBER= 'October',
    NOVEMBER= 'November',
    DECEMBER= 'December',
};
const AllMonth = (): string[] => {
    return Object.values(MonthsEnum);
};

export default AllMonth;