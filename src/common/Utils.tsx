import IDay from "../common/interfaces/IDay";
import * as HoursConstants from "../hours/hours-constants/hoursConstants.component";

export default {
    getDayOfTheWeek(item: IDay, isTemplate: boolean): number {
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
    isPublicHoliday(date: Date): boolean {
        const publicHolidays = HoursConstants.publicHolidays.map((x) =>
            new Date(x).getTime(),
        );
        return publicHolidays.includes(date.getTime());
    },
    isWeekend(item: IDay): boolean {
        return [0, 6].includes(item.dayOfTheWeek);
    },
    parseDate(date: any): Date {
        if (date instanceof Date) {
            /* date is valid date object */
            return new Date(date);
        }
        if (date.toDate() instanceof Date) {
            /* date is a timestamp */
            return new Date(date.toDate());
        }
        return new Date();
    },
    initDays(
        days: IDay[],
        isTemplate: boolean,
        year: number,
        month: number,
    ): IDay[] {
        return days.map((x, index) => {
            const day = x;

            if (isTemplate) {
                day.dayOfTheWeek = index;
                day.isWeekend = this.isWeekend(x);
                return day;
            }

            if (!day.date) {
                day.date = new Date(year, month - 1, index);
            }

            day.date = this.parseDate(x.date);
            day.dayOfTheWeek = this.getDayOfTheWeek(x, isTemplate);
            day.isWeekend = this.isWeekend(x);
            day.isPublicHoliday = this.isPublicHoliday(x.date);
            return day;
        });
    },
};
