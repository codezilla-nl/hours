export default {
    getDayOfTheWeek(item, isTemplate) {
        if (isTemplate) {
            return item.day - 1;
        }
        if (item.date instanceof Date) {
            /* item.date is a timestamp */
            return new Date(item.date).getDay();
        }
        /* No valid date, return -1 */
        return -1;
    },
    isWeekend(item) {
        return [0, 6].includes(item.dayOfTheWeek);
    },
    parseDate(date) {
        if (date instanceof Date) {
            /* date is valid date object */
            return new Date(date);
        }
        if (date.toDate() instanceof Date) {
            /* date is a timestamp */
            return new Date(date.toDate());
        }
    },
};
