import moment from 'moment';

export const getDateArray = (dateRange) => {
    let current = moment(dateRange[0]);
    const end = moment(dateRange[1]);

    var dates = [];
    while (current.isBefore(end)) {
        var monthZeroIndex = current.month();
        dates.push(current.format('YYYY-' + monthZeroIndex));
        current.add(1, 'month');
    }
    return dates;
}